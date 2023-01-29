// https://x8ki-letl-twmt.n7.xano.io/api:ikRIWViF/journey

import { defineStore } from 'pinia';
import { endpoints } from '/~/data/api';

export const useJourneyStore = defineStore({
  id: 'journey',
  state: () => ({
    journies: {} as Record<string, any>
  }),

  actions: {
    async getJournies() {
      const journies = await endpoints.getJournies();
      return journies.map((journey: any) =>
        this.journies[journey.id] = journey
      )
    }
  }
});
