import type { User } from "./user";

export enum ActivityType {
  Running = "Running",
  Cycling = "Cycling",
  Swimming = "Swimming",
  Yoga = "Yoga",
  StrengthTraining = "Strength Training"
};

export type UserActivity = {
  id: number;
  type: ActivityType;
  duration: number;
  caloriesBurned: number;
  date: string;
  description?: string;
  user: User;
};

