import CommandHandler from "../../../Core/Handlers/CommandHandler";
import { Parse } from "../../Helpers/CommandParser";
import * as crypto from "crypto";

export default class HashCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content.startsWith(`${this.prefix} hash`);
    }
    public Handle(): void {
        let algorithm: string = "sha256";
        const digest = Parse(this.message.content);

        if (!digest.subject) {
            this.message.channel.send("Please provide a message to hash");
            return;
        }

        if (digest.flags.length === 1) {
            const kv = digest.flags[0];
            if (kv.name !== "algo") {
                this.message.channel.send(
                    "Sorry but the options provided is invalid. Did you mean `--algo` ?"
                );
                return;
            }
            if (!crypto.getHashes().includes(kv.value)) {
                this.message.channel.send(
                    "`Sorry, the algorithm provided is not supported. Try these instead\n```\n${crypto.getHashes()}````"
                );
                return;
            }
            algorithm = kv.value;
        }

        const hashFunction = crypto.createHash(algorithm);
        hashFunction.update(digest.subject);

        this.message.reply(hashFunction.digest("hex"));
    }
}
