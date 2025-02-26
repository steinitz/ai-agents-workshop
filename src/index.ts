import {WeatherTools} from "./providers/WeatherTools";
import {CurrencyTools} from "./providers/CurrencyTools";
import {ToolsManager} from "./agent/ToolsManager";
import {Agent} from "./agent/Agent";
import {ReplicateLLMProvider} from "./llm/ReplicateLLMProvider";

(async () => {
    // Setup: Instantiate providers and register their tools
    const weatherProvider = new WeatherTools();
    const currencyProvider = new CurrencyTools();
    const weatherTools = ToolsManager.registerToolsFrom(weatherProvider);
    const currencyTools = ToolsManager.registerToolsFrom(currencyProvider);
    const allTools = [...weatherTools, ...currencyTools];

    // Initialize the LLM provider and the Agent
    const llmProvider = new ReplicateLLMProvider("meta/meta-llama-3-8b-instruct");
    const agent = new Agent(llmProvider);
    allTools.forEach(tool => agent.addTool(tool));

    // User query that requires two tool calls
    const userPrompt = "What's the Stockholm in  and convert 500 SEK to EUR?";
    const initialLLMResponse = await agent.callLLM(userPrompt);

    if (!initialLLMResponse.requires_tools) {
        console.log(initialLLMResponse.direct_response);
    } else {
        // Execute each requested tool call and collect results
        const toolResults: Record<string, string> = {};
        for (const toolCall of initialLLMResponse.tool_calls) {
            toolResults[toolCall.tool] = await agent.useTool(toolCall.tool, toolCall.args);
        }

        // Build a final prompt instructing the LLM to integrate both tool outputs
        const finalPrompt = `
User Query: ${userPrompt}

Tool Outputs:
${JSON.stringify(toolResults, null, 2)}

Instructions:
Based on the above outputs, provide a final and concise answer that integrates both the weather information and the currency conversion result. Do not suggest additional tool usage.
`;
        const finalLLMResponse = await agent.callLLM(finalPrompt);
        console.log('Final answer:')
        console.log(finalLLMResponse.direct_response);
    }
})();
