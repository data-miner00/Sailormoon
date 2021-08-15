import { Activity } from "../models/Activity";
import { ActivityType } from "../models/ActivityType";

export const activities: Activity[] = [
  {
    what: "Pluralsight",
    how: ActivityType.WATCHING,
  },
  {
    what: "Spotify",
    how: ActivityType.LISTENING,
  },
  {
    what: "WebStorm",
    how: ActivityType.PLAYING,
  },
  {
    what: "GoLand",
    how: ActivityType.PLAYING,
  },
  {
    what: "Visual Studio Code",
    how: ActivityType.PLAYING,
  },
  {
    what: "Minecraft",
    how: ActivityType.PLAYING,
  },
  {
    what: "Unity",
    how: ActivityType.STREAMING,
  },
];
