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

        const byFlag = digest.flags.find((f) => f.name === "by");

        let byFlagInput = "symbol";

        if (byFlag) {
            byFlagInput = byFlag.value;
        }

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
            const quotePrice = "USD";

            const target = data[
                digest.subject.toUpperCase()
            ][0] as typeof data[""];

            const targetQuote = target.quote[quotePrice];

            const embed = new MessageEmbed()
                .setTitle(`${target.name} (${digest.subject.toUpperCase()})`)
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
                .setFooter(
                    "Powered by CoinMarketCap • Kyle is a beast",
                    "https://coinmarketcap.com/favicon.ico"
                )
                .setThumbnail(
                    `https://s2.coinmarketcap.com/static/img/coins/64x64/${target.id}.png`
                );

            this.message.channel.send(embed);
        } catch (e: unknown) {
            this.message.channel.send("Opps, something went wrong!");
        }
    }
}
