import CommandHandler from "../../../Core/Handlers/CommandHandler";
import { Team } from "../../../External/Teams";
import { Parse } from "../../Helpers/CommandParser";

export default class TeamCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content.startsWith(`${this.prefix} team`);
    }
    public async Handle(): Promise<void> {
        const digest = Parse(this.message.content);

        if (!digest.subject) {
            this.message.channel.send(
                "❌ Please indicate which teams do you want to check - `seas` or `trees`."
            );
            return;
        }

        digest.subject = digest.subject.toLowerCase();

        let response: string;

        if (this.ValidateTeam(digest.subject)) {
            const res = await Team(digest.subject);

            if (digest.subject === "seas") {
                const count = res.data.count as string;

                response = `🌊 #teamseas: ${count} pounds of plastic collected! 🎉`;
            } else {
                const html = res.data as string;
                const match = html.match(
                    /<h2 id="totalTrees" data-count="(.*?)" class="counter text-6xl sm:text-8xl lg:text-hero font-black pb-24 md:pb-0">0<\/h2>/
                );

                const count = match[1];
                response = `🎄 #teamtrees: ${count} trees planted! 🥳`;
            }
        } else {
            response =
                "❌ Invalid argument. Only `trees` and `seas` will work.";
        }

        this.message.channel.send(response);
    }

    private ValidateTeam(team: string): team is "seas" | "trees" {
        return ["seas", "trees"].includes(team);
    }
}
