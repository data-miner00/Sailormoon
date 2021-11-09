import * as dotenv from "dotenv";
import EnvVariable from "./EnvVariable";

export default class EnvLoader {
    public static isEnvLoaded(): boolean {
        return this.queryEnv(EnvVariable.DISCORD_API_TOKEN) === null;
    }

    public static loadEnv(): void {
        if (!this.isEnvLoaded()) {
            dotenv.config();
        }
    }

    public static displayEnvProcesses(): void {
        console.log(process.env);
    }

    public static queryEnv(variable: EnvVariable): string {
        return process.env[variable.toString()];
    }
}
