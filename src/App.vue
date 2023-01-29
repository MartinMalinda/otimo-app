<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '/~/data/stores/session';
import Login from './components/Login.vue';
import Nav from '/~/components/layout/Nav.vue';

const sessionStore = useSessionStore();

const loggedIn = ref(!!localStorage.getItem('token'));
if (loggedIn) {
  sessionStore.fetchCurrentUser();
}
</script>

<template>
  <Nav v-if="loggedIn" />
  <Login v-else />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
</style>
