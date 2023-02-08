<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/Login.vue';
import { supabase } from '/~/data/supabase';
import Onboarding from '/~/components/Onboarding.vue';
import { useViewportHeight } from '/~/utils/screen';
import { RouterView } from 'vue-router';

useViewportHeight();

const loggedIn = ref();

supabase.auth.getSession().then(({ data }) => {
  loggedIn.value = !!data.session?.user;
});

</script>

<template>
  <template v-if="loggedIn === undefined" />
  <template v-else-if="loggedIn">
    <!-- <Nav class="nav" /> -->
    <!-- <Onboarding /> -->
    <RouterView />
  </template>
  <Login v-else />
</template>

<style scoped>
.nav {
  margin-top: 16px;
}
</style>
