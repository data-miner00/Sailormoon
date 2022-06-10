# Sailormoon

Sailormoon is a Discord bot made with Discord.js API that previously serves to remind friends upon Discord Nitro expiry. It has now been evolved into many other features that can be useful for me and my friends. It is kinda poorly developed as I have limited time to work on this project and learn the SDK.

## Implementation

For this project, Discord.js version 12 is used. Version 13 is already out for quite a while now, but there are many new features and breaking changes that would require a lot of time to familiarize with it. Hence, sticking to version 12 works best for now. The project is adopting **object-oriented programming** style for a more organized, extensible and fine grain control of the codes. 

### Events

In Discord, there are a whole [list of events](https://discord.js.org/#/docs/discord.js/13.8.0/class/Client) that can be listened and respond to them. To listen to different kinds of events, we can just add the event under `src/App/Events` and register it in `Program.ts`. The new event must be extending from the `BaseEvent` class as shown:

```ts
import BaseEvent from "../../Core/Events/BaseEvent";

export default class MyNewEvent extends BaseEvent {
    public constructor() {
        super("my_event_id");
    }

    public EventHandler(params: ParamsBasedOnNewEvent): void {
        // do things here
    }
}
```

The constructor lets the base class know the actual event that are being handled and the `EventHandler` is where the actual implementation codes for the event goes.

To register, go to the `Program.ts` aforementioned and add the new event class with `app.RegisterEvent`.

```ts
import { $ } from "../Core/Environment";
import Application from "./Application";
import ReadyEvent from "./Events/ReadyEvent";
import MessageEvent from "./Events/MessageEvent";
import * as dotenv from "dotenv";
import EmojiCreateEvent from "./Events/EmojiCreateEvent";

class Program {
    public static Main(): void {
        dotenv.config();

        const app: Application = Application.GetInstance();

        app.RegisterEvent(new ReadyEvent());
        app.RegisterEvent(new MessageEvent());
        app.RegisterEvent(new EmojiCreateEvent());
        app.Login(process.env[$("DISCORD_API_TOKEN")]);
    }
}

Program.Main();
```

### Message Event

The bot mainly response to the `message` event. There are _two types_ of events being listened, which is **commands** and **regular text messages** respectively. The regular text messages are handled within the `MessageController` and the commands are handled in `CommandController` class.

Text message listener are fairly straightforward. It is being triggered if some condition is fulfilled. For example, we have a `TestMessageHandler` that will be triggered if `test` is detected in the chat. To implement text message handler, just add a new message handler under `src/App/Handlers/Message` and register itself in the `MessageController.ts` file. The message handler will also need to extends from a base class as well, namely `MessageHandler` to inherit its predefined functionality and adhere to the restrictions set.

```ts
import MessageHandler from "../../../Core/Handlers/MessageHandler";

export default class HelloMessage extends MessageHandler {
    public ConditionChecker(): boolean {
        return this.message.content === "Hello";
    }
    public Handle(): void {
        this.message.channel.send("Hi");
    }
}
```

The `ConditionChecker` method is just a method that checks if the condition is met. If the condition is met, the code inside `Handle` method will get executed, otherwise not.

Command on the other hand is a special type of text message where it is being prefixed with certain strings to distinguish itself between regular text messages. Their job are still the same though, which is to trigger a chuck of codes to execute when certain text message condition is being met.

To implement a command, add a new file in `src/App/Handlers/Command` and register it within the `CommandController.ts` file.

```ts
import CommandHandler from "../../../Core/Handlers/CommandHandler";
import Application from "../../Application";

export default class PingCommand extends CommandHandler {
    public ConditionChecker(): boolean {
        return this.message.content === this.prefix + " ping";
    }
    public Handle(): void {
        this.message.channel.send("pong!").then((message) => {
            const latency: number = Math.round(
                Application.GetInstance()._bot.ws.ping
            );
            message.edit("pong! `" + latency + "ms`");
        });
    }
}
```

As you can see, the command and the message handler are having basically the same contract, with a `ConditionChecker` method and a `Handle` method. The only difference is the functionality offered by the base class. Example, by extending `CommandHandler`, we have access to `this.prefix` for the command prefix where `MessageHandler` does not.

The registration of commands and message handlers are the same. 

```ts
import Controller from "../../Core/Controller/Controller";
import MessageHandler from "../../Core/Handlers/MessageHandler";
import {
    HelloMessage,
} from "../Handlers/Message";

export default class MessageController extends Controller<MessageHandler> {
    protected RegisterHandlers(): void {
        this.RegisterHandler(new HelloMessage(this.message));
    }
}
```

## Usage

For command related matter, the `Parse` function will be helpful to digest the string of inputs into useful parts of information. The command that is used are actually with the style of command line.

```
<prefix> <command> <subject> --flag value
```

E.g

```
myprefix hash 'Hello world' --algo keccak256
```

## Scripts

- Start a local development server

```
npm run dev
```

- Building for deployment

```
npm run build
```

- Testing

```
npm test
```

## Priority List

A list of to-dos sorted from the highly priortized item to the least.


- [ ] Using Databases
- [ ] Help command
- [ ] Add `--immediate` flag to relay command
- [ ] Add dynamic typing feature to relay command
- [ ] Music?
- [ ] Better Polling
- [ ] Appointment meeting feature (people react will get notification)

## Useful Links

- [Discord Embed Visualizer](https://autocode.com/tools/discord/embed-builder/)
- [Discord.js Guide](https://discordjs.guide/#before-you-begin)
- [Discord.js Documentation](https://discord.js.org/#/docs/discord.js/13.8.0/general/welcome)
