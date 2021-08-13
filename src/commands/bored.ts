import axios from "axios";
import { Message, User } from "discord.js";

export default function bored(message: Message): void {
  message.channel.startTyping();
  axios.get("https://www.boredapi.com/api/activity/").then((response) => {
    message.channel
      .send(
        `Hi <@!${message.author.id}>! Do this Task 😎
        \`\`\`Activity: ${response["data"].activity}\nType: ${response["data"].type}\nParticipants: ${response["data"].participants}\nLinks: ${response["data"].link}\`\`\`
        `
      )
      .then((_: Message): void => {
        message.channel.stopTyping();
      });
  });
}
