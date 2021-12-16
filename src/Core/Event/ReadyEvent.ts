import EventType from "./EventType";
import IEvent from "./IEvent";
import Application from "../../Worker/Application";
import { Client } from "discord.js";
import ActivityType from "./ActivityType";
import JobScheduler from "../../Utilities/JobScheduler";
import { activityGenerator } from "../../Utilities/GeneralUtils";
import Activity from "./Activity";

export default class ReadyEvent implements IEvent {
    eventType: EventType;

    callback: Function;

    bot: Client;

    private activityGenerator = activityGenerator();

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

        JobScheduler.schdeule("*/1 * * * *", (): void => {
            const activity: Activity | void =
                this.activityGenerator.next().value;

            if (activity) {
                this.bot.user
                    .setActivity(activity.what, {
                        type: activity.how,
                    })
                    .catch(console.error);
            }
        });
    };
}
