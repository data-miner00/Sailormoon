import Amount from "../Utilities/Amount";

describe("Amount.ts", () => {
    let amount: Amount;

    beforeEach(() => {
        amount = new Amount();
    });

    [
        {
            type: "none",
            input: 123,
            expected: "123",
        },
        {
            type: "thousand",
            input: 42345,
            expected: "42 thousand",
        },
        {
            type: "thousand",
            input: 242345,
            expected: "242 thousand",
        },
        {
            type: "million",
            input: 12359084,
            expected: "12 million",
        },
        {
            type: "billion",
            input: 9763242343,
            expected: "9 billion",
        },
        {
            type: "trillion",
            input: 1930200026832,
            expected: "1 trillion",
        },
    ].forEach((scenario) => {
        it(`should return result in ${scenario.type}`, () => {
            expect(amount.Verbose(scenario.input)).toBe(scenario.expected);
        });
    });
});
