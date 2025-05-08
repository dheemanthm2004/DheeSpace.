export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const { question, documentData } = req.body;
  
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
                text: `DOCUMENT: ${documentData}\nQUESTION: ${question}\nANSWER:`
              }]
            }]
          })
        }
      );
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "Gemini API error");
      }
  
      res.status(200).json({
        message: data.candidates[0].content.parts[0].text
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: error.message || "AI service unavailable"
      });
    }
  }
  