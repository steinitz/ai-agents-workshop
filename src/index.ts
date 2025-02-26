import { WeatherTools } from "./providers/WeatherTools";
import { ToolsManager } from "./agent/ToolsManager";
import { Agent } from "./agent/Agent";
import { ReplicateLLMProvider } from "./llm/ReplicateLLMProvider";

const main = async () => {
    const weatherProvider = new WeatherTools();
    const tools = ToolsManager.registerToolsFrom(weatherProvider);
    const llmProvider = new ReplicateLLMProvider("meta/meta-llama-3-8b-instruct");
    const agent = new Agent(llmProvider);
    tools.forEach(tool => agent.addTool(tool));

    const userPrompt = "What is the weather like in Rom today?";
    const initialLLMResponse = await agent.callLLM(userPrompt);

    if (initialLLMResponse.requires_tools) {
        const toolResults: Record<string, string> = {};
        for (const toolCall of initialLLMResponse.tool_calls) {
            const toolName = toolCall.tool
            toolResults[toolName]  = await agent.useTool(toolName, toolCall.args);
        }
        const finalPrompt = `
User Query: ${userPrompt}

Tool Outputs:
${JSON.stringify(toolResults, null, 2)}

Instructions:
Based on the above information, provide a final answer to the user's query. Do not suggest additional tool usage.
`;
        const finalLLMResponse = await agent.callLLM(finalPrompt);
        const finalAnswer = !finalLLMResponse.requires_tools
            ? finalLLMResponse.direct_response
            : "LLM still indicates tool usage is required.";
        console.log(finalAnswer);
    }
}

main()
