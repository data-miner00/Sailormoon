import Command from "./Command";
import { MessageEmbed, Message } from "discord.js";
import ICallbackable from "./ICallbackable";

export default class PollCommand
    extends Command<MessageEmbed>
    implements ICallbackable
{
    public commandSignature: string = "poll";

    public constructor(message: Message) {
        super(message);
        this.response = new MessageEmbed();
    }

    protected setup(): void {
        this.response
            .setTitle(this.arguments.join(" "))
            .setColor("RANDOM")
            .setFooter("Powered by Zoo Melaka 🚒")
            .setAuthor(
                this.message.author.username,
                this.message.author.avatarURL()
            );
    }

    public setupCallback(message: Message): void {
        message.react("👍");
        message.react("👎");
        message.react("🤓");
    }

    public execute(): void {
        this.setup();
        this.message.channel
            .send(this.response)
            .then(this.setupCallback)
            .catch(this.catchError);
    }
}
