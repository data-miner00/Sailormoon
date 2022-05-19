export default class HttpHeaderBuilder {
    private httpHeader: Object;

    public constructor() {
        this.httpHeader = {};
    }

    public With(key: string, value: string): HttpHeaderBuilder {
        this.httpHeader[key] = value;
        return this;
    }

    public WithAccept(value: string): HttpHeaderBuilder {
        this.httpHeader["Accept"] = value;
        return this;
    }

    public WithAcceptEncoding(value: string): HttpHeaderBuilder {
        this.httpHeader["Accept-Encoding"] = value;
        return this;
    }

    public Build = (): Object => this.httpHeader;
}
