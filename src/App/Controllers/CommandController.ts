import Controller from "../../Core/Controller/Controller";
import CommandHandler from "../../Core/Handlers/CommandHandler";
import { PingCommand } from "../Handlers/Command/";
import HelpCommand from "../Handlers/Command/HelpCommand";

export default class CommandController extends Controller<CommandHandler> {
    protected RegisterHandlers(): void {
        this.RegisterHandler(new PingCommand(this.message));
        this.RegisterHandler(new HelpCommand(this.message));
    }
}
