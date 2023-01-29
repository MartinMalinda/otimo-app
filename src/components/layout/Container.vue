<script setup lang="ts">
defineProps({
  tagName: String
})
</script>
<template>
  <component :is="tagName || 'div'" class="container">
    <slot />
  </component>
</template>
<style scoped>
.container {
  width: 960px;
  max-width: 100%;
  padding: 16px;
  margin: 0 auto;
}
</style>
