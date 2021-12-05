import { Message, MessageEmbed } from "discord.js";
import Command from "./Command";
import axios from "axios";
import Configuration from "../App/Configuration";
import { LatestListing, LatestQuote, Currency } from "../Schemas/CoinMarketCap";
import DateFormat from "../Utility/DateFormat";
import Amount from "../Utility/Amount";

export default class CryptoCommand extends Command<MessageEmbed | string> {
    public commandSignature: string = "crypto";

    public configuration: Configuration = Configuration.getInstance();

    public amount: Amount;

    public constructor(message: Message) {
        super(message);

        this.amount = new Amount();
    }

    private async latestListing(count: number = 20): Promise<void> {
        try {
            const res = await axios.get(
                "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
                {
                    headers: {
                        "X-CMC_PRO_API_KEY": this.configuration.cmcApiKey,
                        Accept: "application/json",
                        "Accept-Encoding": "deflate, gzip",
                    },
                }
            );

            const { status, data } = res.data as LatestListing;
        } catch (error: unknown) {
            console.error(error);
        }
    }

    private async latestQuote(
        query: string,
        by: "slug" | "symbol"
    ): Promise<void> {
        const params = new Object();
        params[by] = query;

        const date = new DateFormat().Now().Format("DD/MM/yyyy");

        try {
            const res = await axios.get(
                "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                {
                    headers: {
                        "X-CMC_PRO_API_KEY": this.configuration.cmcApiKey,
                        Accept: "application/json",
                        "Accept-Encoding": "deflate, gzip",
                    },
                    params,
                }
            );

            const { status, data } = res.data as LatestQuote;

            const dynKey = Object.keys(data)[0];
            const currency = data[dynKey] as Currency;

            const color =
                currency.quote.USD.percent_change_24h > 0
                    ? "#34D399"
                    : "#F87171";

            this.response = new MessageEmbed({
                title: currency.name,
                description: `Latest info for ${currency.name} in USD`,
                url: "https://coinmarketcap.com/",
                color,
                fields: [
                    {
                        name: "ID",
                        value: currency.id,
                        inline: true,
                    },
                    {
                        name: "Added on",
                        value: new DateFormat()
                            .FromISOString(currency.date_added)
                            .Format("DD/MM/yyyy"),
                        inline: true,
                    },
                    {
                        name: "Market cap",
                        value: this.amount.Verbose(
                            currency.quote.USD.market_cap
                        ),
                        inline: true,
                    },
                    {
                        name: "Price",
                        value: currency.quote.USD.price.toFixed(2),
                        inline: true,
                    },
                    {
                        name: "24hrs",
                        value:
                            currency.quote.USD.percent_change_24h.toFixed(3) +
                            "%",
                        inline: true,
                    },
                    {
                        name: "7days",
                        value:
                            currency.quote.USD.percent_change_7d.toFixed(3) +
                            "%",
                        inline: true,
                    },
                    {
                        name: "30days",
                        value:
                            currency.quote.USD.percent_change_30d.toFixed(3) +
                            "%",
                        inline: true,
                    },
                    {
                        name: "60days",
                        value:
                            currency.quote.USD.percent_change_60d.toFixed(3) +
                            "%",
                        inline: true,
                    },
                    {
                        name: "90days",
                        value:
                            currency.quote.USD.percent_change_90d.toFixed(3) +
                            "%",
                        inline: true,
                    },
                ],
                footer: {
                    text: `Powered by Coinmarketcap • ${date}`,
                    iconURL: "https://coinmarketcap.com/favicon.ico",
                },
            });
        } catch (error: unknown) {
            this.response = "Sorry but something wrong happened";
        }
    }

    protected async setup(): Promise<void> {
        if (
            this.arguments[0] &&
            this.arguments[0] == this.arguments[0].toLowerCase()
        ) {
            await this.latestQuote(this.arguments[0], "slug");
        } else if (
            this.arguments[0] &&
            this.arguments[0] == this.arguments[0].toUpperCase()
        ) {
            await this.latestQuote(this.arguments[0], "symbol");
        } else {
            this.response = "Please provide a cryptocurrency symbol or slug";
        }
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
