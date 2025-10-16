import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';

// Ensure API_KEY is available, though in a real app this would be more secure.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey });

const RESTORATION_PROMPT = `You are a world-class expert in historical photo restoration. Your task is to restore this very old, faded, and damaged photograph. 

Instructions:
1.  **Analyze the damage:** Identify scratches, blemishes, dust, stains, and faded areas.
2.  **Repair artifacts:** Meticulously remove all artifacts and damage without altering the underlying content.
3.  **Enhance details:** Improve contrast and sharpness to bring out hidden details, but maintain a natural look appropriate for the era.
4.  **Preserve authenticity:** Do not colorize the image. The final output must be a high-quality, restored black and white photograph that honors its historical character.
`;

const COLORIZE_PROMPT = `You are a world-class expert in historical photo restoration and colorization. Your task is to restore and then colorize this very old, faded, and damaged photograph.

Instructions:
1.  **Analyze and Repair:** First, perform a full restoration. Identify and meticulously remove all scratches, blemishes, dust, stains, and faded areas without altering the underlying content. Enhance contrast and sharpness to bring out hidden details, maintaining a natural look.
2.  **Historical Colorization:** After restoration, colorize the photograph. Apply colors that are realistic and historically accurate for the era the photo was taken (late 19th or early 20th century). Pay close attention to skin tones, clothing, and background elements.
3.  **Final Output:** The final output must be a high-quality, fully restored and colorized photograph that looks both authentic and vibrant.
`;


export const restorePhoto = async (imageFile: File, colorize: boolean): Promise<string> => {
    try {
        const { base64, mimeType } = await fileToBase64(imageFile);
        const prompt = colorize ? COLORIZE_PROMPT : RESTORATION_PROMPT;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
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
        if (error instanceof Error) {
            throw new Error(`Failed to restore photo: ${error.message}`);
        }
        throw new Error("An unknown error occurred during photo restoration.");
    }
};
