import MessageHandler from "./MessageHandler";

export default class ThanksMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        return this.message.content.toLowerCase().search("thanks") >= 0;
    }

    public execute(): void {
        this.message.react("✅");
    }
}
