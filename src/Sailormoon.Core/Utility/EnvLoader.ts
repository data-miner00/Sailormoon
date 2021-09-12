import * as dotenv from "dotenv";

export default class EnvLoader {
    public static loadEnv(): void {
        dotenv.config();
    }

    public static displayEnvProcesses(): void {
        console.log(process.env);
    }
}
