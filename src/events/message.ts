import { Message, User } from "discord.js"

export default (bot): void => {
  bot.on('message', (message: Message): void => {

    // Return if it is bot
    if (message.author.bot) return;

    // Convert message to lower case
    const messageLower: string = message.content.toLowerCase();

    // Get author instance
    const author: User = message.author;
    console.log(`${author.username}: ${messageLower}`);

    //
    
  })
}
