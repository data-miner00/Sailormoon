import { Client, TextChannel } from "discord.js";
import * as schedule from "node-schedule";
import * as moment from "moment";
import activityGenerator from "../helpers/activityGenerator";
import { Activity } from "../models/Activity";

export default (bot: Client): void => {
  const activityIterator = activityGenerator();

  bot.on("ready", (): void => {
    console.log("I'm ready!");

    const subscriptionExpiryDate: Date = new Date(
      "September 14, 2021 03:24:00"
    );

    schedule.scheduleJob("*/1 * * * *", function (): void {
      const activity: Activity | void = activityIterator.next().value;

      if (activity)
        bot.user
          .setActivity(activity.what, { type: activity.how })
          .catch(console.error);
    });

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
        jcServerChannel.send(`<@!${JC}> <@!${WY}> login`);
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

      schedule.scheduleJob("0 10 * * *", function (): void {
        let today = new Date();
        if (today < subscriptionExpiryDate) {
          let start = moment(today);
          let end = moment(subscriptionExpiryDate);
          let diff = end.diff(start, "days");
          ycServerChannel.send(
            `Bello handsomes 🐱‍🚀 Your Nitro Booster left **${diff} days**.... Have a nice day Sir!`
          );
        }
      });
    }

    // My Test server
    // const myServerChannel: TextChannel = bot.channels.cache.get(
    //   "798790808161091607"
    // ) as TextChannel;

    // if (myServerChannel) {

    //   let today = new Date();
    //   schedule.scheduleJob("0 0 0 * * *", function (): void {
    //     myServerChannel.send("hihihihi <@&854571414044016670>");
    //   });

    //         if(today< subscriptionExpiryDate)
    //   {
    //     schedule.scheduleJob("18 11 * * *",function(): void{
    //       let start = moment(today);
    //       let end = moment(subscriptionExpiryDate);
    //       let diff = end.diff(start,"days");
    //       myServerChannel.send(`Bello handsomes 🐱‍🚀 Your Nitro Booster left **${diff} days**.... Have a nice day Sir!`);
    //     });
    //   }
    // }
  });
};
