import EnvHelper from "../Utility/EnvHelper";

export default class Configuration {
    #commandPrefix: string;
    #discordToken: string;
    #dadjokeHost: string;
    #jokeApiHost: string;
    #xrapidApiKey: string;

    private static instance: Configuration;

    private constructor() {
        EnvHelper.loadEnv();

        this.#commandPrefix = "?";
        this.#discordToken = EnvHelper.queryEnv("discord");
        this.#xrapidApiKey = EnvHelper.queryEnv("rapidapi");
        this.#dadjokeHost = "dad-jokes.p.rapidapi.com";
        this.#jokeApiHost = "jokeapi-v2.p.rapidapi.com";
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

    public get dadjokeHost(): string {
        return this.#dadjokeHost;
    }

    public get jokeApiHost(): string {
        return this.#jokeApiHost;
    }

    public get xRapidApiKey(): string {
        return this.#xrapidApiKey;
    }
}
