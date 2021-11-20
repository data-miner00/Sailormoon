import { Message } from "discord.js";
import GeneralUtils from "../Utility/GeneralUtils";
import JobScheduler from "../Utility/JobScheduler";
import Command from "./Command";
import CommandObject from "./CommandObject";
import ICallbackable from "./ICallbackable";

/*
 * TODO!!!!!!!!!!!!!!!!
 */
export default class BookingCommand
    extends Command<string>
    implements ICallbackable
{
    public commandSignature: string = "book";

    public constructor(message: Message) {
        super(message);
    }

    private commandObj: CommandObject = GeneralUtils.preprocessCommand(
        this.message
    );

    protected setup(): void {
        const [hourStr, minStr, ...subject] = this.commandObj.arguments;

        JobScheduler.schdeule(
            GeneralUtils.DateParser(hourStr, minStr),
            function () {
                console.log(subject.join(" "));
            }
        );
    }

    public setupCallback(message: Message): void {
        throw new Error("Method not implemented.");
    }

    public execute(): void {
        this.setup();
        console.log("executed");
    }
}
