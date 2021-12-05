import * as schedule from "node-schedule";

export default class JobScheduler {
    public static schdeule(schedulable: string | Date, callback: Function) {
        return schedule.scheduleJob(schedulable, callback);
    }
}
