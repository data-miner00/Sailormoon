import ActivityType from "./ActivityType";

export default interface Activity {
    method: ActivityType;
    subject: string;
}
