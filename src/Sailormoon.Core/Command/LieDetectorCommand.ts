import { User } from "discord.js";
import Command from "./Command";
import Randomizer from "../Utility/Randomizer";

export default class LieDetectorCommand extends Command {
    public commandSignature: string = "lie";

    #messageReply: string;

    protected setup(): void {
        const tagged: User = this.message.mentions.users.first();

        if (Randomizer.PercentageRandomizer() > 45) {
            this.#messageReply =
                tagged.username +
                " --> 🚨🚨 LIER DETECTED 🚨🚨, call the cops immediately!";
        } else {
            this.#messageReply =
                tagged.username + " --> He's being honest here 😇😇";
        }
    }

    public execute(): void {
        this.setup();
        this.message.channel.send(this.#messageReply);
    }
}
