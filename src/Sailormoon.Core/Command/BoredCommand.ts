import axios from "axios";
import { User } from "discord.js";
import Configuration from "../App/Configuration";
import AllChannel from "../Utility/AllChannel";
import Command from "./Command";
import CommandObject from "./CommandObject";

export default class BoredCommand extends Command {
    private static boredApiUrl: string =
        "https://www.boredapi.com/api/activity/";
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
        const { data } = await axios.get(BoredCommand.boredApiUrl);

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
