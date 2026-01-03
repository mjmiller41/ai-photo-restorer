import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";
import { RESTORATION_PROMPT, COLORIZE_PROMPT } from "./prompts";

// Ensure API_KEY is available, though in a real app this would be more secure.
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

export const restorePhoto = async (
  imageFile: File,
  colorize: boolean
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const { base64, mimeType } = await fileToBase64(imageFile);
    const prompt = colorize ? COLORIZE_PROMPT : RESTORATION_PROMPT;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Find the image part in the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const restoredBase64 = part.inlineData.data;
        const restoredMimeType = part.inlineData.mimeType;
        return `data:${restoredMimeType};base64,${restoredBase64}`;
      }
    }

    throw new Error("No restored image found in the API response.");
  } catch (error) {
    console.error("Error during photo restoration:", error);
    if (error?.error instanceof Error) {
      throw new Error(`Failed to restore photo: ${error.error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to restore photo: ${error.message}`);
    }
    throw new Error("An unknown error occurred during photo restoration.");
  }
};
