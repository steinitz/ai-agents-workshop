import axios from "axios";
import { ToolDecorator } from "../decorators/ToolDecorator";

export class WeatherTools {
    @ToolDecorator({
        docstring: `Gets the current weather for a location.

Parameters:
- location: Name of the location (e.g., "Paris", "New York")`,
        parameters: {
            location: { type: "string", description: 'Name of the location (e.g., "Paris", "New York")' },
        },
    })
    async getWeather(location: string): Promise<string> {
        try {
            const url = `https://wttr.in/${encodeURIComponent(location)}?format=3`;
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            return `Error fetching weather: ${error.message}`;
        }
    }
}
