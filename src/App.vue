<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '/~/data/stores/session';
import { useJourneyStore } from '/~/data/stores/journey';
import Login from './components/Login.vue';
import Nav from '/~/components/layout/Nav.vue';

const sessionStore = useSessionStore();
const journeyStore = useJourneyStore();
const journies = ref([]);

const loggedIn = ref(!!localStorage.getItem('token'));
if (loggedIn) {
  sessionStore.fetchCurrentUser();
  journeyStore.getJournies().then((_journies) => {
    journies.value = _journies;
  });
}
</script>

<template>
  <template v-if="loggedIn">
    <Nav />
    <div v-for="journey in journies">
      {{ journey }}
    </div>
  </template>
  <Login v-else />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
</style>
