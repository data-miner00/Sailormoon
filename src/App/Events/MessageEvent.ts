import { Message } from "discord.js";
import BaseEvent from "../../Core/Events/BaseEvent";
import settings from "../settings.json";

export default class MessageEvent extends BaseEvent {
    public constructor() {
        super("message");
    }

    public EventHandler(message: Message): void {
        if (message.author.bot) return;

        if (message.content.startsWith(settings.prefix)) {
            //
        } else {
            //
        }
    }
}
