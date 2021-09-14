import { DMChannel, Message, NewsChannel, TextChannel, User } from "discord.js";
import CommandObject from "../Command/CommandObject";
import GeneralUtils from "../Utility/GeneralUtils";

export default class CommandController {
    #commandObj: CommandObject;
    #message: Message;
    #author: User;
    #channel: TextChannel | DMChannel | NewsChannel;

    constructor(message: Message) {
        this.#message = message;
        this.#commandObj = GeneralUtils.preprocessCommand(message);
        this.#author = message.author;
        this.#channel = message.channel;
    }
}
