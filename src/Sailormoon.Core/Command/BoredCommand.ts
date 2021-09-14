import axios from "axios";
import { User } from "discord.js";
import Configuration from "../App/Configuration";
import AllChannel from "../Utility/AllChannel";
import Command from "./Command";
import CommandObject from "./CommandObject";

export default class BoredCommand extends Command {
    protected commandObj: CommandObject;
    #author: User;
    #channel: AllChannel;

    #replyMessage: string;

    public constructor(
        commandObj: CommandObject,
        channel: AllChannel,
        author: User
    ) {
        super();
        this.commandObj = commandObj;
        this.#author = author;
        this.#channel = channel;
    }

    protected async setup(): Promise<void> {
        const configuration: Configuration = new Configuration();
        const { data } = await axios.get(configuration.boredApiUrl);

        this.#replyMessage = `Hi <@!${this.#author.id}>! Do this Task 😎
        \`\`\`Activity: ${data.activity}\nType: ${data.type}\nParticipants: ${
            data.participants
        }\nLinks: ${data.link}\`\`\`
        `;
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.#channel.send(this.#replyMessage).catch(this.catchError);
    }
}
