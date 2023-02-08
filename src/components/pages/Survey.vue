<script setup lang="ts">
import Container from '/~/components/layout/Container.vue';

</script>
<template>
  <Container class="survey">
    <header>
      <h1>We're curious to know more</h1>
      <p>Share only as much you'd like, all of the questions are optional.<br />We can use these to customize your Otimo
        experience.</p>
    </header>
    <section>
      <h2>Where do you currently reside?</h2>
      <div class="options">
        <button class="survey-button">
          <span class="emoji">🏙</span> Megalopolis
        </button>
        <button class="survey-button">
          <div class="emoji">🌆</div> City
        </button>
        <button class="survey-button">
          <div class="emoji">🏘</div> Rural area
        </button>
        <button class="survey-button">
          <div class="emoji">🏜</div> Off the grid
        </button>
      </div>
    </section>
    <section>
      <h2>What is the climate within your area?</h2>
      <div class="options">
        <button class="survey-button">
          <span class="emoji">🌴</span> Tropical
        </button>
        <button class="survey-button">
          <div class="emoji">☀️</div> Temperate
        </button>
        <button class="survey-button">
          <div class="emoji">⛅</div> Moderate
        </button>
        <button class="survey-button">
          <div class="emoji">🌨</div> Sub arctic
        </button>
        <button class="survey-button">
          <div class="emoji">❄️</div> Arctic
        </button>
      </div>
    </section>
    <section>
      <h2>Your housing situation</h2>
      <div class="options">
        <button class="survey-button">
          <div class="emoji">👥</div> Flatsharing
        </button>
        <button class="survey-button">
          <div class="emoji">🏨</div> Flat renting
        </button>
        <button class="survey-button">
          <div class="emoji">🏢</div> Flat owner
        </button>
        <button class="survey-button">
          <div class="emoji">🏠</div> House renting
        </button>
        <button class="survey-button">
          <div class="emoji">🏡</div> House owner
        </button>
      </div>
    </section>
    <section>
      <h2>Which of these do you own? (or have reliably available)</h2>
      <div class="options">
        <button class="survey-button">
          <div class="emoji">🚲</div> Bicycle
        </button>
        <button class="survey-button">
          <div class="emoji">🛵</div> Motorbike / scooter
        </button>
        <button class="survey-button">
          <div class="emoji">🚘</div> Car
        </button>
        <button class="survey-button">
          <div class="emoji">🚚</div> Van
        </button>
      </div>
    </section>
  </Container>
</template>
<style lang="scss" scoped>
@keyframes clear {
  0% {
    filter: blur(5px)
  }

  100% {
    filter: blur(0px)
  }
}

.survey {
  margin: 60px auto !important;
  padding: 0;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.2);

  header {
    padding: 32px 32px 0 32px;
  }

  h1 {
    font-size: 3rem;
    line-height: 1em;
  }

  hr {
    display: block;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .options {
    display: flex;
    gap: 8px;
  }

  section {
    margin-top: 32px;
    padding: 32px;
    filter: blur(5px);
    animation: 0.5s clear forwards;
    animation-delay: 1s;

    &:nth-child(even) {
      background: rgba(211, 211, 211, 0.18);
    }
  }

  .survey-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 120px;
    width: 120px;
    background: white;
    color: black;

    .emoji {
      font-size: 50px;
    }
  }
}
</style>
