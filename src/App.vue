<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/Login.vue';
import { supabase } from '/~/data/supabase';
import { useViewportHeight } from '/~/utils/screen';
import { RouterView } from 'vue-router';
import Sidebar from '/~/components/layout/Sidebar.vue';

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
    <Sidebar />
    <div class="content">
      <RouterView />
    </div>
  </template>
  <Login v-else />
</template>

<style scoped lang="scss">
.nav {
  margin-top: 16px;
}

.content {
  margin-left: $sidebar-width;

  @media (max-width: $mobile-breakpoint) {
    margin-left: 0;
  }
}
</style>
