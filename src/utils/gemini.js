const apiKey = "AIzaSyCeKSQWkUo5qjNgveABaflQAydjIkus8vo";

export const callGemini = async (prompt, schema = null, systemInstruction = "") => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
  };

  if (schema) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: schema,
    };
  }

  // Implementação de Exponential Backoff para retentativas
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error("Too Many Requests");
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResult) throw new Error("No content generated");

      return schema ? JSON.parse(textResult) : textResult;
    } catch (error) {
      if (i === 4) throw error; // Lança erro na última tentativa
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};