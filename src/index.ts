import {WeatherTools} from "./providers/WeatherTools";
import {ToolsManager} from "./agent/ToolsManager";
import {Agent} from "./agent/Agent";

(async () => {
    // Create an instance of our tool provider.
    const weatherProvider = new WeatherTools();
    // Register all decorated tools from the provider.
    const tools = ToolsManager.registerToolsFrom(weatherProvider);

    // Create and set up the Agent.
    const agent = new Agent();
    tools.forEach(tool => agent.addTool(tool));

    // Output the system prompt for inspection.
    console.log("System Prompt:");
    console.log(agent.createSystemPrompt());

    // Use the getWeather tool directly as an example.
    try {
        const weatherResult = await agent.useTool("getWeather", { location: "London" });
        console.log("\nWeather Result:");
        console.log(weatherResult);
    } catch (error) {
        console.error("Error using weather tool:", error);
    }
})();