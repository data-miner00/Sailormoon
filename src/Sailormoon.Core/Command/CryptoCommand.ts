import { Message, MessageEmbed } from "discord.js";
import Command from "./Command";
import axios from "axios";
import Configuration from "../App/Configuration";
import { LatestListing, LatestQuote, Quote } from "../Schemas/CoinMarketCap";
import DateFormat from "../Utility/DateFormat";

export default class CryptoCommand extends Command<MessageEmbed | string> {
    public commandSignature: string = "crypto";

    public configuration: Configuration = Configuration.getInstance();

    public constructor(message: Message) {
        super(message);
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
            const quote = data[dynKey] as Quote;
            this.response = new MessageEmbed({
                title: quote.name,
                description: `Latest info for ${quote.name} in USD`,
                url: "https://coinmarketcap.com/",
                color: "RANDOM",
                fields: [
                    {
                        name: "ID",
                        value: quote.id,
                        inline: true,
                    },
                    {
                        name: "Added on",
                        value: new DateFormat()
                            .FromISOString(quote.date_added)
                            .Format("DD/MM/yyyy"),
                        inline: true,
                    },
                    {
                        name: "Market cap",
                        value: quote.quote.USD.market_cap,
                        inline: true,
                    },
                    {
                        name: "Price",
                        value: quote.quote.USD.price,
                        inline: true,
                    },
                    {
                        name: "24hrs",
                        value: quote.quote.USD.percent_change_24h,
                        inline: true,
                    },
                    {
                        name: "7days",
                        value: quote.quote.USD.percent_change_7d,
                        inline: true,
                    },
                    {
                        name: "30days",
                        value: quote.quote.USD.percent_change_30d,
                        inline: true,
                    },
                    {
                        name: "60days",
                        value: quote.quote.USD.percent_change_60d,
                        inline: true,
                    },
                    {
                        name: "90days",
                        value: quote.quote.USD.percent_change_90d,
                        inline: true,
                    },
                ],
                footer: {
                    text: `Powered by Coinmarketcap • ${date}`,
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
            this.response = "Sorry but it is unsupported";
        }
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
