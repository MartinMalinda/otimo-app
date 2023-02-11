<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Logo from '/~/components/Logo.vue';
import { supabase } from '/~/data/supabase';

const user = ref();
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user?.user_metadata;
});

</script>
<template>
  <aside>
    <div class="otimo">
      <Logo :width="100" :should-animate="true" :after-animation="() => { }" :before-animation="() => { }" />
      <h1>Otimo</h1>
    </div>
    <div v-if="user" class="user">
      <div class="row">
        <img class="profile-pic" referrerpolicy="no-referrer" :src="user.avatar_url" />
        {{ user.full_name }}
      </div>
      <RouterLink :to="{ name: 'Signout' }" class="row">
        <span class="icon">🚪</span>
        Sign out
      </RouterLink>
    </div>
    <ul>
      <li>
        <RouterLink :to="{ name: 'Survey' }"><span class="content"><span class="icon">📜</span> Survey</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Journey' }"><span class="content"><span class="icon">👣</span> Journey</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Parley' }"><span class="content"><span class="icon">🗣</span> Parley</span>
        </RouterLink>
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
  font-size: $font-size-sm;
  padding: $space * 2;
  position: absolute;
  bottom: 0;
  width: $sidebar-width;

  .row {
    display: flex;
    gap: $space;
    align-items: center;
  }

  a {
    text-decoration: none;
    padding-left: 0;
    background: none;
    border: 0;
    color: $grey;
    font-size: $font-size-sm;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Helvetica, Arial, sans-serif;

    .icon {
      width: 25px;
      font-size: 1.2rem;
    }
  }
}

img.profile-pic {
  width: 25px;
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
      position: relative;

      * {
        position: relative;
        z-index: 2;
      }

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: none;
        z-index: 1;
        transform: scale(0, 1);
        transition: 0.4s transform;
      }

      &.router-link-active {
        &::before {
          transform: scale(1, 1);
          background: darken($dark-green, 3%);
        }
      }
    }

  }

  .icon {
    display: inline-block;
    margin-right: $space;
  }
}
</style>
