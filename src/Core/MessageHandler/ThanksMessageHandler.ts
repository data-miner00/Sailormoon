import GratificationData from "../Data/GratificationData";
import MessageHandler from "./MessageHandler";

export default class ThanksMessageHandler extends MessageHandler {
    public conditionChecker(): boolean {
        for (var i = 0; i < GratificationData.length; i++) {
            const containsGratification: boolean =
                this.message.content
                    .toLowerCase()
                    .search(GratificationData[i]) >= 0;
            if (containsGratification) {
                return true;
            }
        }
        return false;
    }

    public execute(): void {
        this.message.react("✅");
    }
}
