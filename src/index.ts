import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { initGemini } from "./service/gemini_service";
import { registerRoutes } from './routes';

const HTTP_BODY_LIMIT = '500mb';
const app = express()
app.use(bodyParser.json({ limit: HTTP_BODY_LIMIT }))
app.use(bodyParser.urlencoded({ limit: HTTP_BODY_LIMIT, extended: true }))
app.use(helmet())
app.use(cors())

registerRoutes(app);
initGemini();

const port = '3000';
const main = async () => {
    console.log("Hello.");
    console.log("How can I help you?");
    app.listen(port, () => {
    })
}

main()