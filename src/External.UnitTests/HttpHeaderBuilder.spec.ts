import HttpHeaderBuilder from "../External/HttpHeaderBuilder";

describe("HttpHeaderBuilder", () => {
    it("Should build Http header correctly", () => {
        const actual = new HttpHeaderBuilder()
            .With("Random", "Value")
            .With("Random2", "Value2")
            .WithAccept("application/json")
            .WithAcceptEncoding("deflate, gzip")
            .Build();

        expect(actual).toEqual({
            Random: "Value",
            Random2: "Value2",
            Accept: "application/json",
            "Accept-Encoding": "deflate, gzip",
        });
    });
});
