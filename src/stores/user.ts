import { User, UserRole } from '../types/user';
import { defineStore } from 'pinia'
import { ref } from 'vue';

import { users as userData } from '../data/users';

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>(userData);
    
    const loggedInUser = ref<User | null>(null);

    const getUserById = (id: number): User | undefined => {
        return users.value.find(u => u.id === id);
    }

    const isAdminLoggedIn = (): boolean => {
        return loggedInUser.value?.role === UserRole.ROLE_ADMIN;
    }

    const login = (userId: number) => {
        const user = getUserById(userId);
        if (user) {
            loggedInUser.value = user;
        }
    };

    const logout = () => {
        loggedInUser.value = null;
    };

    const deleteUserByAdmin = (userId: number) => {
        if (isAdminLoggedIn()) {
            users.value = users.value.filter(u => u.id !== userId);
        }
    }

    return {
        users,
        loggedInUser,
        login,
        logout,
        deleteUserByAdmin,
        getUserById,
    };
});