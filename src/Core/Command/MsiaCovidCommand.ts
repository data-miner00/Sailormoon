import axios from "axios";
import { Message } from "discord.js";
import Command from "./Command";

export default class MsiaCovidCommand extends Command<string> {
    public commandSignature: string = "covid";

    private static readonly msiaCovidApiUrl: string =
        "https://api.apify.com/v2/key-value-stores/6t65lJVfs3d8s6aKc/records/LATEST?disableRedirect=true";

    public constructor(message: Message) {
        super(message);
    }

    protected async setup(): Promise<void> {
        const { data } = await axios.get(MsiaCovidCommand.msiaCovidApiUrl);

        this.response = `\`\`\`
🤧 Total Malaysia Cases 🤧

Total Tested Positive: ${data.testedPositive},
Total Recovered: ${data.recovered},
Total Active Cases : ${data.activeCases},
ICU : ${data.inICU},
Deceased: ${data.deceased},
Updated: ${data.lastUpdatedAtSource}

Please take care and stay safe 😁.
\`\`\``;
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
