import { Message, User } from "discord.js";
import Configuration from "../App/Configuration";
import CommandObject from "../Command/CommandObject";

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
}
