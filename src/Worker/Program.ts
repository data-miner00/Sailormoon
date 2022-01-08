import Message from "../Core/Event/MessageEvent";
import Application from "./Application";
import Configuration from "../Configuration";
import Ready from "../Core/Event/ReadyEvent";

class Program {
    public static Main(): void {
        const configuration: Configuration = Configuration.getInstance();
        const application: Application = Application.getAppInstance();

        application.registerEvent(new Ready());
        application.registerEvent(new Message());
        application.login(configuration.discordToken);
    }
}

Program.Main();