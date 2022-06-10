import { ClientEvents } from "discord.js";

export default interface IEvent {
    eventName: keyof ClientEvents;
    EventHandler: (...args: ClientEvents[keyof ClientEvents]) => void;
}
