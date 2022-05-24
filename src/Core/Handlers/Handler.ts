import { Message } from "discord.js";
import IHandler from "./IHandler";

export default abstract class Handler implements IHandler {
    protected response: string;
    protected message: Message;

    public abstract ConditionChecker(): boolean;
    public abstract Handle(): void;

    protected constructor(message: Message) {
        this.message = message;
    }
}
