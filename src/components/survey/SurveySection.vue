<script setup lang="ts">
import { SurveyQuestion } from '/~/data/stores/survey';

defineProps<{ question: SurveyQuestion }>();
</script>

<template>
  <section>
    <h2>{{ question.header }}</h2>
    <div class="options">
      <button v-for="option in question.options" @click="() => {
        if (question.value && typeof question.value === 'object') {
          if (question.value?.includes(option.label)) {
            question.value = question.value.filter(selectedOption => selectedOption !== option.label);
          } else {
            question.value = [...question.value as string[], option.label];
          }
        } else {
          question.value = option.label;
        }
      }" class="survey-button" :class="{
  selected: typeof question.value === 'string' && option.label === question.value,
  checked: typeof question.value === 'object' && question.value?.includes(option.label)
}">
        <div class="emoji">{{ option.emoji }}</div>
        {{ option.label }}
      </button>
    </div>
  </section>
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
  background: rgb(112, 140, 101);
  color: black;
  transition: 0.3s background, 0.3s color, 0.3s border, 0.3s width, 0.3s height, 0.3s margin;
  flex-shrink: 0;
  position: relative;
  border: 5px solid transparent;

  &.selected {
    background: var(--green);
    color: white;
    width: 125px;
    height: 125px;
    margin-top: -2.5px;
    // transform: translateY(-2.5px);
  }

  &:active {
    transform: scale(0.98, 0.98);
  }

  &.checked {
    border: 5px solid var(--green);

    &::after {
      position: absolute;
      bottom: -5px;
      right: -5px;
      content: '✅';
      width: 1em;
      height: 1em;
      line-height: 1;
      border: 5px solid var(--green);
      border-radius: 3px;
    }
  }

  .emoji {
    font-size: 50px;
  }
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 0;
}
</style>
