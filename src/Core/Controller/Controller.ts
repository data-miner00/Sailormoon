import { Message } from "discord.js";
import Handler from "../Handlers/Handler";

export default abstract class Controller<T extends Handler> {
    protected message: Message;
    protected handlers: Array<T>;

    public constructor(message: Message) {
        this.message = message;
        this.handlers = [];

        this.RegisterHandlers();
        this.SendResponse();
    }

    protected RegisterHandler(handler: T): void {
        this.handlers.push(handler);
    }

    protected abstract RegisterHandlers(): void;

    protected SendResponse(): void {
        this.handlers.every((handler: T): boolean => {
            if (handler.ConditionChecker()) {
                handler.Handle();
                return false;
            }
            return true;
        });
    }
}
