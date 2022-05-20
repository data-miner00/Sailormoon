const commandRegex =
    /(?<=[-{1,2}|/])(?<name>[a-zA-Z0-9]*)[ |:|"]*(?<value>[\w|.|?|=|&|+| |:|/|\\]*)(?=[ |"]|$)/gm;
const quotedStringRegex = /["'](.*?)["']/gm;

export function Parse(input: string) {
    /*
     *
     */
    const [_, command, subject] = input.split(" ", 3);

    /*
     *
     */
    const quotedStringMatch = quotedStringRegex.exec(input);
    console.log(quotedStringMatch);
    /*
     *
     */
    const flags = [];

    let matches: RegExpExecArray;

    while ((matches = commandRegex.exec(input)) !== null) {
        if (matches.index === commandRegex.lastIndex) {
            commandRegex.lastIndex++;
        }

        flags.push({ name: matches[1], value: matches[2] });
    }

    return {
        command,
        subject: !!quotedStringMatch ? quotedStringMatch[1] : subject,
        flags,
    };
}
