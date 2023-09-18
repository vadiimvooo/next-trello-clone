import { OpenAI } from 'openai/index';
import * as process from "process";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});



export default openai;
