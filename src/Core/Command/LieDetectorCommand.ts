import { Message, User } from "discord.js";
import Command from "./Command";
import Randomizer from "../../Utilities/Randomizer";

export default class LieDetectorCommand extends Command<string> {
    public commandSignature: string = "lie";

    public constructor(message: Message) {
        super(message);
    }

    protected setup(): void {
        const tagged: User = this.message.mentions.users.first();

        if (Randomizer.PercentageRandomizer() > 45) {
            this.response =
                tagged.username +
                " --> 🚨🚨 LIER DETECTED 🚨🚨, call the cops immediately!";
        } else {
            this.response =
                tagged.username + " --> He's being honest here 😇😇";
        }
    }

    public execute(): void {
        this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }
}
