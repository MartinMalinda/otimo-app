import { defineStore } from 'pinia';
import { User, useUserStore } from './user';
import { endpoints } from '/~/data/api';

export const useSessionStore = defineStore({
  id: 'session',
  state: () => ({
    isFetchingCurrentUser: false,
    currentUser: null as null | User
  }),

  actions: {
    async fetchCurrentUser() {
      const userStore = useUserStore();

      if (this.currentUser) {
        return this.currentUser;
      }

      this.isFetchingCurrentUser = true;
      try {
        const userData = await endpoints.getCurrentUser();
        const user = userStore.addUser(userData);
        this.currentUser = user;
        return this.currentUser;
      } catch (e) {
        // TODO: error handling
      } finally {
        this.isFetchingCurrentUser = false;
      }
    }
  }
});
