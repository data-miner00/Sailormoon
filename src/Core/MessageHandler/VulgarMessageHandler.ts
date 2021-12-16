import Randomizer from "../../Utilities/Randomizer";
import MessageHandler from "./MessageHandler";

export default class VulgarMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        return this.message.content.toLowerCase().search("fuck") >= 0;
    }

    public execute(): void {
        if (Randomizer.PercentageRandomizer() > 20) {
            return;
        }

        this.response = "No bad words are allowed";
        this.message.channel.send(this.response);
    }
}
