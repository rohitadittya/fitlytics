import { computed, ref } from "vue";
import { defineStore } from "pinia";

import type { ActivityType, UserActivity } from "../types/activities";
import { activities } from "../data/activities";
import { useUserStore } from "./user";

export const useActivitiesStore = defineStore("activities", () => {
  const userStore = useUserStore();
  const allActivities = ref<UserActivity[]>(activities);

  const allUserActivities = computed(() => {
    return (
      allActivities.value?.map((activity) => {
        const user = userStore.getUserById(activity.user?.id);
        return {
          ...activity,
          type: activity.type as ActivityType,
          user: user,
        };
      }) || []
    );
  });

  const loggedInUserActivitiies = computed(() => {
    return (
      allActivities.value?.map((activity) => {
        const user = userStore.loggedInUser.value ?? null;

        return {
          ...activity,
          type: activity.type as ActivityType,
          user: user,
        };
      }) || []
    );
  });

  const addUserActivity = (activity: UserActivity) => {
    allActivities.value.push(activity);
  };

  const deleteUserActivity = (activityId: number) => {
    const index = allActivities.value.findIndex((a) => a.id === activityId);
    if (index !== -1) {
      allActivities.value.splice(index, 1);
    }
  };

    return {
        allUserActivities,
        loggedInUserActivitiies,
        addUserActivity,
        deleteUserActivity,
    };
});
