import Command from "./Command";
import { MessageEmbed, Message } from "discord.js";
import ICallbackable from "./ICallbackable";
import CommandObject from "./CommandObject";
import GeneralUtils from "../Utility/GeneralUtils";

export default class PollCommand extends Command implements ICallbackable {
    public commandSignature: string = "poll";

    #commandEmbed: MessageEmbed;
    #commandObj: CommandObject;

    public constructor(message: Message) {
        super(message);
        this.#commandObj = GeneralUtils.preprocessCommand(this.message);
        this.#commandEmbed = new MessageEmbed();
    }

    protected setup(): void {
        this.#commandEmbed
            .setTitle(this.#commandObj.arguments.join(" "))
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
            .send(this.#commandEmbed)
            .then(this.setupCallback)
            .catch(this.catchError);
    }
}
