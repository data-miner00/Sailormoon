import { Client, Channel, TextChannel } from "discord.js";
import * as schedule from "node-schedule";
import config from "../config";

export default (bot: Client): void => {
  bot.on('ready', (): void => {
    bot.user.setActivity(config.activity.game).catch(console.error);
    console.log("I'm ready!");

    const subscriptionExpiryDate: Date = new Date('September 14, 2021 03:24:00');

    // JC Server fellows
    const jcServerChannel: TextChannel =
      bot.channels.cache.get('647095749817008132') as TextChannel;

    if (jcServerChannel) {
      schedule.scheduleJob("0 0 0 * * *", function (): void {
        jcServerChannel.send("@everyone login");
      });

      schedule.scheduleJob(subscriptionExpiryDate, function (): void {
        jcServerChannel.send("@everyone Time to unsubscribe nitro!!!!!");
      });
    }

    // YC Server fellows
    const ycServerChannel: TextChannel =
      bot.channels.cache.get('366191384253956108') as TextChannel;

    if (ycServerChannel) {
      schedule.scheduleJob(subscriptionExpiryDate, function (): void {
        ycServerChannel.send("@everyone Time to unsubscribe nitro!!!!!");
      });
    }

    // My Test server
    const myServerChannel: TextChannel =
      bot.channels.cache.get('719397111657136169') as TextChannel;

    if (myServerChannel) {
      schedule.scheduleJob("*/15 * * * * *", function (): void {
        myServerChannel.send("hihihihi <@&854571414044016670>");
      });
    }
  });
};
