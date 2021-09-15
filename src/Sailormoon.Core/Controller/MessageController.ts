import { Message, User } from "discord.js";
import AllChannel from "../Utility/AllChannel";
import TestMessageHandler from "../Utility/TestMessageHandler";

export default class MessageController {
    #message: Message;
    #author: User;
    #channel: AllChannel;
    #response: string;

    constructor(message: Message) {
        this.#message = message;
        this.#author = message.author;
        this.#channel = message.channel;

        this.delegateMessage();
    }

    private delegateMessage(): void {
        new TestMessageHandler(this.#message.content, this.#channel);
    }
}
