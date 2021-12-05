import * as crypto from "crypto";
import { Message } from "discord.js";
import Command from "./Command";

export default class HashCommand extends Command<string> {
    public commandSignature: string = "hash";

    public constructor(message: Message) {
        super(message);
    }

    protected setup(): void {
        const [algorithm, ...stringToHash] = this.arguments;
        if (!algorithm) {
            this.response = "Please provide a valid algorithm";
            return;
        }

        if (!crypto.getHashes().includes(algorithm)) {
            this.response = `Sorry, the algorithm provided is not supported. Try these instead\n\`\`\`\n${crypto.getHashes()}\`\`\``;
            return;
        }

        // bugged
        if (stringToHash === []) {
            this.response = "Please provide arguments to hash";
            return;
        }

        const hashFunction = crypto.createHash(algorithm);

        hashFunction.update(stringToHash.join(" "));

        this.response = hashFunction.digest("hex");
    }

    public execute(): void {
        this.setup();
        this.message.channel.send(this.response).catch(this.catchError);
    }

    public static info(): void {
        crypto.getCiphers();
        crypto.getHashes();
    }
}
