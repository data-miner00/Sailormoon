import MessageHandler from "./MessageHandler";
import HdlReplyData from "../../Data/HdlReplyData";
import Randomizer from "../../Utilities/Randomizer";

export default class HdlMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        return this.message.content.toLowerCase().includes("hdl");
    }
    public execute(): void {
        if (Randomizer.PercentageRandomizer() > 30) {
            this.message.reply(Randomizer.RandomElement(HdlReplyData));
        }
    }
}
