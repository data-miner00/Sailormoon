import { ActivityType, PresenceStatusData } from "discord.js";
import BaseEvent from "../../Core/Events/BaseEvent";
import settings from "../settings.json";

export default class ReadyEvent extends BaseEvent {
    public constructor() {
        super("ready");
    }

    public EventHandler = (): void => {
        const {
            events: { ready },
        } = settings;

        console.log(ready.message);

        this.bot.user.setPresence({
            activity: {
                name: ready.activity.subject,
                type: ready.activity.type as ActivityType,
            },
            status: ready.presence.status as PresenceStatusData,
        });
    };
}
