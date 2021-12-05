import { MessageOptions, MessageEmbed } from "discord.js";

type Sendable = string | MessageOptions | MessageEmbed;

export default Sendable;
