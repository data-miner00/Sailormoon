import EnvLoader from "../Utility/EnvLoader";

export default class Configuration {
    #commandPrefix: string;
    #discordToken: string;
    #boredApiUrl: string;
    #dadjokeHost: string;
    #jokeApiHost: string;
    #xrapidApiKey: string;

    constructor() {
        if (!process.env.DISCORD_API_TOKEN) {
            EnvLoader.loadEnv();
        }

        this.#commandPrefix = "?";
        this.#discordToken = process.env.DISCORD_API_TOKEN;
        this.#xrapidApiKey = process.env.X_RAPIDAPI_KEY;
        this.#boredApiUrl = "https://www.boredapi.com/api/activity/";
        this.#dadjokeHost = "dad-jokes.p.rapidapi.com";
        this.#jokeApiHost = "jokeapi-v2.p.rapidapi.com";
    }

    public get commandPrefix(): string {
        return this.#commandPrefix;
    }

    public get discordToken(): string {
        return this.#discordToken;
    }

    public get boredApiUrl(): string {
        return this.#boredApiUrl;
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
