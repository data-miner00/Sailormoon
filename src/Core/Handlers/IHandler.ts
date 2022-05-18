export default interface IHandler {
    ConditionChecker: () => boolean;
    Handle: () => void;
}
