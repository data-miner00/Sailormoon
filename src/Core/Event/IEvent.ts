import EventType from "./EventType";

export default interface IEvent {
    eventType: EventType;
    callback: Function;
}
