import { ToolDecorator } from "../decorators/ToolDecorator";

// Simulated booking data (in a real system, this might query a database)
const bookingData: Record<string, { occupancy: number; availableRooms: number }> = {
    "2025-03-10": { occupancy: 85, availableRooms: 15 },
    "2025-03-11": { occupancy: 75, availableRooms: 25 },
};

export class BookingTools {
    @ToolDecorator({
        docstring: `Checks room occupancy and availability for a given date range.

Parameters:
- start_date: Start date (YYYY-MM-DD)
- end_date: End date (YYYY-MM-DD)`,
        parameters: {
            start_date: { type: "string", description: "Start date (YYYY-MM-DD)" },
            end_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        },
    })
    async checkOccupancy(start_date: string, end_date: string): Promise<string> {
        // For simplicity, we return data for the start date only.
        const data = bookingData[start_date] || { occupancy: 0, availableRooms: 0 };
        return `For ${start_date}: Occupancy is ${data.occupancy}% with ${data.availableRooms} rooms available.`;
    }
}
