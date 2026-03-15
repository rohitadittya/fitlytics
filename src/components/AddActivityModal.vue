<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue"
import { ActivityType } from "@/types/activities"
import { useActivitiesStore } from "@/stores/activities"
import { useUserStore } from "@/stores/user"

const props = defineProps({
    isOpen: Boolean,
    editActivityId: {
        type: Number,
        required: false
    },

});

const emit = defineEmits(["close"]);

const activitiesStore = useActivitiesStore();
const userStore = useUserStore();

const type = ref(ActivityType.Running);
const duration = ref(0);
const caloriesBurned = ref(0);
const description = ref("");
const isEditing = computed(() => !!props.editActivityId);

const resetForm = () => {
    type.value = ActivityType.Running;
    duration.value = 0;
    caloriesBurned.value = 0;
    description.value = "";
}

watch(
    () => props.editActivityId,
    (id) => {
        if (!id) {
            resetForm();
            return;
        }

        const activity = activitiesStore.getUserActivityById(id);

        if (activity) {
            type.value = activity.type;
            duration.value = activity.duration;
            caloriesBurned.value = activity.caloriesBurned;
            description.value = activity.description || "";
        }
    },
    { immediate: true }
);



const submit = () => {
    if (!userStore.loggedInUser) return;

    activitiesStore.upsertUserActivity({
        id: props.editActivityId || Math.floor(Math.random() * Date.now()),
        type: type.value,
        duration: duration.value,
        caloriesBurned: caloriesBurned.value,
        description: description.value,
        date: new Date().toISOString(),
        user: userStore.loggedInUser
    }, isEditing.value);

    resetForm();
    emit("close")
}
</script>

<template>
    <div class="modal" :class="{ 'is-active': isOpen }">
        <div class="modal-background" @click="$emit('close')"></div>

        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ isEditing ? "Edit Activity" : "Add Activity" }}
                </p>
                <button class="delete" @click="$emit('close')"></button>
            </header>

            <section class="modal-card-body">

                <div class="field">
                    <label class="label">Activity Type</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="type">
                                <option v-for="activityType in Object.values(ActivityType)" :key="activityType">
                                    {{ activityType }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Duration (minutes)</label>
                    <input class="input" type="number" v-model="duration" />
                </div>

                <div class="field">
                    <label class="label">Calories Burned</label>
                    <input class="input" type="number" v-model="caloriesBurned" />
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <textarea class="textarea" v-model="description"></textarea>
                </div>

            </section>

            <footer class="modal-card-foot">
                <button class="button is-success" @click="submit">
                    Save Activity
                </button>

                <button class="button" @click="$emit('close')">
                    Cancel
                </button>
            </footer>
        </div>
    </div>
</template>