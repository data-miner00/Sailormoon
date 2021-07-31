import { Message, User, Client } from "discord.js";
import config from "../config";
import commandHandler from "../commands";
import axios from "axios";

const jokeAPI: string = "https://v2.jokeapi.dev/joke/Any?type=single";

export default (bot: Client): void => {
  bot.on("message", (message: Message): void => {
    // Return if it is bot
    if (message.author.bot) return;

    // Convert message to lower case
    const messageLower: string = message.content.toLowerCase();

    // Get author instance
    const author: User = message.author;
    console.log(`${author.username}: ${messageLower}`);

    if (messageLower.startsWith(config.prefix)) {
      return commandHandler(message, messageLower, author);
    }

    if (messageLower == "test") {
      message.channel.send(`<@!${message.author.id}>`);
    }

    if (message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION") {
      message.channel.send(`<@!${message.author.id}> you are the best :)`);
    }
  });
};
