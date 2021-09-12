import EventType from "./EventType";
import IEvent from "./IEvent";
import Application from "../App/Application";
import { Client } from "discord.js";
import ActivityType from "./ActivityType";

export default class Ready implements IEvent {
    eventType: EventType;

    callback: Function;

    bot: Client;

    constructor() {
        this.eventType = EventType.READY;
        this.callback = this.handlerFunction;
        this.bot = Application.getBotReference();
    }

    handlerFunction = () => {
        console.log("I'm ready");

        this.bot.user.setActivity(
            "Violin Sonata No 9 Kreutzer First Movement",
            {
                type: ActivityType.LISTENING,
            }
        );
    };
}
