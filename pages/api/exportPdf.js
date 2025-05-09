// pages/api/exportPdf.js

const isVercel =
  !!process.env.AWS_LAMBDA_FUNCTION_VERSION ||
  !!process.env.VERCEL ||
  process.env.NODE_ENV === "production";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let puppeteer, chromium;
  if (isVercel) {
    puppeteer = require("puppeteer-core");
    chromium = require("@sparticuz/chromium");
  } else {
    puppeteer = require("puppeteer");
  }

  try {
    const { htmlContent, fileName } = req.body;

    const launchOptions = isVercel
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
          defaultViewport: chromium.defaultViewport,
        }
      : {
          headless: true,
        };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.map((img) => {
          if (img.complete) return;
          return new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          });
        })
      );
      const videos = Array.from(document.querySelectorAll("video"));
      await Promise.all(
        videos.map((video) => {
          if (video.readyState >= 2) return;
          return new Promise((resolve) => {
            video.onloadeddata = video.onerror = resolve;
          });
        })
      );
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 40, bottom: 40, left: 30, right: 30 },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName || "document"}.pdf"`
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    res
      .status(500)
      .json({ error: "PDF generation failed", details: err.message });
  }
}
