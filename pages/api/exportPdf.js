import { marked } from "marked";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { markdown, fileName } = req.body;
    const token = process.env.BROWSERLESS_TOKEN;

    if (!token) {
      return res.status(500).json({ error: "No browserless token set" });
    }

    // Convert markdown to HTML
    const htmlBody = marked.parse(markdown);

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Exported PDF</title>
          <style>
            body { font-family: Helvetica, Arial, sans-serif; padding: 40px; }
            img, video { max-width: 100%; }
            h1,h2,h3,h4,h5,h6 { color: #3b82f6; }
            pre, code { background: #f3f4f6; padding: 2px 4px; border-radius: 4px; }
            blockquote { border-left: 4px solid #3b82f6; padding-left: 12px; color: #555; }
            a { color: #2563eb; text-decoration: underline; }
          </style>
        </head>
        <body>
          ${htmlBody}
        </body>
      </html>
    `;

    const browserlessUrl = `https://chrome.browserless.io/pdf?token=${token}`;
    const response = await fetch(browserlessUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: htmlContent,
        options: {
          printBackground: true,
          format: "A4",
          margin: { top: "40px", bottom: "40px", left: "30px", right: "30px" }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: "Browserless PDF export failed", details: errText });
    }
    const pdfBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName || 'document'}.pdf"`);
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    res.status(500).json({ error: "PDF generation failed", details: err.message });
  }
}
