import { $ } from "../Core/Environment";
import Application from "./Application";
import ReadyEvent from "./Events/ReadyEvent";
import MessageEvent from "./Events/MessageEvent";
import * as dotenv from "dotenv";
import EmojiCreateEvent from "./Events/EmojiCreateEvent";

class Program {
    public static Main(): void {
        dotenv.config();

        const app: Application = Application.GetInstance();

        app.RegisterEvent(new ReadyEvent());
        app.RegisterEvent(new MessageEvent());
        app.RegisterEvent(new EmojiCreateEvent());
        app.Login(process.env[$("DISCORD_API_TOKEN")]);
    }
}

Program.Main();
