import AskCommand from "../Command/AskCommand";
import BookingCommand from "../Command/BookingCommand";
import BoredCommand from "../Command/BoredCommand";
import Command from "../Command/Command";
import JokeCommand from "../Command/JokeCommand";
import LieDetectorCommand from "../Command/LieDetectorCommand";
import MsiaCovidCommand from "../Command/MsiaCovidCommand";
import PollCommand from "../Command/PollCommand";
import TeamCommand from "../Command/TeamCommand";
import VotingPollCommand from "../Command/VotingPollCommand";
import GeneralUtils from "../Utility/GeneralUtils";
import Sendable from "../Utility/Sendable";
import Controller from "./Controller";

export default class CommandController extends Controller<Command<Sendable>> {
    // Register all the commands here with the pattern
    protected registerHandlers(): void {
        this.registerHandler(new PollCommand(this.message));
        this.registerHandler(new BoredCommand(this.message));
        this.registerHandler(new MsiaCovidCommand(this.message));
        this.registerHandler(new JokeCommand(this.message));
        this.registerHandler(new LieDetectorCommand(this.message));
        this.registerHandler(new VotingPollCommand(this.message));
        this.registerHandler(new TeamCommand(this.message));
        this.registerHandler(new AskCommand(this.message));
    }

    protected sendResponse(): void {
        this.handlers.every((command: Command<Sendable>): boolean => {
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
