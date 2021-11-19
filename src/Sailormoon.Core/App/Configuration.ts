import EnvHelper from "../Utility/EnvHelper";
import EnvVariable from "../Utility/EnvVariable";

export default class Configuration {
    #commandPrefix: string;
    #discordToken: string;
    #xrapidApiKey: string;
    #cmcApiKey: string;

    private static instance: Configuration;

    private constructor() {
        EnvHelper.loadEnv();

        this.#commandPrefix = "?";
        this.#discordToken = EnvHelper.queryEnv(EnvVariable.DISCORD_API_TOKEN);
        this.#xrapidApiKey = EnvHelper.queryEnv(EnvVariable.X_RAPIDAPI_KEY);
        this.#cmcApiKey = EnvHelper.queryEnv(EnvVariable["X-CMC_PRO_API_KEY"]);
    }

    public static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }

    public get commandPrefix(): string {
        return this.#commandPrefix;
    }

    public get discordToken(): string {
        return this.#discordToken;
    }

    public get xRapidApiKey(): string {
        return this.#xrapidApiKey;
    }

    public get cmcApiKey(): string {
        return this.#cmcApiKey;
    }
}
