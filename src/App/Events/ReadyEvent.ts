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

        // TODO: Check for types? Throw if incorrect?
        setTimeout(() => {
            this.bot.user
                .setActivity(ready.activity.subject, {
                    type: ready.activity.type as ActivityType,
                })
                .catch(console.error);
        }, 1000);

        this.bot.user.setPresence({
            status: ready.presence.status as PresenceStatusData,
        });
    };
}
