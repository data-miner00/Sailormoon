import Handler from "./Handler";
import settings from "../../App/settings.json";
import { Message } from "discord.js";

export default abstract class CommandHandler extends Handler {
    protected prefix: string = settings.prefix;

    public constructor(message: Message) {
        super(message);
    }
}
