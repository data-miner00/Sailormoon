import EnvLoader from "../Utility/EnvLoader";

export default class Configuration {
    #_commandPrefix: string;
    #_discordToken: string;

    constructor() {
        EnvLoader.loadEnv();

        this.#_commandPrefix = "?";
        this.#_discordToken = process.env.DISCORD_API_TOKEN;
    }

    get commandPrefix(): string {
        return this.#_commandPrefix;
    }

    get discordToken(): string {
        return this.#_discordToken;
    }
}
