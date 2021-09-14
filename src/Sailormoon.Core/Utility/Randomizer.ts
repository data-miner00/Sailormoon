export default class Randomizer {
    public static PercentageIndicesRandomizer(): number {
        return Math.random();
    }

    public static PercentageRandomizer(): number {
        return Math.floor(Math.random() * 101);
    }

    public static IntegerRandomizer(
        startIncluding: number,
        endExcluding: number
    ) {
        return (
            Math.floor(Math.random() * endExcluding) +
            Math.floor(startIncluding)
        );
    }

    public static FloatRandomizer(
        startIncluding: number,
        endExcluding: number
    ) {
        return Math.random() * endExcluding + startIncluding;
    }
}
