import { Message, User } from "discord.js";
import AllChannel from "../Utility/AllChannel";
import GreetingMessageHandler from "../Utility/GreetingMessageHandler";
import MessageHandler from "../Utility/MessageHandler";
import TestMessageHandler from "../Utility/TestMessageHandler";

export default class MessageController {
    #message: Message;

    private messageHandlers: Array<MessageHandler>;

    constructor(message: Message) {
        this.#message = message;
        this.messageHandlers = [];

        this.registerMessageHandlers();

        this.sendResponse();
    }

    private registerMessageHandlers(): void {
        this.registerMessageHandler(new TestMessageHandler(this.#message));
        this.registerMessageHandler(new GreetingMessageHandler(this.#message));
    }

    private registerMessageHandler(messageHandler: MessageHandler): void {
        this.messageHandlers.push(messageHandler);
    }

    private sendResponse(): void {
        this.messageHandlers.forEach((messageHandler: MessageHandler): void => {
            if (messageHandler.conditionChecker()) {
                messageHandler.execute();
                return;
            }
        });
    }
}
