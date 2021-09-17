import { Message } from "discord.js";

export default interface ICallbackable {
    setupCallback(message: Message): void;
}
