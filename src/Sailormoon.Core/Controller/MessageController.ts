import GreetingMessageHandler from "../MessageHandler/GreetingMessageHandler";
import MessageHandler from "../MessageHandler/MessageHandler";
import NitroBoostMessageHandler from "../MessageHandler/NitroBoostMessageHandler";
import TestMessageHandler from "../MessageHandler/TestMessageHandler";
import Controller from "./Controller";

export default class MessageController extends Controller<MessageHandler> {
    // Register new message handler here with the following pattern
    protected registerHandlers(): void {
        this.registerHandler(new TestMessageHandler(this.message));
        this.registerHandler(new GreetingMessageHandler(this.message));
        this.registerHandler(new NitroBoostMessageHandler(this.message));
    }

    protected sendResponse(): void {
        this.handlers.every((messageHandler: MessageHandler): boolean => {
            if (messageHandler.conditionChecker()) {
                messageHandler.execute();
                return false;
            }
            return true;
        });
    }
}
