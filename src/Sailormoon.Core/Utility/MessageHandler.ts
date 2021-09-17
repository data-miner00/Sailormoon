import { Message } from "discord.js";
import AllResponse from "./AllResponse";

export default abstract class MessageHandler {
    protected response: AllResponse;
    protected message: Message;
    public abstract conditionChecker(): boolean;
    public abstract execute(): void;

    constructor(message: Message) {
        this.message = message;
    }
}
