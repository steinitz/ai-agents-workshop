import { ToolDecorator } from "../decorators/ToolDecorator";

// Simulated local events data
const eventData: Record<string, string[]> = {
    "2025-03-10": ["Music Festival", "Art Exhibition"],
    "2025-03-11": ["Business Conference"],
};

export class EventTools {
    @ToolDecorator({
        docstring: `Fetches local events for a given date.

Parameters:
- date: Date for which to retrieve local events (YYYY-MM-DD)`,
        parameters: {
            date: { type: "string", description: "Date (YYYY-MM-DD)" },
        },
    })
    async getLocalEvents(date: string): Promise<string> {
        const events = eventData[date] || [];
        return events.length > 0
            ? `Events on ${date}: ${events.join(", ")}.`
            : `No significant events on ${date}.`;
    }
}
