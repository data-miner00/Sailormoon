import { Message, User } from "discord.js";
import Configuration from "../App/Configuration";
import CommandObject from "../Command/CommandObject";
import activities from "../Data/ActivityList";

export default class GeneralUtils {
    private static configuration: Configuration = Configuration.getInstance();

    public static isBot(user: User): boolean {
        return user.bot;
    }

    public static isCommand(message: Message): boolean {
        return message.content.startsWith(this.configuration.commandPrefix);
    }

    public static preprocessCommand(message: Message): CommandObject {
        const args: string[] = message.content.split(" ");
        const command: string = args[0].slice(1);
        return new CommandObject(command, args.slice(1));
    }

    public static extractCommandSignature(message: Message): string {
        return message.content.split(" ")[0].slice(1) || "";
    }
}

export function* activityGenerator() {
    let loop_counter = 0;
    for (;;) {
        yield activities[loop_counter];

        if (loop_counter === activities.length - 1) loop_counter = 0;
        else loop_counter++;
    }
}
