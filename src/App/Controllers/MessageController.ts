import Controller from "../../Core/Controller/Controller";
import MessageHandler from "../../Core/Handlers/MessageHandler";
import { HelloMessage, NitroBoostMessage } from "../Handlers/Message";

export default class MessageController extends Controller<MessageHandler> {
    protected RegisterHandlers(): void {
        this.RegisterHandler(new HelloMessage(this.message));
        this.RegisterHandler(new NitroBoostMessage(this.message));
    }
}
