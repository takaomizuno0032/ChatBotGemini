// node --version # Should be >= 18
// npm install @google/generative-ai
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ChatSession } from "@google/generative-ai";
import dotenv from "dotenv";
import { history } from "..//params/histories";
dotenv.config()

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY ?? "";

const genAI = new GoogleGenerativeAI(API_KEY);

let chat: ChatSession;

// TODO: シングルトンにしたい
export async function initGemini(): Promise<void> {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    chat = model.startChat({
        generationConfig,
        safetySettings,
        history: history,
    });
}

export async function chatGemni(prompt: string): Promise<string> {
    if (!chat) {
        console.log("Please init chat session.");
        return "";
    }

    const result = await chat.sendMessageStream(prompt);
    let text = '';
    console.log("You:");
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
    }
    return text;
}