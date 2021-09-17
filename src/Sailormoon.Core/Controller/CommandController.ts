import { Message } from "discord.js";
import BoredCommand from "../Command/BoredCommand";
import Command from "../Command/Command";
import MsiaCovidCommand from "../Command/MsiaCovidCommand";
import PollCommand from "../Command/PollCommand";
import GeneralUtils from "../Utility/GeneralUtils";

export default class CommandController {
    #message: Message;

    private commands: Array<Command>;

    constructor(message: Message) {
        this.#message = message;
        this.commands = [];

        this.registerCommands();
        this.sendResponse();
    }

    private registerCommands(): void {
        this.registerCommand(new PollCommand(this.#message));
        this.registerCommand(new BoredCommand(this.#message));
        this.registerCommand(new MsiaCovidCommand(this.#message));
    }

    private registerCommand(command: Command): void {
        this.commands.push(command);
    }

    private sendResponse(): void {
        this.commands.every((command: Command): boolean => {
            const commandSignature: string =
                GeneralUtils.extractCommandSignature(this.#message);
            if (command.commandSignature == commandSignature) {
                command.execute();
                return false;
            }
            return true;
        });
    }
}
