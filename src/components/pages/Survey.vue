<script setup lang="ts">
import { reactive, ref } from 'vue';
import Container from '/~/components/layout/Container.vue';

const survey = reactive({
  residesAt: null as null | 'megalopolis' | 'city' | 'rural' | 'off-grid',
  climate: null as null | 'topical' | 'moderate' | 'sub-arctic' | 'arctic',
  housing: null as null | 'flat-sharing' | 'flat-renting' | 'flat-owner' | 'house-renting' | 'house-owner',
  modesOfTransport: [] as ('bicycle' | 'motorbike' | 'car' | 'van')[]
});

// type Single = <X extends string, Y extends string>(options: { header: Y, options: Record<string, X> }) => { header: Y, options: X[], value: X | null };
// const createSingle : Single = (options) => ({
//   header: options.header,
//   options: Object.values(options.options),
//   value: null
// });

// const first = createSingle({
//     header: 'Where do you currently reside?',
// value: null as null | string,
//     options: ['Megalopolis', 'City', 'Rural area', 'Off the grid']
//   });

const sections = ref([
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
    value: null as null | string,
    options: [
      { emoji: '🚲', label: 'Bicycle' },
      { emoji: '🛵', label: 'Motorbike / scooter' },
      { emoji: '🚘', label: 'Car' },
      { emoji: '🚚', label: 'Van' },
    ]
  }
]);


</script>
<template>
  <Container class="survey">
    <header>
      <h1>We're curious to know more</h1>
      <p>Share only as much you'd like, all of the questions are optional.<br />We can use these to customize your Otimo
        experience.</p>
    </header>
    <section v-for="section in sections">
      <h2>{{ section.header }}</h2>
      <div class="options">
        <button v-for="option in section.options" @click="() => section.value = option.label" class="survey-button"
          :class="{ selected: option.label === section.value }">
          <div class="emoji">{{ option.emoji }}</div>
          {{ option.label }}
        </button>
      </div>
    </section>
  </Container>
</template>
<style lang="scss" scoped>
@keyframes clear {
  0% {
    filter: blur(5px)
  }

  100% {
    filter: blur(0px)
  }
}

.survey {
  margin: 60px auto !important;
  padding: 0;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.2);

  header {
    padding: 32px 32px 0 32px;
  }

  h1 {
    font-size: 3rem;
    line-height: 1em;
  }

  hr {
    display: block;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .options {
    display: flex;
    gap: 8px;
  }

  section {
    margin-top: 32px;
    padding: 32px;
    filter: blur(5px);
    animation: 0.5s clear forwards;
    animation-delay: 1s;

    &:nth-child(even) {
      background: rgba(211, 211, 211, 0.18);
    }
  }

  .survey-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 120px;
    width: 120px;
    background: white;
    color: black;
    transition: 0.3s background, 0.3s color;

    &.selected {
      background: var(--green);
      color: white;
    }

    .emoji {
      font-size: 50px;
    }
  }
}
</style>
