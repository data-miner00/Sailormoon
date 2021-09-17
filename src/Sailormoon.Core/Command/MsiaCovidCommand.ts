import axios from "axios";
import Command from "./Command";

export default class MsiaCovidCommand extends Command {
    public commandSignature: string = "covid";

    private static msiaCovidApiUrl: string =
        "https://api.apify.com/v2/key-value-stores/6t65lJVfs3d8s6aKc/records/LATEST?disableRedirect=true";

    #replyMessage: string;

    protected async setup(): Promise<void> {
        const { data } = await axios.get(MsiaCovidCommand.msiaCovidApiUrl);

        this.#replyMessage = `\`\`\`
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
        this.message.channel.send(this.#replyMessage).catch(this.catchError);
    }
}
