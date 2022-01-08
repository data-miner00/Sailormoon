import { User } from "discord.js";
import Command from "./Command";
import PunishmentList from "../../Data/PunishmentList";
import Randomizer from "../../Utilities/Randomizer";

export default class PunishCommand extends Command<string> {
    public commandSignature: string = "punish";

    private userMentioned: User;

    protected setup(): void {
        console.log(this.message.mentions);
        this.userMentioned = this.message.mentions.users.first();

        if (!this.userMentioned) {
            this.response = "pls mention a ppl";
            return;
        }

        this.response = `${
            Randomizer.PercentageRandomizer() < 0.1 ? "woi" : ""
        } <@!${this.userMentioned.id}> ${Randomizer.RandomElement<string>(
            PunishmentList
        )}`;
    }

    public execute(): void {
        this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
