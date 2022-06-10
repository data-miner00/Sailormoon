import MessageHandler from "../../../Core/Handlers/MessageHandler";
import Application from "../../Application";

export default class SystemInfoMessage extends MessageHandler {
    public ConditionChecker(): boolean {
        const bot = Application.GetInstance()._bot;

        return (
            this.message.mentions.has(bot.user) &&
            this.message.content.includes("What is the OS are you running on?")
        );
    }
    public Handle(): void {
        this.message.channel.send(
            `Hi <@!${this.message.author.id}>, I am operating on \`${process.platform}\`, have a nice day 🥳`
        );
    }
}
