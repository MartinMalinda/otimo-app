<script setup lang="ts">
import { ref } from 'vue';
import Container from '/~/components/layout/Container.vue';
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
      <div class="left">
        <button @click="logout"><button @click="logout"><img :src="user?.avatar_url" /> </button></button>
        <div class="links">
          <a>Profile</a>
          <a>Journey</a>
          <a>Explore</a>
        </div>
      </div>
    </Container>
  </nav>
</template>

<style lang="scss" scoped>
.links {
  a {
    padding: 8px;

    &:not(:last-child) {
      border-right: 1px solid black;
    }

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.left {
  border: 1px solid black;
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
}

button {
  background: none;
  border: none;
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
  justify-content: flex-start;
  align-items: center;
}

h1 {
  font-size: 150px;
  margin-bottom: 50px;
}
</style>

