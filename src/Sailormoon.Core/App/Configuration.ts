import EnvHelper from "../Utility/EnvHelper";

export default class Configuration {
    #commandPrefix: string;
    #discordToken: string;
    #xrapidApiKey: string;

    private static instance: Configuration;

    private constructor() {
        EnvHelper.loadEnv();

        this.#commandPrefix = "?";
        this.#discordToken = EnvHelper.queryEnv("discord");
        this.#xrapidApiKey = EnvHelper.queryEnv("rapidapi");
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
}
