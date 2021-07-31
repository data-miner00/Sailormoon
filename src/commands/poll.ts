import { Message, User, MessageEmbed } from "discord.js";

export default function poll(poll: string, message: Message, user: User): void {
  const messageEmbed: MessageEmbed = new MessageEmbed({
    author: {
      name: user.username,
      iconURL: user.displayAvatarURL(),
    },
  });

  const capatilizedPoll: string = poll.charAt(0).toUpperCase() + poll.slice(1);

  messageEmbed.setTitle(capatilizedPoll);
  messageEmbed.setColor("RANDOM");
  messageEmbed.setFooter("React below for this poll");
  message.channel.startTyping();
  setTimeout(() => {
    message.channel
      .send(messageEmbed)
      .then(function (message: Message) {
        message.react("👍");
        message.react("👎");
        message.react("🤓");
        message.channel.stopTyping();
      })
      .catch(function (error) {
        message.channel.stopTyping();
        console.error(error);
      });
  }, 2000);
}
