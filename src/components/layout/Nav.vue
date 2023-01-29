<script setup lang="ts">
import { useSessionStore } from '/~/data/stores/session';

const sessionStore = useSessionStore();

const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};
</script>
<template>
  <nav>
    <p>Hello {{ sessionStore.currentUser?.name }}</p>
    <button @click="logout">Logout</button>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  background: var(--green);
  color: var(--white);
}

h1 {
  font-size: 150px;
  margin-bottom: 50px;
}
</style>

