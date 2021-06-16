import { Client, TextChannel } from "discord.js";
import * as schedule from "node-schedule";
import config from "../config";

export default (bot: Client): void => {
  bot.on("ready", (): void => {
    bot.user.setActivity(config.activity.game).catch(console.error);
    console.log("I'm ready!");

    const subscriptionExpiryDate: Date = new Date(
      "September 14, 2021 03:24:00"
    );

    // JC Server fellows
    const jcServerChannel: TextChannel = bot.channels.cache.get(
      "647095749817008132"
    ) as TextChannel;

    if (jcServerChannel) {
      const JC: string = "636871331991912458";
      const WY: string = "432828129979924481";
      const MK: string = "579562292316864512";
      const SF: string = "431109670393085972";

      // Remind to login genshin everyday at 00:00
      schedule.scheduleJob("0 0 0 * * *", function (): void {
        jcServerChannel.send(`<@!${JC}> <@!${WY}> <@!${MK}> login`);
      });

      // Remind to unsubscribe nitro
      schedule.scheduleJob(subscriptionExpiryDate, function (): void {
        jcServerChannel.send(
          `<@!${JC}> <@!${WY}> <@!${MK}> <@!${SF}> Time to unsubscribe nitro!!!!!`
        );
      });
    }

    // YC Server fellows
    const ycServerChannel: TextChannel = bot.channels.cache.get(
      "366191384253956108"
    ) as TextChannel;

    if (ycServerChannel) {
      const NITRO_BOOST_ROLE: string = "854547626460184597";

      // Remind to unsubscribe nitro
      schedule.scheduleJob(subscriptionExpiryDate, function (): void {
        ycServerChannel.send(
          `<@&${NITRO_BOOST_ROLE}> Time to unsubscribe nitro!!!!!`
        );
      });
    }

    // My Test server
    const myServerChannel: TextChannel = bot.channels.cache.get(
      "854539522536636446"
    ) as TextChannel;

    if (myServerChannel) {
      schedule.scheduleJob("* */30 * * * *", function (): void {
        myServerChannel.send("hihihihi <@&854571414044016670>");
      });
    }
  });
};