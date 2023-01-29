<script setup lang="ts">
import Container from '/~/components/layout/Container.vue';
import { useSessionStore } from '/~/data/stores/session';

const sessionStore = useSessionStore();

const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};
</script>
<template>
  <nav>
    <Container class="inner">
      <p>Hello {{ sessionStore.currentUser?.name }}</p>
      <button @click="logout">Logout</button>
    </Container>
  </nav>
</template>

<style scoped>
nav {
  color: var(--white);
  background: var(--green);
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 150px;
  margin-bottom: 50px;
}
</style>

