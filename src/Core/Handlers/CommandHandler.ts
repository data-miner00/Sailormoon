import Handler from "./Handler";
import settings from "../../App/settings.json";

export default abstract class CommandHandler extends Handler {
    protected prefix: string = settings.prefix;
}
