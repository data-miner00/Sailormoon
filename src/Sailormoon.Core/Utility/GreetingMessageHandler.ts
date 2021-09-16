import GreetingsData from "../Data/GreetingsData";
import MessageHandler from "./MessageHandler";
import Randomizer from "./Randomizer";

export default class GreetingMessageHandler extends MessageHandler {
    protected conditionChecker(message: string): boolean {
        return GreetingsData.includes(message);
    }
    protected responseGetter(): string {
        return Randomizer.RandomElement(GreetingsData);
    }
    protected execute(): void {
        this.channel.send(this.response);
    }
}
