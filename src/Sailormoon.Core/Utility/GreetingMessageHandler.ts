import GreetingsData from "../Data/GreetingsData";
import MessageHandler from "./MessageHandler";
import Randomizer from "./Randomizer";

export default class GreetingMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        return GreetingsData.includes(this.message.content);
    }

    public execute(): void {
        this.response = Randomizer.RandomElement(GreetingsData);
        this.channel.send(this.response);
    }
}
