import Message from "./Sailormoon.Core/Event/Message";
import Application from "./Sailormoon.Core/App/Application";
import Configuration from "./Sailormoon.Core/App/Configuration";
import Ready from "./Sailormoon.Core/Event/Ready";

class Program {
    public static Main(): void {
        const configuration: Configuration = new Configuration();
        const application: Application = Application.getAppInstance();

        application.registerEvent(new Ready());
        application.registerEvent(new Message());
        application.login(configuration.discordToken);
    }
}

Program.Main();
