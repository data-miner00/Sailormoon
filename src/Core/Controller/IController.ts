// unused file
export default interface IController<T> {
    registerHandler(t: T): void;
    registerHandlers(): void;
    sendResponse(): void;
}
