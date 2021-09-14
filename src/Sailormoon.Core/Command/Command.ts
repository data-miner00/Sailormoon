import CommandObject from "./CommandObject";

export default abstract class Command {
    protected abstract commandObj: CommandObject;

    public abstract execute(): void;

    protected abstract setup(): void;

    protected catchError(error): void {
        console.error(error);
    }
}
