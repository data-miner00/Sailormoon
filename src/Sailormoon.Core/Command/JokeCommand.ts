import axios from "axios";
import { Message } from "discord.js";
import Configuration from "../App/Configuration";
import EmojiList from "../Data/EmojiList";
import Randomizer from "../Utility/Randomizer";
import Command from "./Command";

export default class JokeCommand extends Command<string> {
    public commandSignature: string = "joke";

    private static configuration: Configuration = Configuration.getInstance();

    private static readonly rapidapidadjokeHost: string =
        "dad-jokes.p.rapidapi.com";
    private static readonly rapidapidadjoke: string =
        "https://dad-jokes.p.rapidapi.com/random/joke/png";
    private static readonly rapidapijokeApiHost: string =
        "jokeapi-v2.p.rapidapi.com";
    private static readonly rapidapijokeApi: string =
        "https://jokeapi-v2.p.rapidapi.com/joke/Any";
    private static readonly appSpotJokeApi: string =
        "https://official-joke-api.appspot.com/random_joke";
    private static readonly jokeApi: string =
        "https://v2.jokeapi.dev/joke/Any?type=single";

    public constructor(message: Message) {
        super(message);
    }

    protected async setup(): Promise<void> {
        const randint: number = Randomizer.PercentageRandomizer();
        switch (true) {
            case randint <= 22: {
                await this.getRapidApiDadJoke();
                break;
            }
            case randint <= 44: {
                await this.getRapidApiJoke();
                break;
            }
            case randint <= 66: {
                await this.getJoke();
                break;
            }
            default: {
                await this.getAppSpotJoke();
            }
        }
    }

    public async execute(): Promise<void> {
        await this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }

    private async getAppSpotJoke(): Promise<void> {
        const { data } = await axios.get(JokeCommand.appSpotJokeApi);

        this.response = this.jokeWithSetup(data.setup, data.punchline);
    }

    private async getJoke(): Promise<void> {
        const { data } = await axios.get(JokeCommand.jokeApi);

        this.response = this.jokeWithoutSetup(data.joke);
    }

    private async getRapidApiJoke(): Promise<void> {
        const { data } = await axios.request({
            method: "GET",
            url: JokeCommand.rapidapijokeApi,
            params: {
                format: "json",
            },
            headers: {
                "x-rapidapi-key": JokeCommand.configuration.xRapidApiKey,
                "x-rapidapi-host": JokeCommand.rapidapijokeApiHost,
            },
        });
        this.response = this.jokeWithSetup(data.setup, data.delivery);
    }

    private async getRapidApiDadJoke(): Promise<void> {
        const { data } = await axios.request({
            method: "GET",
            url: JokeCommand.rapidapidadjoke,
            headers: {
                "x-rapidapi-key": JokeCommand.configuration.xRapidApiKey,
                "x-rapidapi-host": JokeCommand.rapidapidadjokeHost,
            },
        });
    }

    private jokeWithSetup(setup: string, punchLine: string): string {
        const emoji: string = Randomizer.RandomElement(EmojiList);
        return `<@!${this.message.author.id}> ${emoji}\n**Setup**  \`\`\`${setup}\`\`\`\n**Punchline** \`\`\`${punchLine}\`\`\``;
    }

    private jokeWithoutSetup(contents: string): string {
        const emoji: string = Randomizer.RandomElement(EmojiList);
        return `<@!${this.message.author.id}> ${emoji}\n \`\`\`${contents}\`\`\``;
    }
}
