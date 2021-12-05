import { Message } from "discord.js";

export default abstract class Controller<T> {
    protected message: Message;
    protected handlers: Array<T>;

    public constructor(message: Message) {
        this.message = message;
        this.handlers = [];

        this.registerHandlers();
        this.sendResponse();
    }

    protected registerHandler(t: T): void {
        this.handlers.push(t);
    }
    protected abstract registerHandlers(): void;

    protected abstract sendResponse(): void;
}
