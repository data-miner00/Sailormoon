import * as moment from "moment";

class DateFormat {
    private date: Date;

    public constructor() {}

    public FromISOString(isoString: string): DateFormat {
        this.date = new Date(isoString);
        return this;
    }

    public Today(): DateFormat {
        this.date = new Date();
        return this;
    }

    public AddDays(daysToAdd = 1): DateFormat {
        this.date.setDate(this.date.getDate() + daysToAdd);
        return this;
    }

    public GetDateObject(): Date {
        return this.date;
    }

    public Format(format: string): string {
        return moment(this.date).format(format);
    }
}

interface DateFormat {
    Now: typeof DateFormat.prototype.Today;
}

DateFormat.prototype.Now = DateFormat.prototype.Today;

export default DateFormat;
