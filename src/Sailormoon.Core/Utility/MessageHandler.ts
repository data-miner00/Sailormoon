import { Message } from "discord.js";
import AllChannel from "./AllChannel";
import AllResponse from "./AllResponse";

export default abstract class MessageHandler {
    protected channel: AllChannel;
    protected response: AllResponse;
    protected message: Message;
    public abstract conditionChecker(): boolean;
    public abstract execute(): void;

    constructor(message: Message, channel: AllChannel) {
        this.channel = channel;
        this.message = message;
    }
}
