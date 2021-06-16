import * as dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_API_TOKEN
} = process.env;

const PREFIX: string = "~";

const ACTIVITY = {
  game: "Genshin Impact",
  type: "PLAYING",
  status: "idle"
}

export default {
  token: DISCORD_API_TOKEN,
  prefix: PREFIX,
  activity: ACTIVITY
}
