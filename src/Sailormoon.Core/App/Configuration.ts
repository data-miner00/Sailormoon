import EnvLoader from "../Utility/EnvLoader";

export default class Configuration {
    #commandPrefix: string;
    #discordToken: string;

    constructor() {
        if (!process.env.DISCORD_API_TOKEN) {
            EnvLoader.loadEnv();
        }

        this.#commandPrefix = "?";
        this.#discordToken = process.env.DISCORD_API_TOKEN;
    }

    public get commandPrefix(): string {
        return this.#commandPrefix;
    }

    public get discordToken(): string {
        return this.#discordToken;
    }
}
