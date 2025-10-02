
import { GoogleGenAI, Type } from "@google/genai";
import type { ParsedVerse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const parseVerseWithGemini = async (rawText: string): Promise<ParsedVerse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following text to identify the Bible book, chapter number, verse number, and the full verse text. The user might not format it perfectly. Text: "${rawText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            book: {
              type: Type.STRING,
              description: "The name of the Bible book.",
            },
            chapter: {
              type: Type.INTEGER,
              description: "The chapter number.",
            },
            verse: {
              type: Type.INTEGER,
              description: "The verse number.",
            },
            text: {
              type: Type.STRING,
              description: "The full text of the verse.",
            },
          },
          required: ["book", "chapter", "verse", "text"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    if (
      typeof parsedData.book === 'string' &&
      typeof parsedData.chapter === 'number' &&
      typeof parsedData.verse === 'number' &&
      typeof parsedData.text === 'string'
    ) {
      return parsedData;
    } else {
      throw new Error("Parsed data does not match the expected format.");
    }
  } catch (error) {
    console.error("Error parsing verse with Gemini:", error);
    throw new Error("Failed to understand the verse. Please try again with a clearer format (e.g., John 3:16 For God so loved...).");
  }
};
