import MessageHandler from "../../../Core/Handlers/MessageHandler";

export default class NitroBoostMessage extends MessageHandler {
    public ConditionChecker(): boolean {
        return this.message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION";
    }
    public Handle(): void {
        this.message.channel.send(
            `<@!${this.message.author.id} you are the best 😊`
        );
    }
}
