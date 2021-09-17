import * as schedule from "node-schedule";

export default class JobScheduler {
    public static schdeule(cronExpression: string, callback: Function) {
        return schedule.scheduleJob(cronExpression, callback);
    }
}
