import AllChannel from "./AllChannel";

export default abstract class MessageHandler {
    protected channel: AllChannel;
    protected response: string;
    protected abstract conditionChecker(message: string): boolean;
    protected abstract responseGetter(): string;
    protected abstract execute(): void;

    constructor(message: string, channel: AllChannel) {
        this.channel = channel;
        if (this.conditionChecker(message)) {
            this.response = this.responseGetter();
            this.execute();
        }
    }
}
