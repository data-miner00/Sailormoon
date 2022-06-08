import Controller from "../../Core/Controller/Controller";
import CommandHandler from "../../Core/Handlers/CommandHandler";
import {
    PingCommand,
    HashCommand,
    HelpCommand,
    RelayMessageCommand,
    SetInfoCommand,
    CmcCommand,
    TeamCommand,
} from "../Handlers/Command/";

export default class CommandController extends Controller<CommandHandler> {
    protected RegisterHandlers(): void {
        this.RegisterHandler(new PingCommand(this.message));
        this.RegisterHandler(new HelpCommand(this.message));
        this.RegisterHandler(new HashCommand(this.message));
        this.RegisterHandler(new RelayMessageCommand(this.message));
        this.RegisterHandler(new SetInfoCommand(this.message));
        this.RegisterHandler(new CmcCommand(this.message));
        this.RegisterHandler(new TeamCommand(this.message));
    }
}
