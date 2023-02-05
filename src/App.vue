<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '/~/data/stores/session';
import { useJourneyStore } from '/~/data/stores/journey';
import Login from './components/Login.vue';
import { supabase } from '/~/data/supabase';
import Onboarding from '/~/components/Onboarding.vue';
import { useViewportHeight } from '/~/utils/screen';

useViewportHeight();
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
    <Onboarding />
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
</style>
