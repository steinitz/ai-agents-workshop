import {ToolDecorator} from "../decorators/ToolDecorator";
import https from 'https';

/**
 * The WeatherTools class encapsulates methods that provide weather data.
 * Each method decorated with @ToolDecorator becomes available as a tool.
 */
export class WeatherTools {
    @ToolDecorator({
        docstring: `Gets the current weather for a location.

Parameters:
- location: Name of the location (e.g., "Paris", "New York")`,
        parameters: {
            location: { type: "string", description: 'Name of the location (e.g., "Paris", "New York")' }
        }
    })
    async getWeather(location: string): Promise<string> {
        return new Promise((resolve) => {
            const url = `https://wttr.in/${encodeURIComponent(location)}?format=3`;
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => resolve(data));
            }).on('error', (error) => resolve(`Error fetching weather: ${error.message}`));
        });
    }
}