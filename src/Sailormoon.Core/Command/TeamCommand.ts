import axios from "axios";
import { Message } from "discord.js";
import Command from "./Command";

export default class TeamCommand extends Command<string> {
    public commandSignature: string = "team";

    public constructor(message: Message) {
        super(message);
    }

    protected async setup(): Promise<void> {
        if (this.arguments.includes("trees")) {
            const res = await axios.get("https://teamtrees.org/", {
                headers: {
                    "User-Agent": "",
                },
            });

            const match = (res.data as string).match(
                /<h2 id="totalTrees" data-count="(.*?)" class="counter text-6xl sm:text-8xl lg:text-hero font-black pb-24 md:pb-0">0<\/h2>/
            );

            const count = match[1];
            this.response = `🎄 #teamtrees: ${count} trees planted! 🥳`;

            // this.replyMessage = "Sorry, error occurred!";
        } else if (this.arguments.includes("seas")) {
            const res = await axios.get(
                "https://tscache.com/donation_total.json"
            );

            const count = res.data.count as string;
            this.response = `🌊 #teamseas: ${count} pounds of plastic collected! 🎉`;

            // this.replyMessage = "Sorry, error occurred!";
        } else {
            this.response = "Sorry, no such argument is supported!";
        }
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
