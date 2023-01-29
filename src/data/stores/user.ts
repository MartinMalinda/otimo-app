import { defineStore } from 'pinia';

interface UserRaw {
  id: number;
  name: string;
  email?: string;
  created_at: number;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  createdAt: Date
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: {} as Record<string, User>,
  }),
  actions: {
    addUser(userData: UserRaw) {
      return this.users[userData.id] = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        createdAt: new Date(userData.created_at)
      };
    }
  }
});
