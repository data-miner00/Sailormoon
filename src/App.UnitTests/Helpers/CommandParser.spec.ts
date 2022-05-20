import { Parse } from "../../App/Helpers/CommandParser";
import settings from "../../App/settings.json";

describe("Command Parser", () => {
    [
        {
            description:
                "Should parse command with singly flag before doubly flag correctly",
            input: `${settings.prefix} crypto ETH --latest --convert myr`,
            expected: {
                command: "crypto",
                subject: "ETH",
                flags: [
                    {
                        name: "latest",
                        value: "",
                    },
                    {
                        name: "convert",
                        value: "myr",
                    },
                ],
            },
        },
        {
            description:
                "Should parse command with singly flag after double flag correctly",
            input: `${settings.prefix} crypto ETH --convert myr --latest`,
            expected: {
                command: "crypto",
                subject: "ETH",
                flags: [
                    {
                        name: "convert",
                        value: "myr",
                    },
                    {
                        name: "latest",
                        value: "",
                    },
                ],
            },
        },
        {
            description:
                "Should parse command with multiple mixed flags correctly",
            input: `${settings.prefix} crypto ETH --convert myr --latest --quote --noreentrancy`,
            expected: {
                command: "crypto",
                subject: "ETH",
                flags: [
                    {
                        name: "convert",
                        value: "myr",
                    },
                    {
                        name: "latest",
                        value: "",
                    },
                    {
                        name: "quote",
                        value: "",
                    },
                    {
                        name: "noreentrancy",
                        value: "",
                    },
                ],
            },
        },
        {
            description:
                "Should parse command with double quoted string subject",
            input: `${settings.prefix} crypto "ETH Ethereum" --convert myr --latest`,
            expected: {
                command: "crypto",
                subject: "ETH Ethereum",
                flags: [
                    {
                        name: "convert",
                        value: "myr",
                    },
                    {
                        name: "latest",
                        value: "",
                    },
                ],
            },
        },
        {
            description:
                "Should parse command with single quoted string subject",
            input: `${settings.prefix} crypto 'ETH Ethereum' --convert myr --latest`,
            expected: {
                command: "crypto",
                subject: "ETH Ethereum",
                flags: [
                    {
                        name: "convert",
                        value: "myr",
                    },
                    {
                        name: "latest",
                        value: "",
                    },
                ],
            },
            skip: true,
        },
        {
            description: "Should parse command with no arguments",
            input: `${settings.prefix} crypto`,
            expected: {
                command: "crypto",
                subject: undefined,
                flags: [],
            },
        },
        {
            description: "Should parse command with only subject and no flags",
            input: `${settings.prefix} crypto ETH`,
            expected: {
                command: "crypto",
                subject: "ETH",
                flags: [],
            },
        },
    ].forEach((scenario) => {
        if (!scenario.skip)
            it(scenario.description, () => {
                const actual = Parse(scenario.input);

                expect(actual).toEqual(scenario.expected);
            });
    });
});
