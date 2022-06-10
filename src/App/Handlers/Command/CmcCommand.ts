import CommandHandler from "../../../Core/Handlers/CommandHandler";
import { GetQuotesLatestV2Async } from "../../../External/Coinmarketcap";
import { QuotesLatestV2QueryParams } from "../../../External/Coinmarketcap/QuotesLatestV2QueryParams";
import { Parse } from "../../Helpers/CommandParser";
import { MessageEmbed } from "discord.js";

export default class CmcCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content.startsWith(`${this.prefix} cmc`);
    }

    public async Handle(): Promise<void> {
        const digest = Parse(this.message.content);
        const query = new QuotesLatestV2QueryParams();

        // Check if the --by [arg] flag is used, if not set the default
        // search by symbol.
        const byFlag = digest.flags.find((f) => f.name === "by");
        let byFlagInput = "symbol";

        // If the by flag is found, use those respective flag instead.
        if (byFlag) {
            byFlagInput = byFlag.value;
        }

        // Assign to each search param with accordance to the byFlag
        switch (byFlagInput) {
            case "slug":
                query.slug = digest.subject;
                break;
            case "id":
                query.id = digest.subject;
                break;
            default:
                query.symbol = digest.subject;
        }

        try {
            const {
                data: { data },
            } = await GetQuotesLatestV2Async(query);

            // The default quote currency
            const quotePrice = "USD";

            // Get first keys of the object as different search will
            // yield different kind of keys.
            const firstKey = Object.keys(data)[0];

            // The target object that we will be working with to extract
            // out the useful informations.
            let target: typeof data[""];

            // For the search by 'slug' and 'id', it returns an object
            // as expected, but with 'symbol' it is encapsulated within
            // an array, which is casted explicitly to use.
            switch (byFlagInput) {
                case "slug":
                case "id":
                    target = data[firstKey] as typeof data[""];
                    break;
                default:
                    target = data[firstKey][0] as typeof data[""];
            }

            const targetQuote = target.quote[quotePrice];

            const embed = new MessageEmbed()
                .setTitle(`${target.name} (${target.symbol})`)
                .setDescription(
                    "Latest data for its price, change percentage and more! 🥰"
                )
                .setURL(`https://coinmarketcap.com/currencies/${target.slug}`)
                .addField(`Price (${quotePrice})`, targetQuote.price)
                .addField("1hrs", targetQuote.percent_change_1h + "%", true)
                .addField("24hrs", targetQuote.percent_change_24h + "%", true)
                .addField("7d", targetQuote.percent_change_7d + "%", true)
                .addField("30d", targetQuote.percent_change_30d + "%", true)
                .addField("60d", targetQuote.percent_change_60d + "%", true)
                .addField("90d", targetQuote.percent_change_90d + "%", true)
                .addField("Market Cap", targetQuote.market_cap, true)
                .addField("Trading Pairs", target.num_market_pairs, true)
                .addField(
                    "Market Dominance",
                    targetQuote.market_cap_dominance,
                    true
                )
                .setFooter(
                    "Powered by CoinMarketCap • Kyle is a beast",
                    "https://coinmarketcap.com/favicon.ico"
                )
                .setThumbnail(
                    `https://s2.coinmarketcap.com/static/img/coins/64x64/${target.id}.png`
                );

            this.message.channel.send(embed);
        } catch (e: unknown) {
            console.log(e);
            this.message.channel.send("Opps, something went wrong!");
        }
    }
}
