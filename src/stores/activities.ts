import { computed, ref } from "vue";
import { defineStore } from "pinia";

import type { UserActivity } from "../types/activities";
import { activities } from "../data/activities";
import { useUserStore } from "./user";

export const useActivitiesStore = defineStore("activities", () => {
  const userStore = useUserStore();
  const allActivities = ref<UserActivity[]>(activities);

  const sortActivities = (activities: UserActivity[]) => {
    return activities.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  };

  const activityFeed = computed(() => {
    return sortActivities([...allActivities.value]);
  });

  const loggedInUserActivities = computed(() => {
    const user = userStore.loggedInUser;
    if (!user) return [];

    return sortActivities(
      allActivities.value.filter((activity) => activity.user.id === user.id),
    );
  });

  const addUserActivity = (activity: UserActivity) => {
    if (!userStore.loggedInUser) return
    allActivities.value.push(activity);
  };

  const deleteUserActivity = (activityId: number) => {
    if (!userStore.loggedInUser) return
    allActivities.value = allActivities.value.filter(
      (activity) => activity.id !== activityId,
    );
  };

  const updateUserActivity = (updatedActivity: UserActivity) => {
    if (!userStore.loggedInUser) return
    allActivities.value = allActivities.value.map((activity) => {
      if (activity.id === updatedActivity.id) {
        return updatedActivity
      }
      return activity
    });
  };

  const upsertUserActivity = (activity: UserActivity, isEdit: boolean = false) => {
    if (isEdit) {
      updateUserActivity(activity);
    } else {
      addUserActivity(activity);
    }
  };

  const getUserActivityById = (activityId: number) => {
    return allActivities.value.find((activity) => activity.id === activityId);
  };

  const deleteAllActivitiesByUser = (userId: number) => {
    allActivities.value = allActivities.value.filter(
      (activity) => activity.user.id !== userId,
    );
  };

  return {
    activityFeed,
    loggedInUserActivities,
    deleteUserActivity,
    getUserActivityById,
    upsertUserActivity,
    deleteAllActivitiesByUser
  };
});
