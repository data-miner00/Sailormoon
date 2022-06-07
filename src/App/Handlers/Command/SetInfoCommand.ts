import { ActivityType, PresenceStatusData } from "discord.js";
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
            ["activity", "avatar", "status", "name"].includes(f.name)
        );
        const criteria = criteriaFlag?.name ?? "activity";

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

                bot.user
                    .setActivity({
                        name: digest.subject,
                        type: activityType,
                    })
                    .then(() => {
                        this.message.channel.send(
                            `> (●'◡'●) ${this.message.author.username} has updated my status.`
                        );
                    })
                    .catch((reason) => {
                        this.message.channel.send(
                            `> (┬┬﹏┬┬) Status update failed because ${reason}`
                        );
                    });

                break;

            case "avatar":
                bot.user
                    .setAvatar(digest.subject)
                    .then(() => {
                        this.message.channel.send(
                            `> (●'◡'●) ${this.message.author.username} has updated my avatar.`
                        );
                    })
                    .catch((reason) => {
                        this.message.channel.send(
                            `> (┬┬﹏┬┬) Avatar update failed because ${reason}`
                        );
                    });
                break;

            case "status":
                const statusFlag = digest.flags.find(
                    (f) => f.name === "status"
                );

                if (statusFlag) {
                    const inputStatusFlag = digest.subject.toLowerCase();

                    if (!this.ValidatePresenceStatus(inputStatusFlag)) {
                        this.message.channel.send(
                            `The status "${digest.subject}" is invalid. Please try \`online\`, \`dnd\` or \`idle\` instead.`
                        );
                        return;
                    }

                    bot.user
                        .setStatus(inputStatusFlag)
                        .then(() => {
                            this.message.react("🆗");
                        })
                        .catch(() => {
                            this.message.react("❌");
                        });
                }
                break;

            case "name":
                bot.user
                    .setUsername(digest.subject)
                    .then(() => {
                        this.message.channel.send(
                            `> (●'◡'●) ${this.message.author.username} has updated my username.`
                        );
                    })
                    .catch((reason) => {
                        this.message.channel.send(
                            `> (┬┬﹏┬┬) Avatar update failed because ${reason}`
                        );
                    });

                break;

            default:
                // unreachable code
                this.message.channel.send(
                    "> Sorry, the criteria specified is not recognized. Try `--activity`, `--avatar` or `--blah` instead."
                );
        }
    }

    private ValidateActivityType(
        activityType: string
    ): activityType is ActivityType {
        return ["PLAYING", "STREAMING", "LISTENING", "WATCHING"].includes(
            activityType
        );
    }

    private ValidatePresenceStatus(
        presenceStatus: string
    ): presenceStatus is PresenceStatusData {
        return ["dnd", "idle", "invisible", "online"].includes(presenceStatus);
    }
}
