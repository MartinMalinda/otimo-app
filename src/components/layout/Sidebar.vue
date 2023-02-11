<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Logo from '/~/components/Logo.vue';
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
  <aside>
    <div class="otimo">
      <Logo :width="100" :should-animate="true" :after-animation="() => { }" :before-animation="() => { }" />
      <h1>Otimo</h1>
    </div>
    <div v-if="user" class="user">
      <img class="profile-pic" referrerpolicy="no-referrer" :src="user?.avatar_url" />
      <button @click="logout">Sign out</button>
    </div>
    <ul>
      <li>
        <RouterLink :to="{ name: 'Survey' }"><span class="icon">📜</span> Survey</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Journey' }"><span class="icon">👣</span> Journey</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Journey' }"><span class="icon">🗣</span> Parley</RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.otimo {
  padding: $space * 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: darken($dark-green, 3%);

  h1 {
    margin-bottom: 0;
  }
}

aside {
  position: fixed;
  width: $sidebar-width;
  background: $dark-green;
  height: 100vh;
  border-right: 2px solid darken($dark-green, 1%);
  color: $whity;
}

.user {
  display: flex;
  align-items: center;
  font-size: $font-size-sm;
  padding: $space * 2;
  position: absolute;
  bottom: 0;
  width: $sidebar-width;

  button {
    background: none;
    border: 0;
    color: $grey;
    font-size: $font-size-sm;
  }
}

img.profile-pic {
  width: 40px;
  border-radius: 50%;
}

ul {
  padding: 0;

  li {
    list-style-type: none;
    font-size: $font-size-medium;
    font-weight: 400;

    a {
      display: block;
      padding: $space * 1.5 $space * 2;
      color: $whity;
      text-decoration: none;
    }

    &:hover {
      background: darken($dark-green, 3%);
    }
  }

  .icon {
    display: inline-block;
    margin-right: $space;
  }
}
</style>
