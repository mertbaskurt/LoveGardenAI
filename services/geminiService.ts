
import { GoogleGenAI } from "@google/genai";
import { Plant, CareAction } from "../types";

export const getPlantWisdom = async (plant: Plant, recentActions: CareAction[]): Promise<string> => {
  const apiKey = process.env.API_KEY || ''; 
  
  if (!apiKey) {
    return "Love makes things grow! (Add API Key for AI wisdom)";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const recentContext = recentActions.slice(0, 5).map(a => 
      `${a.type === 'water' ? 'Note' : 'Emoji'}: "${a.message}"`
    ).join("\n");

    const prompt = `
      You are the spirit of a virtual relationship plant.
      The plant is a "${plant.type}" at level ${plant.level}.
      
      Here are the recent care actions the couple sent to each other:
      ${recentContext}
      
      Write a very short, cute, one-sentence status update or relationship advice based on this. 
      Keep it under 20 words. Be whimsical and encouraging.
      Don't use hashtags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Your garden is thriving with love!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sunlight and love are all you need.";
  }
};

export const generatePlantImage = async (plant: Plant, size: '1K' | '2K' | '4K'): Promise<string | null> => {
    // Re-instantiate to ensure we have the latest key if it was just selected
    const currentApiKey = process.env.API_KEY;
    if (!currentApiKey) {
        throw new Error("No API Key found");
    }
    const currentAi = new GoogleGenAI({ apiKey: currentApiKey });

    const prompt = `A magical, cute, pastel-colored 3D render of a ${plant.type} plant. 
    The plant is at growth level ${plant.level}, looking healthy and vibrant. 
    Surrounded by a soft, romantic atmosphere, glowing particles, and a dreamlike background. 
    High quality, detailed texture, soft lighting.`;

    try {
        const response = await currentAi.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: size
                }
            }
        });

        // Iterate through parts to find the image
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString = part.inlineData.data;
                    return `data:image/png;base64,${base64EncodeString}`;
                }
            }
        }
        return null;
    } catch (error) {
        console.error("Image Gen Error:", error);
        throw error;
    }
};