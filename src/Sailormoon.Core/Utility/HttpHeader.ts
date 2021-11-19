export enum HeaderKey {
    Accept = "Accept",
    AcceptEncoding = "Accept-Encoding",
    AcceptLanguage = "Accept-Language",
    AltUsed = "Alt-Used",
    Connection = "Connection",
    Cookie = "Cookie",
    Host = "Host",
    Referer = "Referer",
    UserAgent = "User-Agent",
}

export default class HttpHeader {
    private CustomHeader: Object;

    constructor(
        private _Accept?: string,
        private _AcceptEncoding?: string,
        private _AcceptLanguage?: string,
        private _AltUsed?: string,
        private _Connection?: string,
        private _Cookie?: string,
        private _Host?: string,
        private _Referer?: string,
        private _UserAgent?: string
    ) {
        this.CustomHeader = new Object();
    }

    public set Accept(value: string) {
        this._Accept = value;
    }

    public get Accept(): string {
        return this._Accept;
    }

    public set AcceptEncoding(value: string) {
        this._AcceptEncoding = value;
    }

    public get AcceptEncoding(): string {
        return this._AcceptEncoding;
    }

    public set AcceptLanguage(value: string) {
        this._AcceptLanguage = value;
    }

    public get AcceptLanguage(): string {
        return this._AcceptLanguage;
    }

    public set AltUsed(value: string) {
        this._AltUsed = value;
    }

    public get AltUsed(): string {
        return this._AltUsed;
    }

    public set Connection(value: string) {
        this._Connection = value;
    }

    public get Connection(): string {
        return this._Connection;
    }

    public set Cookie(value: string) {
        this._Cookie = value;
    }

    public get Cookie(): string {
        return this._Cookie;
    }

    public set Referer(value: string) {
        this._Referer = value;
    }

    public get Referer(): string {
        return this._Referer;
    }

    public set UserAgent(value: string) {
        this._UserAgent = value;
    }

    public get UserAgent(): string {
        return this._UserAgent;
    }

    public AddCustomHeader(key: string, value: string): void {
        this.CustomHeader[key] = value;
    }

    public JSON(stringify = false): Object | string {
        const headerJson = new Object();

        this._Accept && (headerJson[HeaderKey.Accept] = this._Accept);
        this._AcceptEncoding &&
            (headerJson[HeaderKey.AcceptEncoding] = this._AcceptEncoding);
        this._AcceptLanguage &&
            (headerJson[HeaderKey.AcceptLanguage] = this._AcceptLanguage);
        this._AltUsed && (headerJson[HeaderKey.AltUsed] = this._AltUsed);
        this._Connection &&
            (headerJson[HeaderKey.Connection] = this._Connection);
        this._Cookie && (headerJson[HeaderKey.Cookie] = this._Cookie);
        this._Host && (headerJson[HeaderKey.Host] = this._Host);
        this._Referer && (headerJson[HeaderKey.Referer] = this._Referer);
        this._UserAgent && (headerJson[HeaderKey.UserAgent] = this._UserAgent);

        return stringify
            ? JSON.stringify(
                  Object.assign(new Object(), headerJson, this.CustomHeader)
              )
            : Object.assign({}, headerJson, this.CustomHeader);
    }
}
