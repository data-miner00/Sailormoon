import CommandHandler from "../../../Core/Handlers/CommandHandler";

export default class PingCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content === "kyle?ping";
    }
    public Handle(): void {
        this.message.channel.send("pong");
    }
}
