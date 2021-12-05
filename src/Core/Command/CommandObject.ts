export default class CommandObject {
    constructor(private _command: string, private args: string[]) {}

    public get command(): string {
        return this._command;
    }
    public get arguments(): string[] {
        return this.args;
    }
}
