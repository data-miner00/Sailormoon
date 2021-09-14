import { Message, User } from "discord.js";
import BoredCommand from "../Command/BoredCommand";
import Command from "../Command/Command";
import CommandObject from "../Command/CommandObject";
import PollCommand from "../Command/PollCommand";
import AllChannel from "../Utility/AllChannel";
import GeneralUtils from "../Utility/GeneralUtils";

export default class CommandController {
    #commandObj: CommandObject;
    #message: Message;
    #author: User;
    #channel: AllChannel;
    #command: Command;

    constructor(message: Message) {
        this.#message = message;
        this.#commandObj = GeneralUtils.preprocessCommand(message);
        this.#author = message.author;
        this.#channel = message.channel;
        this.#command = this.searchCommand(this.#commandObj.command);

        this.invokeCommand();
    }

    private invokeCommand(): void {
        this.#command.execute();
    }

    private searchCommand(commandSignature: string): Command {
        let command: Command;
        switch (commandSignature) {
            case "poll":
                command = new PollCommand(
                    this.#commandObj,
                    this.#channel,
                    this.#author
                );
            case "bored":
                command = new BoredCommand(
                    this.#commandObj,
                    this.#channel,
                    this.#author
                );
            default:
                console.log("No such command");
        }
        return command;
    }
}
