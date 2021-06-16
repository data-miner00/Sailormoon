import { Client } from "discord.js";
import config from "./config";
import eventLoader from "./events";

const bot: Client = new Client();

eventLoader(bot);

bot.login(config.token);
