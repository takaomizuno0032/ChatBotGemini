import { Express } from 'express';
import { chatGemni } from './service/gemini_service';

export function registerRoutes(app: Express) {
    app.get('/', (req, res) => {
        res.send("Hello, this is a Bot server.");
    })

    app.get('/api/chat', async (req, res) => {
        let result = {
            text: ""
        }
        const prompt = req.query.prompt?.toString();
        if (prompt == undefined) {
            res.send("Please enter some strings.");
            return;
        }
        console.log("----------------")
        console.log("Prompt:");
        console.log(prompt);

        result.text = await chatGemni(prompt);
        res.send(JSON.stringify(result));
    })

    //TODO: stream
    app.get('/appi/chat/stream', async (req, res) => {
        console.log("implementing.");
    })
}