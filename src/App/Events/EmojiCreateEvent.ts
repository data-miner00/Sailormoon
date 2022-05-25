import { GuildEmoji, TextChannel } from "discord.js";
import BaseEvent from "../../Core/Events/BaseEvent";
import Application from "../Application";

export default class EmojiCreateEvent extends BaseEvent {
    public constructor() {
        super("emojiCreate");
    }

    public EventHandler(emoji: GuildEmoji) {
        const guild = Application.GetInstance()._bot.guilds.cache.find(
            (g) => g.id == emoji.guild.id
        );

        let channelId: string;
        let channels = guild.channels.cache;

        channelLoop: for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelId = c[0];
                break channelLoop;
            }
        }

        const channel = guild.channels.cache.get(
            guild.systemChannelID || channelId
        ) as TextChannel;
        const message = `<:${emoji.name}:${emoji.id}>`;
        channel.send(message);
    }
}
