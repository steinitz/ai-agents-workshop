import { Configuration, OpenAIApi } from "openai";
import { createSystemPrompt } from "../utils/createSystemPrompt";
import {Tool} from "./Tool";
import 'dotenv/config'

process.env.REPLICATE_API_TOKEN

export class Agent {
    client: OpenAIApi;
    tools: Record<string, Tool>;

    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.client = new OpenAIApi(configuration);
        this.tools = {};
    }

    addTool(tool: Tool): void {
        this.tools[tool.name] = tool;
    }

    getAvailableTools(): string[] {
        return Object.values(this.tools).map(
            (tool) => `${tool.name}: ${tool.description}`
        );
    }

    async useTool(toolName: string, args: Record<string, any>): Promise<string> {
        const tool = this.tools[toolName];
        if (!tool) {
            throw new Error(
                `Tool '${toolName}' not found. Available: ${Object.keys(this.tools)}`
            );
        }
        const argValues = Object.values(args);
        return await tool.call(...argValues);
    }

    createSystemPrompt(): string {
        const toolsArray = Object.values(this.tools);
        return JSON.stringify(createSystemPrompt(toolsArray), null, 2);
    }

    async callLLM(prompt: string): Promise<any> {
        const response = await this.client.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });
        return response.data;
    }
}
