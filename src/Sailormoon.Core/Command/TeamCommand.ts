import axios from "axios";
import { Message } from "discord.js";
import GeneralUtils from "../Utility/GeneralUtils";
import Command from "./Command";
import CommandObject from "./CommandObject";

export default class TeamCommand extends Command {
    public commandSignature: string = "team";
    private commandObj: CommandObject;
    private replyMessage: string;

    public constructor(message: Message) {
        super(message);
        this.commandObj = GeneralUtils.preprocessCommand(message);
    }

    protected async setup(): Promise<void> {
        if (this.commandObj.arguments.includes("trees")) {
            const res = await axios.get("https://teamtrees.org/", {
                headers: {
                    "User-Agent": "",
                },
            });

            const match = (res.data as string).match(
                /<h2 id="totalTrees" data-count="(.*?)" class="counter text-6xl sm:text-8xl lg:text-hero font-black pb-24 md:pb-0">0<\/h2>/
            );

            const count = match[1];
            this.replyMessage = `#teamtrees: ${count} trees planted!`;

            // this.replyMessage = "Sorry, error occurred!";
        } else if (this.commandObj.arguments.includes("seas")) {
            const res = await axios.get(
                "https://tscache.com/donation_total.json"
            );

            const count = res.data.count as string;
            this.replyMessage = `#teamseas: ${count} pounds of plastic collected!`;

            // this.replyMessage = "Sorry, error occurred!";
        } else {
            this.replyMessage = "Sorry, no such argument is supported!";
        }
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.replyMessage);
    }
}
