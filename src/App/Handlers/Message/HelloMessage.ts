import MessageHandler from "../../../Core/Handlers/MessageHandler";

export default class HelloMessage extends MessageHandler {
    public ConditionChecker(): boolean {
        return this.message.content === "Hello";
    }
    public Handle(): void {
        this.message.channel.send("Hi");
    }
}
