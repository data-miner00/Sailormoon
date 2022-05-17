import { $ } from "../Core/Environment";
import Application from "./Application";
import ReadyEvent from "./Events/ReadyEvent";
import MessageEvent from "./Events/MessageEvent";

class Program {
    public static Main(): void {
        const app: Application = Application.GetInstance();

        app.RegisterEvent(new ReadyEvent());
        app.RegisterEvent(new MessageEvent());
        app.Login(process.env[$("DISCORD_API_TOKEN")]);
    }
}

Program.Main();
