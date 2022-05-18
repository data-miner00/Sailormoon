import Controller from "../../Core/Controller/Controller";
import MessageHandler from "../../Core/Handlers/MessageHandler";
import HelloMessage from "../Handlers/Message/HelloMessage";

export default class MessageController extends Controller<MessageHandler> {
    protected RegisterHandlers(): void {
        this.RegisterHandler(new HelloMessage(this.message));
    }
}
