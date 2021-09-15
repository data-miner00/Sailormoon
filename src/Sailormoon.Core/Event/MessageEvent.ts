import EventType from "./EventType";
import IEvent from "./IEvent";
import { Message } from "discord.js";
import GeneralUtils from "../Utility/GeneralUtils";

export default class MessageEvent implements IEvent {
    eventType: EventType;
    callback: Function;

    constructor() {
        this.eventType = EventType.MESSAGE;
        this.callback = this.handlerFunction;
    }

    handlerFunction(message: Message): void {
        if (GeneralUtils.isBot(message.author)) return;

        if (GeneralUtils.isCommand(message)) {
            return;
        }
    }
}
