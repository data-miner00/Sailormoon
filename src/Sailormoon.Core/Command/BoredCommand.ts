import axios from "axios";
import Command from "./Command";

export default class BoredCommand extends Command {
    public commandSignature: string = "bored";

    private static boredApiUrl: string =
        "https://www.boredapi.com/api/activity/";

    #replyMessage: string;

    protected async setup(): Promise<void> {
        const { data } = await axios.get(BoredCommand.boredApiUrl);

        this.#replyMessage = `Hi <@!${this.message.author.id}>! Do this Task 😎
        \`\`\`Activity: ${data.activity}\nType: ${data.type}\nParticipants: ${data.participants}\nLinks: ${data.link}\`\`\`
        `;
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.#replyMessage).catch(this.catchError);
    }
}
