import Message from "./Sailormoon.Core/Event/MessageEvent";
import Application from "./Sailormoon.Core/App/Application";
import Configuration from "./Sailormoon.Core/App/Configuration";
import Ready from "./Sailormoon.Core/Event/ReadyEvent";

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
