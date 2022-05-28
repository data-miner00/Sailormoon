import { DMChannel, TextChannel } from "discord.js";
import CommandHandler from "../../../Core/Handlers/CommandHandler";
import Application from "../../Application";
import { Parse } from "../../Helpers/CommandParser";

export default class RelayMessageCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return (
            this.message.channel instanceof DMChannel &&
            this.message.content.startsWith(`${this.prefix} send`)
        );
    }
    public Handle(): void {
        let serverId: string;
        let channelId: string;

        const digest = Parse(this.message.content);

        if (!digest.subject) {
            this.message.channel.send("Please provide a message to relay");
            return;
        }

        const serverFlag = digest.flags.find((f) => f.name == "serverId");
        const channelFlag = digest.flags.find((f) => f.name == "channelId");

        if (!serverFlag) {
            this.message.channel.send(
                "Please provide the `--serverId` flag to target a server that I know."
            );
            return;
        } else if (!channelFlag) {
            this.message.channel.send(
                "Please provide the `--channelId` flag to target the specific channel."
            );
            return;
        }

        serverId = serverFlag.value;
        channelId = channelFlag.value;

        const guild = Application.GetInstance()._bot.guilds.cache.find(
            (g) => g.id == serverFlag.value
        );

        if (!guild) {
            this.message.channel.send(
                "The specified server could not be found."
            );
            return;
        }

        const channel = guild.channels.cache.get(channelId);

        if (!channel) {
            this.message.channel.send(
                "The channel cannot be found on the server."
            );
            return;
        }

        const escapeString = "<>";

        if (channel instanceof TextChannel) {
            channel
                .send(digest.subject.replace(escapeString, ""))
                .catch(this.message.channel.send);
        }
    }
}
