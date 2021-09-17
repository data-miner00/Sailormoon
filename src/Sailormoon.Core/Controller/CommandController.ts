import BoredCommand from "../Command/BoredCommand";
import Command from "../Command/Command";
import MsiaCovidCommand from "../Command/MsiaCovidCommand";
import PollCommand from "../Command/PollCommand";
import GeneralUtils from "../Utility/GeneralUtils";
import Controller from "./Controller";

export default class CommandController extends Controller<Command> {
    // Register all the commands here with the pattern
    protected registerHandlers(): void {
        this.registerHandler(new PollCommand(this.message));
        this.registerHandler(new BoredCommand(this.message));
        this.registerHandler(new MsiaCovidCommand(this.message));
    }

    protected sendResponse(): void {
        this.handlers.every((command: Command): boolean => {
            const commandSignature: string =
                GeneralUtils.extractCommandSignature(this.message);
            if (command.commandSignature == commandSignature) {
                command.execute();
                return false;
            }
            return true;
        });
    }
}
