import GratificationData from "../Data/GratificationData";
import MessageHandler from "./MessageHandler";

export default class ThanksMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        GratificationData.forEach((gratification: string): boolean => {
            if (this.message.content.toLowerCase().search(gratification) >= 0)
                return true;
        });
        return false;
    }

    public execute(): void {
        this.message.react("✅");
    }
}
