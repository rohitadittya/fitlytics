<script setup lang="ts">
import { useActivitiesStore } from "@/stores/activities";
import { type UserActivity } from "@/types/activities";

const props = defineProps({
    activity: {
        type: Object as () => UserActivity,
        required: true
    },
    canModify: {
        type: Boolean,
        default: false
    }
})

const activitiesStore = useActivitiesStore();

const deleteActivity = () => {
    activitiesStore.deleteUserActivity(props.activity.id)
}

const emit = defineEmits(["edit"]);

const editActivity = () => {
    emit("edit");
}

</script>

<template>
    <div class="card">
        <header class="card-header">
            <figure class="image is-48x48 avatar">
                <img :src="activity.user.image" alt="User Image">
            </figure>
            <p class="card-header-title">{{ activity.type }}</p>
        </header>
        <div class="card-content">
            <div class="content">
                {{ activity.description }}
                <br />
                {{ activity.duration }} minutes | {{ activity.caloriesBurned }} calories
                <time datetime="2016-1-1">{{ activity.date }}</time>
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" v-if="canModify" class="card-footer-item" @click="editActivity">
                <span class="icon">
                    <i class="fas fa-edit" aria-hidden="true"></i>
                </span>
            </a>
            <a href="#" v-if="!canModify" class="card-footer-item">
                <span class="icon">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
            </a>
            <a href="#" class="card-footer-item">
                <span class="icon">
                    <i class="fas fa-share-alt" aria-hidden="true"></i>
                </span>
            </a>
            <a href="#" v-if="canModify" class="card-footer-item" @click="deleteActivity">
                <span class="icon">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                </span>
            </a>
        </footer>
    </div>
</template>

<style scoped>
.card {
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(99, 96, 96, 0.3);
}

.activity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.avatar img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
