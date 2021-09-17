import MessageHandler from "./MessageHandler";

export default class NitroBoostMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        return this.message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION";
    }
    public execute(): void {
        this.response = `<@!${this.message.author.id}> you are the best :)`;
        this.message.channel.send(this.response);
    }
}
