import { Message } from "discord.js";

export default abstract class Command {
    public abstract commandSignature: string;

    protected message: Message;

    public constructor(message: Message) {
        this.message = message;
    }

    public abstract execute(): void;

    protected abstract setup(): void;

    protected catchError(error): void {
        console.error(error);
    }
}
