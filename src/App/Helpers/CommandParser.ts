export function Parse(input: string) {
    const commandRegex =
        /(?<=[-{1,2}|/])(?<name>[a-zA-Z0-9]*)[ |:|"]*(?<value>[\w|.|?|=|&|+| |:|/|\\]*)(?=[ |"]|$)/gm;
    const quotedStringRegex = /["'](.*?)["']/gm;

    /*
     * From the input command, split by whitespace and get only up to first 3 items
     * as we will care about the other arguments later.
     *
     * Example:
     * Given "prefix command hello --options value --option2",
     * we get [prefix, command, hello] and the prefix is ignored by _.
     */
    const [_, command, subject] = input.split(" ", 3);

    /*
     * For the subject of the command with spaces in between, the command
     * will need to enclose the subject with either single quotes or double quotes.
     *
     * If the search does not found any quoted strings, it will return null.
     */
    const quotedStringMatch = quotedStringRegex.exec(input);

    /*
     * Storage for the flags in key value pairs.
     *
     * Example:
     * Given "--option1 val1 --option2 val2", it will resolve into
     * [{name: "option1", value: "val1"}, {name: "option2", value: "val2"}]
     */
    const flags: Array<{ name: string; value: string }> = [];

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
