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
    for(let i in greeting)
    {
      if (messageLower == greeting[i]) {
        let randomIndex:number = Math.floor(Math.random() * greeting.greeting.length);
        let mentionUser:string = Math.random()>=0.5 ? `<@!${message.author.id}>` : "";
        message.channel.send(`${mentionUser} ${greeting[randomIndex]}`);
      }
    }

    if(messageLower == "tell me a joke"){
        let randomIndex:number = Math.floor(Math.random() * greeting.emoji.length);
        axios.get(jokeAPI)
        .then((response)=>{
          message.channel.send(`<@!${message.author.id}> ${greeting.emoji[randomIndex]}  \`\`\`${response['data'].joke}\`\`\``);
        })
    }

    if (messageLower == "test") {
      message.channel.send(`<@!${message.author.id}>`);
    }

    if (message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION") {
      message.channel.send(`<@!${message.author.id}> you are the best :)`);
    }
  });
};
