import { type User, UserRole } from '../types/user';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

import { users as userData } from '../data/users';

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>(userData);

    const loggedInUser = ref<User | null>(null);

    const getUserById = (id: number): User | undefined => {
        return users.value.find(u => u.id === id);
    };

    const isAdminLoggedIn = () => computed(() => {
        return loggedInUser.value?.role === UserRole.ROLE_ADMIN;
    });

    const isUserLoggedIn = () => computed(() => {
        return loggedInUser.value !== null;
    });

    const login = (userId: number) => {
        const user = getUserById(userId);
        if (user) {
            loggedInUser.value = user;
        }
    };

    const logout = () => {
        loggedInUser.value = null;
    };

    const deleteUser = (userId: number) => {
        users.value = users.value.filter(u => u.id !== userId);
    };

    const addUser = (user: User) => {
        users.value.push(user);
    };

    const updateUser = (updatedUser: User) => {
        users.value = users.value.map(user => user.id === updatedUser.id ? updatedUser : user);
    };

    const upsertUser = (user: User, isUpdate: boolean) => {
        if (isUpdate) {
            updateUser(user);
        } else {
            addUser(user);
        }
    };

    const getAllUsers = (): User[] => {
        return users.value;
    };

    return {
        users,
        loggedInUser,
        login,
        logout,
        deleteUser,
        upsertUser,
        getAllUsers,
        getUserById,
        isAdminLoggedIn,
        isUserLoggedIn,
    };
});