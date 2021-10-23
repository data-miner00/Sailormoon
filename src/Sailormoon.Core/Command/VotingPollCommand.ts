import { Message, MessageEmbed, User } from "discord.js";
import Command from "./Command";
import CommandObject from "./CommandObject";
import GeneralUtils from "../Utility/GeneralUtils";
import ListEmoji from "../Data/ListEmoji";
import ICallbackable from "./ICallbackable";

export default class VotingPollCommand
    extends Command
    implements ICallbackable
{
    public commandSignature: string = "vote";

    private commandObject: CommandObject = GeneralUtils.preprocessCommand(
        this.message
    );
    private messageReply: string;

    public constructor(message: Message) {
        super(message);
    }

    private mapArgumentsToVotingString(args: string[]): string {
        for (let i = 0; i < args.length; i++) {
            args[i] = ListEmoji[i] + ": " + args[i];
        }

        return "```\n" + args.join("\n") + "```";
    }

    protected setup(): void {
        const author: User = this.message.author;

        this.messageReply = `🌼 **${author.username}** had started a poll below!\n`;
        this.messageReply += this.mapArgumentsToVotingString(
            this.commandObject.arguments
        );

        console.log("command object");
        console.log(this.commandObject);
    }

    // `this` context not available in callback
    public setupCallback(message: Message): void {
        const count = message.content.split("\n").length - 2;
        for (let i = 0; i < count; i++) {
            message.react(ListEmoji[i]);
        }
    }

    public execute(): void {
        this.setup();
        this.message.channel
            .send(this.messageReply)
            .then(this.setupCallback)
            .catch(this.catchError);
    }
}
