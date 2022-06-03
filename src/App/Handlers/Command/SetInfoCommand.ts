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

        const criteriaFlag = digest.flags.find((f) =>
            ["activity", "watching", "listening"].includes(f.name)
        );
        const criteria = criteriaFlag.name ?? "activity";

        if (!digest.subject) {
            this.message.channel.send(
                "You did not provide the subject to be set. Please provide it after the `set` keyword."
            );
            return;
        }

        switch (criteria) {
            case "activity":
                let activityType: ActivityType = "PLAYING";

                const typeFlag = digest.flags.find((f) => f.name == "type");

                if (typeFlag) {
                    const inputActivityType = typeFlag.value.toUpperCase();

                    if (!this.ValidateActivityType(inputActivityType)) {
                        this.message.channel.send(
                            "The activity type " +
                                inputActivityType.toLowerCase() +
                                " is not supported. Try `playing`, `listening` or `watching` instead."
                        );
                        return;
                    }

                    activityType = inputActivityType;
                }

                bot.user.setActivity({
                    name: digest.subject,
                    type: activityType,
                });

                this.message.channel.send("Successfully set " + criteria);
                break;
        }
    }

    private ValidateActivityType(
        activityType: string
    ): activityType is ActivityType {
        return ["PLAYING", "STREAMING", "LISTENING", "WATCHING"].includes(
            activityType
        );
    }
}
