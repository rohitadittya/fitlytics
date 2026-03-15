<script setup lang="ts">
import { useActivitiesStore } from "@/stores/activities"
import ActivityCard from "@/components/ActivityCard.vue"
import { ref } from "vue"
import AddActivityModal from "@/components/AddActivityModal.vue"

const activitiesStore = useActivitiesStore()

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}
</script>

<template>
    <section class="section">
        <div class="container">
            <div class="level mb-5">
                <div class="level-left">
                    <h1 class="title is-2">Feed</h1>
                </div>
                <div class="level-right">
                    <button class="button is-primary" @click="openModal">
                        Add Fitness Activity
                    </button>
                </div>
            </div>
            <div class="columns is-multiline">
                <div class="column is-8 is-offset-2" v-for="activity in activitiesStore.activityFeed"
                    :key="activity.id">
                    <ActivityCard :activity="activity" />
                </div>
            </div>
        </div>

    </section>

    <AddActivityModal :isOpen="isModalOpen" @close="closeModal" />
</template>

<style scoped>
.level {
    align-items: center;
}
</style>