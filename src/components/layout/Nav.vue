<script setup lang="ts">
import { ref } from 'vue';
import Container from '/~/components/layout/Container.vue';
import { useSessionStore } from '/~/data/stores/session';
import { supabase } from '/~/data/supabase';

const user = ref();
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user?.user_metadata;
});

const logout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
</script>
<template>
  <nav>
    <Container class="inner">
      <p><img :src="user?.avatar_url" /> {{ user?.name }}</p>
      <button @click="logout">Logout</button>
    </Container>
  </nav>
</template>

<style scoped>
nav {
  color: var(--white);
  background: var(--green);
}

p {
  display: flex;
  align-items: center;
  gap: 8px;
}

img {
  border-radius: 50%;
  width: 40px;
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

