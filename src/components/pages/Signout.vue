<script lang="ts" setup>
import Logo from '/~/components/Logo.vue';
import { supabase } from '/~/data/supabase';

const signout = async () => {
  await supabase.auth.signOut();
  window.location.href = '/';
};
</script>
<template>
  <div class="journey-page">
    <Logo class="logo-white" :width="200" :should-animate="true" />
    <h1>Thank you and see you next time 👋</h1>
    <button @click="signout">Sign out</button>
  </div>
</template>
<style lang="scss" scoped>
.journey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh) * 100);
}

button {
  margin-top: $space * 3;
}

.logo-white {
  background: white;
  margin-bottom: $space * 3;
}
</style>
