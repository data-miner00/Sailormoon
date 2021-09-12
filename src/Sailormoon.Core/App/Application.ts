import { Client } from "discord.js";
import IEvent from "../Event/IEvent";

export default class Application {
    private static instance: Application;

    public static getAppInstance(): Application {
        if (!Application.instance) {
            const bot: Client = new Client();
            this.instance = new Application(bot);
            return Application.instance;
        }

        return Application.instance;
    }

    public static getBotReference(): Client {
        return Application.instance._bot;
    }

    private readonly _bot: Client;

    private constructor(bot: Client) {
        this._bot = bot;
    }

    public registerEvent(event: IEvent) {
        //@ts-ignore
        this._bot.on(event.eventType, event.callback);
    }

    public login(token: string): void {
        this._bot.login(token);
    }
}
