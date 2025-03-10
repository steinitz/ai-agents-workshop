import { WeatherTools } from "./providers/WeatherTools";
import { CurrencyTools } from "./providers/CurrencyTools";
import { WikipediaTools } from "./providers/WikipediaTools";
import { ToolsManager } from "./agent/ToolsManager";
import { Agent } from "./agent/Agent";
import { ReplicateLLMProvider } from "./llm/ReplicateLLMProvider";

(async () => {
    const weatherProvider = new WeatherTools();
    const currencyProvider = new CurrencyTools();
    const wikipediaProvider = new WikipediaTools();

    const weatherTools = ToolsManager.registerToolsFrom(weatherProvider);
    const currencyTools = ToolsManager.registerToolsFrom(currencyProvider);
    const wikipediaTools = ToolsManager.registerToolsFrom(wikipediaProvider);
    const allTools = [...weatherTools, ...currencyTools, ...wikipediaTools];

    const llmProvider = new ReplicateLLMProvider("meta/meta-llama-3-8b-instruct");
    const agent = new Agent(llmProvider);
    allTools.forEach(tool => agent.addTool(tool));

    const userPrompt = "What's the weather in Chinas Kapital, convert 500 euro to the currency used in China, and summarize Wikipedia's article on China?";
    const initialLLMResponse = await agent.callLLM(userPrompt);

    if (!initialLLMResponse.requires_tools) {
        console.log(initialLLMResponse.direct_response);
    } else {
        const toolResults: Record<string, string> = {};
        for (const toolCall of initialLLMResponse.tool_calls) {
            toolResults[toolCall.tool] = await agent.useTool(toolCall.tool, toolCall.args);
        }

        const finalPrompt = `
            User Query: ${userPrompt}
            
            Tool Outputs:
            ${JSON.stringify(toolResults, null, 2)}
            
            Instructions:
            Based on the above outputs, provide a final, concise answer that integrates the weather information, currency conversion result, and Wikipedia summary. Convert the currency ISO code to the currency name. Do not suggest additional tool usage.
        `;
        const finalLLMResponse = await agent.callLLM(finalPrompt);
        console.log("Final answer:");
        console.log(finalLLMResponse.direct_response);
    }
})();
