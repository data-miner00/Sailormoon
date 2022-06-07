export type Environment = "DISCORD_API_TOKEN" | "X-CMC_PRO_API_KEY";

export const $ = (key: Environment) => key;
