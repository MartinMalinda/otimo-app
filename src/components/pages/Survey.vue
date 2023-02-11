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
        <h1>We're curious to know more</h1>
        <p>Share only as much you'd like, all of the questions are optional.<br />We can use these to customize your
          Otimo
          experience.</p>
      </header>
      <SurveySection v-for="question in surveyStore.questions" :question="question" :key="question.header" />
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
}
</style>
