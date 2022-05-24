import { Client, ClientEvents } from "discord.js";
import Application from "../../App/Application";
import IEvent from "./IEvent";

export default abstract class BaseEvent implements IEvent {
    public eventName: keyof ClientEvents;
    public abstract EventHandler(
        ...args: ClientEvents[keyof ClientEvents]
    ): void;
    public bot: Client;

    protected constructor(eventName: keyof ClientEvents) {
        this.eventName = eventName;
        this.bot = Application.GetInstance()._bot;
    }
}
