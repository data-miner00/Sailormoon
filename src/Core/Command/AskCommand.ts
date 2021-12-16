import { Message } from "discord.js";
import Randomizer from "../../Utilities/Randomizer";
import Command from "./Command";

export default class AskCommand extends Command<string> {
    public commandSignature: string = "ask";

    private question: string;

    public constructor(message: Message) {
        super(message);

        // this.question = this.message.content.slice(this.commandSignature.length + 1);
    }

    protected setup(): void {
        const random = Randomizer.IntegerRandomizer(0, Number.MAX_SAFE_INTEGER);
        const a = AskCommand.f(random);
        const b = AskCommand.g(random);

        if (a > b) {
            this.response = AskCommand.optionalMaskProvider(
                Randomizer.RandomElement(["Yes", "yeah", "yep", "yah"])
            );
        } else {
            this.response = AskCommand.optionalMaskProvider(
                Randomizer.RandomElement(["No", "Nope", "Nah", "naah"])
            );
        }
    }

    public execute(): void {
        this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }

    private static f(x: number): number {
        return Math.sin(x) + Math.cos(x);
    }

    private static g(x: number): number {
        return Math.cos(x) * Math.sin(2 * Math.PI * x);
    }

    private static optionalMaskProvider(response: string): string {
        if (Randomizer.PercentageRandomizer() > 50) {
            return `||${response}||`;
        }
        return response;
    }
}
