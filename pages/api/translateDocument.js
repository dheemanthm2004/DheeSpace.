export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const { content, targetLang } = req.body;
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Translate this document to ${targetLang}. Preserve all formatting, markdown, and special characters exactly. Only output the translated text.\n\nDOCUMENT:\n${content}\n\nTRANSLATION:`
              }]
            }]
          })
        }
      );
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "Translation failed");
      }
  
      res.status(200).json({
        translatedText: data.candidates[0].content.parts[0].text
      });
    } catch (error) {
      console.error("Translation Error:", error);
      res.status(500).json({
        error: error.message || "Translation service unavailable"
      });
    }
  }
  