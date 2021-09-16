import axios from "axios";
import AllChannel from "../Utility/AllChannel";
import Command from "./Command";
import CommandObject from "./CommandObject";

export default class MsiaCovidCommand extends Command {
    private static msiaCovidApiUrl: string =
        "https://api.apify.com/v2/key-value-stores/6t65lJVfs3d8s6aKc/records/LATEST?disableRedirect=true";

    protected commandObj: CommandObject;
    #channel: AllChannel;
    #replyMessage: string;

    public constructor(commandObj: CommandObject, channel: AllChannel) {
        super();
        this.commandObj = commandObj;
        this.#channel = channel;
    }

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
        this.#channel.send(this.#replyMessage).catch(this.catchError);
    }
}
