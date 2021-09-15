import MessageHandler from "./MessageHandler";

export default class TestMessageHandler extends MessageHandler {
    protected conditionChecker(message: string): boolean {
        return message == "test";
    }

    protected responseGetter(): string {
        return "you have typed test in the chat";
    }

    protected execute(): void {
        this.channel.send(this.response);
    }
}
