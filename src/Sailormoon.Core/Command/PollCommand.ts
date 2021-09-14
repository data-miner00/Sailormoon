import CommandObject from "./CommandObject";
import Command from "./Command";
import { MessageEmbed, User, Message } from "discord.js";
import AllChannel from "../Utility/AllChannel";
import ICallbackable from "./ICallbackable";

export default class PollCommand extends Command implements ICallbackable {
    protected commandObj: CommandObject;
    #author: User;
    #channel: AllChannel;
    #commandEmbed: MessageEmbed;

    public constructor(
        commandObj: CommandObject,
        channel: AllChannel,
        author: User
    ) {
        super();
        this.commandObj = commandObj;
        this.#author = author;
        this.#channel = channel;
        this.#commandEmbed = new MessageEmbed();
    }

    protected setup(): void {
        this.#commandEmbed
            .setTitle(this.commandObj.arguments.join(" "))
            .setColor("RANDOM")
            .setFooter("Powered by Zoo Melaka 🚒")
            .setAuthor(this.#author.username, this.#author.avatarURL());
    }

    public setupCallback(message: Message): void {
        message.react("👍");
        message.react("👎");
        message.react("🤓");
    }

    public execute(): void {
        this.setup();
        this.#channel
            .send(this.#commandEmbed)
            .then(this.setupCallback)
            .catch(this.catchError);
    }
}
