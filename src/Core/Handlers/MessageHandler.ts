import { Message } from "discord.js";
import Handler from "./Handler";

export default abstract class MessageHandler extends Handler {
    public constructor(message: Message) {
        super(message);
    }
}
