import { WebSearchTool } from "./providers/WebSearchTool";  // Import new tool
import { ToolsManager } from "./agent/ToolsManager";
import { Agent } from "./agent/Agent";
import { ReplicateLLMProvider } from "./llm/ReplicateLLMProvider";

(async () => {
    const searchProvider = new WebSearchTool();

    const searchTools = ToolsManager.registerToolsFrom(searchProvider);

    const llmProvider = new ReplicateLLMProvider("meta/meta-llama-3-8b-instruct");
    const agent = new Agent(llmProvider);

    // Register all tools with the agent
    [...searchTools].forEach(tool => agent.addTool(tool));

    const userPrompt = "Find the latest trends in AI for 2025 specifically related to Large Language Models and summarize them search the web. Just return Json no additional text.";
    const initialLLMResponse = await agent.callLLM(userPrompt);

    if (!initialLLMResponse.requires_tools) {
        console.log('no tools')
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
            1. Read and analyze the content summaries extracted from the top 5 websites in the "Tool Outputs" section.
            2. For each website, generate a **short summary (2-3 sentences)** that captures the most important insights from that source.
            3. Then, provide a **final summary** that combines the key takeaways from all 5 sources into a **concise, well-structured overview** of the topic.
            4. Use clear, informative language. Do not generate any additional text beyond the required summaries.
            No tool usage required.
            Respond in JSON no additional text.
            
            Format:
            ### Source Summaries:
            1. **[Title of Source 1]** - (Summary of Source 1)
            2. **[Title of Source 2]** - (Summary of Source 2)
            3. **[Title of Source 3]** - (Summary of Source 3)
            4. **[Title of Source 4]** - (Summary of Source 4)
            5. **[Title of Source 5]** - (Summary of Source 5)
            
            ### Final Summary:
            (Concise summary synthesizing key insights from all sources)
        `;

        const finalLLMResponse = await agent.callLLM(finalPrompt);
        console.log("Final AI Summary:");
        console.log(finalLLMResponse.direct_response);
    }
})();
