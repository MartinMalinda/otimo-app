import { defineStore } from 'pinia';

export const useSurveyStore = defineStore({
  id: 'survey',
  state: () => ({
    questions: [
      {
        header: 'Where do you currently reside?',
        value: null as null | string,
        options: [
          { label: 'Megalopolis', emoji: '🏙' },
          { label: 'City', emoji: '🌆' },
          { label: 'Rural area', emoji: '🏘' },
          { label: 'Off the grid', emoji: '🏜' }
        ],
      }, {
        header: 'What is the climate within your area?',
        value: null as null | string,
        options: [
          { label: 'Tropical', emoji: '🌴' },
          { label: 'Temperate', emoji: '☀️' },
          { label: 'Moderate', emoji: '⛅' },
          { label: 'Sub arctic', emoji: '🌨' },
          { label: 'Arcit', emoji: '❄️' },
        ]
      }, {
        header: 'Your housing situation',
        value: null as null | string,
        options: [
          { emoji: '👥', label: 'Flatsharing' },
          { emoji: '🏨', label: 'Flat renting' },
          { emoji: '🏢', label: 'Flat owner' },
          { emoji: '🏠', label: 'House renting' },
          { emoji: '🏡', label: 'House owner' },
        ]
      },
      {
        header: 'Which of these do you own? (or have reliably available)',
        value: [] as string[],
        options: [
          { emoji: '🚲', label: 'Bicycle' },
          { emoji: '🛵', label: 'Motorbike / scooter' },
          { emoji: '🚘', label: 'Car' },
          { emoji: '🚚', label: 'Van' },
        ]
      }
    ]
  }),
  getters: {
    progress(state) {
      const answeredQuestions = state.questions.filter(q => !!q.value && q.value.length !== 0).length;
      const totalQuestions = state.questions.length;
      return Math.round(answeredQuestions / totalQuestions * 100);
    }
  },
  actions: {
  }
});

type SurveyStore = ReturnType<typeof useSurveyStore>;
export type SurveyQuestion = SurveyStore['questions'][0];
