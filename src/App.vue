<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '/~/data/stores/session';
import { useJourneyStore } from '/~/data/stores/journey';
import Login from './components/Login.vue';
import Nav from '/~/components/layout/Nav.vue';
import { supabase } from '/~/data/supabase';
import Container from '/~/components/layout/Container.vue';

const sessionStore = useSessionStore();
const journeyStore = useJourneyStore();
const journies = ref([]);

const loggedIn = ref();

supabase.auth.getSession().then(({ data }) => {
  loggedIn.value = !!data.session?.user;
});

</script>

<template>
  <template v-if="loggedIn === undefined" />
  <template v-else-if="loggedIn">
    <!-- <Nav class="nav" /> -->
    <Container>
      <div class="onboarding">
        <h1>Welcome, traveller</h1>
        <p>Otimo is a place designed to help you seek new horizons. To help you on your journey to become healthier,
          happier, wealthier and in harmony with the planet and the global community.</p>
        <h2>Let us know more about you</h2>
        <p>First, let as usk a few questions so that we can help you better. Share only as much you'd like.</p>
        <div class="buttons">
          <button>Fill the survey</button>
          <button class="secondary">Skip this step</button>
        </div>
      </div>
    </Container>
    <div v-for="journey in journies">
      {{ journey }}
    </div>
  </template>
  <Login v-else />
</template>

<style scoped>
.nav {
  margin-top: 16px;
}

.onboarding {
  border: 1px solid black;
  border-radius: 0px;
  padding: 16px;
}

.buttons {
  display: flex;
  justify-content: space-between
}

button.secondary {
  background: white;
  color: darkgray;
  border: 0;
  font-weight: 400;
}
</style>
