import { Message, User } from "discord.js";

export default function commandHandler(
  messageObj: Message,
  messageStr: string,
  userObj: User
): any {
  const command: string = messageStr.split(" ")[0].slice(1);
  messageObj.channel.send(`Your command is ${command}`);
}
