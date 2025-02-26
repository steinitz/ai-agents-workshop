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
        return new Promise((resolve) => {
            const url = `https://open.er-api.com/v6/latest/${from_currency.toUpperCase()}`;
            import("https").then(httpsModule => {
                httpsModule.get(url, (res) => {
                    let data = "";
                    res.on("data", (chunk) => { data += chunk; });
                    res.on("end", () => {
                        try {
                            const parsed = JSON.parse(data);
                            if (!parsed.rates) {
                                resolve("Error: Could not fetch exchange rates");
                                return;
                            }
                            const rate = parsed.rates[to_currency.toUpperCase()];
                            if (!rate) {
                                resolve(`Error: No rate found for ${to_currency}`);
                                return;
                            }
                            const converted = amount * rate;
                            resolve(`${amount} ${from_currency.toUpperCase()} = ${converted.toFixed(2)} ${to_currency.toUpperCase()}`);
                        } catch (e: any) {
                            resolve(`Error converting currency: ${e.message}`);
                        }
                    });
                }).on("error", (e) => {
                    resolve(`Error converting currency: ${e.message}`);
                });
            });
        });
    }
}
