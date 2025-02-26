import axios from "axios";
import { ToolDecorator } from "../decorators/ToolDecorator";

export class CurrencyTools {
    @ToolDecorator({
        docstring: `Converts currency using the latest exchange rates.

Parameters:
- amount: Amount to convert
- from_currency: Source currency code (e.g., USD)
- to_currency: Target currency code (e.g., EUR)`,
        parameters: {
            amount: { type: "number", description: "Amount to convert" },
            from_currency: { type: "string", description: "Source currency code (e.g., USD)" },
            to_currency: { type: "string", description: "Target currency code (e.g., EUR)" }
        }
    })
    async convertCurrency(amount: number, from_currency: string, to_currency: string): Promise<string> {
        const url = `https://open.er-api.com/v6/latest/${from_currency.toUpperCase()}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (!data.rates) {
                return "Error: Could not fetch exchange rates";
            }
            const rate = data.rates[to_currency.toUpperCase()];
            if (!rate) {
                return `Error: No rate found for ${to_currency}`;
            }
            const converted = amount * rate;
            return `${amount} ${from_currency.toUpperCase()} = ${converted.toFixed(2)} ${to_currency.toUpperCase()}`;
        } catch (error: any) {
            return `Error converting currency: ${error.message}`;
        }
    }
}
