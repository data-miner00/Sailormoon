import { ActivityType } from "discord.js";
import CommandHandler from "../../../Core/Handlers/CommandHandler";
import Application from "../../Application";
import { Parse } from "../../Helpers/CommandParser";

export default class SetInfoCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content.startsWith(`${this.prefix} set`);
    }

    public Handle(): void {
        const digest = Parse(this.message.content);
        const bot = Application.GetInstance()._bot;
        const criteria = digest.flags[0].name ?? "activity";

        if (!digest.subject) {
            this.message.channel.send(
                "You did not provide the subject to be set. Please provide it after the `set` keyword."
            );
            return;
        }

        switch (criteria) {
            case "activity":
                let activityType: ActivityType = "PLAYING";

                if (digest.flags[1]?.name === "type") {
                    activityType =
                        digest.flags[1].value.toUpperCase() as ActivityType;
                }

                bot.user.setActivity({
                    name: digest.subject,
                    type: activityType,
                });

                this.message.channel.send("Successfully set " + criteria);
                break;
        }
    }
}
