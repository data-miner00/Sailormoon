import * as dotenv from "dotenv";

export default class EnvLoader {
    public static isEnvLoaded(): boolean {
        return this.queryEnv("discord") !== null;
    }

    public static loadEnv(): void {
        if (!this.isEnvLoaded()) {
            dotenv.config();
        }
    }

    public static displayEnvProcesses(): void {
        console.log(process.env);
    }

    public static queryEnv(query: string): string {
        switch (query) {
            case "discord":
                return process.env.DISCORD_API_TOKEN;
            case "rapidapi":
                return process.env.X_RAPIDAPI_KEY;
            default:
                return null;
        }
    }
}
