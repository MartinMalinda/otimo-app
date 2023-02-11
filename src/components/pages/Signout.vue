<script lang="ts" setup>
import { supabase } from '/~/data/supabase';

const signout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
</script>
<template>
  <div class="journey-page">
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
  height: 100vh;
}

button {
  margin-top: $space * 3;
}
</style>
