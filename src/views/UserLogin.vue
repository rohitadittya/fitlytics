<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { UserRole } from '@/types/user'

const userStore = useUserStore()

const login = (userId: number) => {
    userStore.login(userId)
    router.push({ name: 'Dashboard' })
}
</script>

<template>
    <section class="section">
        <div class="container">
            <h1 class="title has-text-centered">Fitlytics</h1>
            <p class="subtitle has-text-centered">
                Select your profile to access your fitness dashboard
            </p>
            <div class="columns is-multiline is-centered mt-5">
                <div class="column is-3" v-for="user in userStore.users" :key="user.id">
                    <div class="card user-card" @click="login(user.id)">
                        <div class="card-content has-text-centered">
                            <figure class="avatar mb-3">
                                <img :src="user.image" alt="User profile" />
                            </figure>
                            <p class="title is-5">{{ user.name }}</p>
                            <p class="is-size-7 has-text-grey">
                                {{ user.role === UserRole.ROLE_ADMIN ? 'Admin' : 'User' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.user-card {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.avatar {
    width: 96px;
    height: 96px;
    margin: 0 auto;
}

.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
</style>