import EventType from "./EventType";
import IEvent from "./IEvent";
import { Message as M } from "discord.js";

export default class Message implements IEvent {
    eventType: EventType;
    callback: Function;

    constructor() {
        this.eventType = EventType.MESSAGE;
        this.callback = this.handlerFunction;
    }

    handlerFunction(message: M): void {
        if (message.author.bot) return;

        const messageContent: string = message.content;
        message.channel.send(messageContent);
    }
}
