import { Message, MessageEmbed, User } from "discord.js";
import Command from "./Command";
import ListEmoji from "../../Data/ListEmoji";
import ICallbackable from "./ICallbackable";

export default class VotingPollCommand
    extends Command<string>
    implements ICallbackable
{
    public commandSignature: string = "vote";

    private pollTitle: string;
    private customArguments: Array<string>;

    public constructor(message: Message) {
        super(message);
        this.CustomPreprocessCommand();
    }

    private CustomPreprocessCommand(): void {
        // Remove ?vote
        const rawStringContent = this.message.content.substring(
            this.commandSignature.length + 1
        );

        // Split arguments into array of string
        let args: string[] = rawStringContent.split(";");

        // Trim arguments
        this.customArguments = args.map((arg) => arg.trim());

        // Set the first arg to title and remove it from args
        this.pollTitle = this.customArguments.splice(0, 1)[0];
    }

    private static mapArgumentsToVotingString(args: string[]): string {
        for (let i = 0; i < args.length; i++) {
            args[i] = ListEmoji[i] + ": " + args[i];
        }

        return "```\n" + args.join("\n") + "```";
    }

    protected setup(): void {
        const author: User = this.message.author;

        this.response = `🌼 **${this.pollTitle}** - polled by <@!${author.id}> \n`;
        this.response += VotingPollCommand.mapArgumentsToVotingString(
            this.customArguments
        );
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
            .send(this.response)
            .then(this.setupCallback)
            .catch(this.catchError);
    }
}
