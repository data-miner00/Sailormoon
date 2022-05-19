import CommandHandler from "../../../Core/Handlers/CommandHandler";
import Application from "../../Application";

export default class PingCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content === "kyle?ping";
    }
    public Handle(): void {
        this.message.channel.send("pong!").then((message) => {
            const latency: number = Math.round(
                Application.GetInstance()._bot.ws.ping
            );
            message.edit("pong! `" + latency + "ms`");
        });
    }
}
