import { Message } from "discord.js";
import GeneralUtils from "../Utility/GeneralUtils";
import Sendable from "../Utility/Sendable";

export default abstract class Command<T extends Sendable> {
    public abstract commandSignature: string;
    protected response: T;
    protected arguments: Array<string>;

    public constructor(protected message: Message) {
        this.arguments = GeneralUtils.extractCommandArguments(message) ?? [];
    }

    /*
     * Setup for the response, formulate strings or embed or send files.
     * Cannot be placed directly in the constructor as the method may be asynchronous.
     * Call this function within the execute() method
     */
    protected abstract setup(): void;

    /*
     * Calls the setup() and sends the response.
     * The method may be asynchronous if the setup is also asynchronous.
     */
    public abstract execute(): void;

    /*
     * Catch errors caused interim.
     * This method is overridable and default is just logging it out.
     */
    protected catchError(error): void {
        console.error(error);
    }
}
