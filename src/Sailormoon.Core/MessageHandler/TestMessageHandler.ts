import MessageHandler from "./MessageHandler";

export default class TestMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        return this.message.content == "test";
    }

    public execute(): void {
        this.response = "you have typed test in the chat";
        this.message.channel.send(this.response);
    }
}
