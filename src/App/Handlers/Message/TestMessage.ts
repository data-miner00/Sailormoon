import MessageHandler from "../../../Core/Handlers/MessageHandler";

export default class TestMessage extends MessageHandler {
    public ConditionChecker(): boolean {
        return this.message.content === "test";
    }
    public Handle(): void {
        console.log("Test invoked");
    }
}
