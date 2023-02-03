<script setup lang="ts">

</script>
<template>
  <div class="onboarding">
    <section>
      <h1>Welcome, traveller</h1>
      <h2>Otimo is designed to help you seek new perspectives.</h2>
    </section>
    <section>
      <h2>It helps you take harmonious action...</h2>
    </section>
    <section>
      <h3>To save money</h3>
      <h3>to boost your health</h3>
      <h3>to find inner peace...</h3>
    </section>
    <section>
      <h3>and to be in symbiosis with others and the planet.</h3>
    </section>
    <h2>Let us know more about you</h2>
    <p>First, let as usk a few questions so that we can help you better. Share only as much you'd like.</p>
    <div class="buttons">
      <button>Fill the survey</button>
      <button class="secondary">Skip this step</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  font-size: 80px;
}

.onboarding {
  border-radius: 0px;
  padding: 16px;
}

.buttons {
  display: flex;
  justify-content: space-between
}

section {
  height: 60vh;
  border: 1px solid black;
  padding: 36px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
}


button.secondary {
  background: white;
  color: darkgray;
  border: 0;
  font-weight: 400;
}
</style>
