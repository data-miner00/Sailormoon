import { activities } from "../response/activities";

export default function* activityGenerator() {
  var loop_counter = 0;
  for (;;) {
    yield activities[loop_counter];

    if (loop_counter === activities.length - 1) loop_counter = 0;
    else loop_counter++;
  }
}
