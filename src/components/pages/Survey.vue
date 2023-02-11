<script setup lang="ts">
import Container from '/~/components/layout/Container.vue';
import SurveySection from '/~/components/survey/SurveySection.vue';
import { useSurveyStore } from '/~/data/stores/survey';

const surveyStore = useSurveyStore();

</script>
<template>
  <div class="master-background">
    <Container class="survey">
      <header>
        <h2>📜 Survey</h2>
        <p>Share only as much you'd like, all of the questions are optional.<br />We can use these to customize your
          Otimo
          experience.</p>
      </header>
      <SurveySection v-for="question in surveyStore.questions" :question="question" :key="question.header" />
      <section class="save-section">
        <div :style="`width: ${surveyStore.progress}%`" class="progress">{{ surveyStore.progress }}%</div>
        <button>Save</button>
      </section>
    </Container>
  </div>
</template>
<style lang="scss" scoped>
.master-background {
  background: #5b6861;
  padding: 10px;
}

.survey {
  background: #244234;
  color: #dfe4e2;
  margin: 60px auto !important;
  padding: 0;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  header {
    padding: 32px 32px 0 32px;
  }

  h2 {
    font-size: 2rem;
    line-height: 1em;
  }

  hr {
    display: block;
    margin-top: 32px;
    margin-bottom: 32px;
  }
}

.save-section {
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: $space $space * 2;
  background: $dark-green;
  border-top: 1px solid darken($dark-green, 2%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: $space * 2;
    padding-left: $space * 4;
    padding-right: $space * 4;
  }

  .progress {
    transition: 0.3s width;
    padding: $space;
    background: green;
    border-radius: 3px;
  }
}
</style>
