import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { htmlContent, fileName } = req.body;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return;
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      }));
      const videos = Array.from(document.querySelectorAll('video'));
      await Promise.all(videos.map(video => {
        if (video.readyState >= 2) return;
        return new Promise(resolve => {
          video.onloadeddata = video.onerror = resolve;
        });
      }));
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 40, bottom: 40, left: 30, right: 30 }
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName || 'document'}.pdf"`);
    // THE FIX: wrap in Buffer.from()!
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    res.status(500).json({ error: "PDF generation failed", details: err.message });
  }
}
