import { LLMProvider } from "../llm/LLMProvider";
import { createSystemPrompt } from "../utils/createSystemPrompt";
import { Tool } from "./Tool";
import 'dotenv/config'

export class Agent {
    tools: Record<string, Tool>;
    private llmProvider: LLMProvider;

    constructor(llmProvider: LLMProvider) {
        this.tools = {};
        this.llmProvider = llmProvider;
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
        // Convert args object to an array (assuming keys order matches the signature)
        const argValues = Object.values(args);
        return await tool.call(...argValues);
    }

    createSystemPrompt(): string {
        const toolsArray = Object.values(this.tools);
        return JSON.stringify(createSystemPrompt(toolsArray), null, 2);
    }

    /**
     * Calls the LLM using the provided LLMProvider.
     *
     * It builds the input object (using a system prompt, user prompt, and other parameters)
     * and passes it to the LLMProvider.
     */
    async callLLM(userPrompt: string): Promise<any> {
        const systemPrompt = this.createSystemPrompt();
        const input = {
            prompt: userPrompt,
            system_prompt: systemPrompt,
            max_new_tokens: 512,
            max_tokens: 512,
            prompt_template:
                "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        };

        return await this.llmProvider.callLLM(input);
    }
}
