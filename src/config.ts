import * as dotenv from "dotenv";

dotenv.config();

const { DISCORD_API_TOKEN } = process.env;

const PREFIX: string = "~";

export default {
  token: DISCORD_API_TOKEN,
  prefix: PREFIX,
};
