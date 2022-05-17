import { Client } from "discord.js";
import IEvent from "../Core/Events/IEvent";

export default class Application {
    private static instance: Application;

    public static GetInstance(): Application {
        if (!Application.instance) {
            const bot: Client = new Client();
            Application.instance = new Application(bot);
        }
        return Application.instance;
    }

    public constructor(public readonly _bot: Client) {}

    public RegisterEvent(event: IEvent) {
        this._bot.on(event.eventName, event.EventHandler);
    }

    public Login(token: string): void {
        this._bot.login(token);
    }
}
