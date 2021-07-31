import { Message, User, Client } from "discord.js";
import config from "../config";
import commandHandler from "../commands";
import greeting from "../response/greeting";
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

    //
    if (greeting.greeting.includes(messageLower)) {
      message.channel.startTyping();
      let randomIndex: number = Math.floor(
        Math.random() * greeting.greeting.length
      );
      console.log(randomIndex);
      let mentionUser: string =
        Math.random() >= 0.5 ? `<@!${message.author.id}>` : "";

      setTimeout(() => {
        message.channel
          .send(`${mentionUser} ${greeting.greeting[randomIndex]}`)
          .then(function (_: Message): void {
            message.channel.stopTyping();
          });
      }, 2000);
    }

    if (messageLower.includes("joke")) {
      message.channel.startTyping();
      let randomIndex: number = Math.floor(
        Math.random() * greeting.emoji.length
      );
      axios.get(jokeAPI).then((response) => {
        message.channel
          .send(
            `<@!${message.author.id}> ${greeting.emoji[randomIndex]}  \`\`\`${response["data"].joke}\`\`\``
          )
          .then(function (_: Message): void {
            message.channel.stopTyping();
          });
      });
    }

    if (messageLower.includes("covid")) {
      message.channel.startTyping();
      axios
        .get(
          "https://api.apify.com/v2/key-value-stores/6t65lJVfs3d8s6aKc/records/LATEST?disableRedirect=true"
        )
        .then((response) => {
          message.channel
            .send(
              `
        \`\`\`🤧 Total Malaysia Cases 🤧 \n\nTotal Tested Positive: ${response["data"].testedPositive},\nTotal Recovered: ${response["data"].recovered},\nTotal Active Cases : ${response["data"].activeCases},\nICU : ${response["data"].inICU},\nDeceased: ${response["data"].deceased},\nUpdated: ${response["data"].lastUpdatedAtSource}\n\nPlease take care and stay safe 😁.\`\`\`
        `
            )
            .then((_: Message): void => {
              message.channel.stopTyping();
            });
        });
    }

    if (messageLower == "test") {
      message.channel.send(`<@!${message.author.id}>`);
    }

    if (message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION") {
      message.channel.send(`<@!${message.author.id}> you are the best :)`);
    }
  });
};
