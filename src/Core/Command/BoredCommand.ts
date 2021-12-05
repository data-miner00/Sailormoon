import axios from "axios";
import { Message } from "discord.js";
import Command from "./Command";

export default class BoredCommand extends Command<string> {
    public commandSignature: string = "bored";

    private static readonly boredApiUrl: string =
        "https://www.boredapi.com/api/activity/";

    public constructor(message: Message) {
        super(message);
    }

    protected async setup(): Promise<void> {
        const { data } = await axios.get(BoredCommand.boredApiUrl);

        this.response = `Hi <@!${this.message.author.id}>! Do this Task 😎
        \`\`\`Activity: ${data.activity}\nType: ${data.type}\nParticipants: ${data.participants}\nLinks: ${data.link}\`\`\`
        `;
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
