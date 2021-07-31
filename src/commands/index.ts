import { Message, User } from "discord.js";
import poll from "./poll";

export default function commandHandler(
  message: Message,
  messageStr: string,
  user: User
): any {
  const tokenizedString: string[] = messageStr.split(" ");
  const command: string = tokenizedString.splice(0, 1)[0].slice(1);
  const args: string = tokenizedString.join(" ");
  // messageObj.channel.send(`Your command is ${command}`);

  // Register each command module below
  switch (command) {
    case "poll":
      poll(args, message, user);
      break;
    default:
      message.channel.send("404");
  }
}
