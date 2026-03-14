import { ActivityType, type UserActivity } from "@/types/activities";
import { users } from "./users";

export const activities: UserActivity[] = [
  {
    id: 1,
    type: ActivityType.Running,
    duration: 30,
    caloriesBurned: 300,
    date: "2024-01-01T00:00:00Z",
    description: "Felt great during the run!",
    user: users[0]!,
  },
  {
    id: 2,
    type: ActivityType.Cycling,
    duration: 45,
    caloriesBurned: 400,
    date: "2024-01-02T00:00:00Z",
    description: "Enjoyed the ride in the park.",
    user: users[0]!,
  },
  {
    id: 3,
    type: ActivityType.Swimming,
    duration: 60,
    caloriesBurned: 500,
    date: "2024-01-03T00:00:00Z",
    description: "Great workout at the pool.",
    user: users[1]!,
  },
];
