import CommandHandler from "../../../Core/Handlers/CommandHandler";

export default class HelpCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content.startsWith(`${this.prefix} help`);
    }
    public Handle(): void {
        if (this.message.content !== `${this.prefix} help`) {
            this.message.channel.send(
                `Sorry, do you mean \`${this.prefix} help\`?`
            );
            return;
        }
    }
}
