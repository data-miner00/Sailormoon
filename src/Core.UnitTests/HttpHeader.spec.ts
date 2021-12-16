import HttpHeader from "../Core/Typedef/HttpHeader";

describe("HttpHeader unit test", () => {
    let httpHeader: HttpHeader;

    beforeEach(() => {
        httpHeader = new HttpHeader();
    });

    it("should produce the expected header object", () => {
        httpHeader.Accept = "Haha";
        httpHeader.UserAgent = "Firefox";

        const expected = {
            Accept: "Haha",
            "User-Agent": "Firefox",
        };

        const actual = httpHeader.JSON();

        expect(actual["Accept-Encoding"]).toBeUndefined();
        expect(actual["Custom-Header"]).toBeUndefined();
        expect(actual).toEqual(expected);
    });

    it("should be able to cater custom headers", () => {
        httpHeader.Accept = "Haha";
        httpHeader.UserAgent = "Firefox";

        httpHeader.WithCustomHeader("Custom-Header", "0GCustomValue");

        const expected = {
            Accept: "Haha",
            "User-Agent": "Firefox",
            "Custom-Header": "0GCustomValue",
        };

        const actual = httpHeader.JSON();

        expect(actual["Accept-Encoding"]).toBeUndefined();
        expect(actual["Custom-Header"]).not.toBeUndefined();
        expect(actual).toEqual(expected);
    });
});
