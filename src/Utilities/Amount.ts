export default class Amount {
    public th = ["", "thousand", "million", "billion", "trillion"];

    public Verbose(amount: number): string {
        const amt_str = Math.round(amount) + "";

        function formatAmount(count: number, postfix: string): string {
            return `${amt_str.slice(0, -1 * count)} ${postfix}`;
        }

        switch (true) {
            case amt_str.length > 12:
                return formatAmount(12, this.th[4]);
            case amt_str.length > 9:
                return formatAmount(9, this.th[3]);
            case amt_str.length > 6:
                return formatAmount(6, this.th[2]);
            case amt_str.length > 3:
                return formatAmount(3, this.th[1]);
            default:
                return amt_str;
        }
    }
}
