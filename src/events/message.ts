import { Message, User, Client } from "discord.js";
import config from "../config";
import commandHandler from "../commands";
import axios from "axios";
import greeting from "../response/greeting";
import * as dotenv from "dotenv";
dotenv.config();

const X_RAPIDAPI_KEY= process.env.X_RAPIDAPI_KEY;
const DADJOKE_HOST=process.env.DADJOKE_HOST;
const JOKEAPI_HOST = process.env.JOKEAPI_HOST;

const hazDadJokeOptions: string = "https://icanhazdadjoke.com";
const appSpotAPI: string = "https://official-joke-api.appspot.com/random_joke";
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
      let emojiSelected: string = greeting.emoji[randomIndex];
        switch(true)
        {
          case (randomIndex<=22):
            let dadOptions: any = {
              method: 'GET',
              url: 'https://dad-jokes.p.rapidapi.com/random/joke/png',
              headers: {
                'x-rapidapi-key': X_RAPIDAPI_KEY,
                'x-rapidapi-host': DADJOKE_HOST
              }
            };
    
            axios.request(dadOptions).then((response) => 
              jokewithSetup(message,emojiSelected,response["data"].body.setup,response["data"].body.punchline)
            );
            break;

          case (randomIndex<=44):
            let jokeOptions: any = {
              method: 'GET',
              url: 'https://jokeapi-v2.p.rapidapi.com/joke/Any',
              params: {
                format: 'json',
              },
              headers: {
                'x-rapidapi-key': X_RAPIDAPI_KEY,
                'x-rapidapi-host': JOKEAPI_HOST
              }
            }
            axios.request(jokeOptions).then((response) => 
              jokewithSetup(message,emojiSelected,response["data"].setup,response["data"].delivery)
            );
            break;
          
          case (randomIndex<=66):
            axios.get(jokeAPI).then((response)=>
              jokewithoutSetup(message,emojiSelected,response["data"].joke)
            );
            break;
          
          default:
            axios.get(appSpotAPI).then((response)=>
              jokewithSetup(message,emojiSelected,response["data"].setup,response["data"].punchline)
            );
            break;
        }
    }

    if (messageLower.includes("malaysia covid case")) {
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

    if (messageLower.includes("bored") || messageLower.includes("boring") ) {
      message.channel.startTyping();
      axios
        .get(
          "https://www.boredapi.com/api/activity/"
        )
        .then((response) => {
          message.channel
            .send(
              `Hi <@!${message.author.id}>! Do this Task 😎
        \`\`\`Activity: ${response['data'].activity}\nType: ${response['data'].type}\nParticipants: ${response['data'].participants}\nLinks: ${response['data'].link}\`\`\`
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

  const jokewithSetup = (message: Message,emoji:string, setup: string, punchLine: string): void => {
      message.channel
      .send(
        `<@!${message.author.id}> ${emoji}\n**Setup**  \`\`\`${setup}\`\`\`\n**Punchline** \`\`\`${punchLine}\`\`\``
      )
      .then(function (_: Message): void {
        message.channel.stopTyping();
      });
  }

  const jokewithoutSetup = (message: Message,emoji:string, contents:string): void => {
    message.channel
    .send(
      `<@!${message.author.id}> ${emoji}\n \`\`\`${contents}\`\`\``
    )
    .then(function (_: Message): void {
      message.channel.stopTyping();
    });
}



};
