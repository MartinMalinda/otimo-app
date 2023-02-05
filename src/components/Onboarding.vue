<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Typewriter from '/~/components/Typewriter.vue';
import VideoSlideShow from '/~/components/VideoSlideShow.vue';
import { supabase } from '/~/data/supabase';
import ScrollPrompt from '/~/components/ScrollPrompt.vue';

const user = ref();
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user?.user_metadata;
});

onMounted(() => {
  document.querySelector('html')?.setAttribute('style', 'scroll-snap-type: y mandatory; scroll-snap-stop: always');
});

onUnmounted(() => {
  document.querySelector('html')?.setAttribute('style', '');
});
</script>
<template>
  <div v-if="user" class="onboarding">
    <section>
      <VideoSlideShow :video-sources="['/wide5.mp4', '/wide5.mp4']" />
      <h1>
        <Typewriter :text="`Welcome, ${user?.name ? user.name.split(' ')[0] : 'traveller'}`" :interval="100"
          :delay="500" />
      </h1><br />
      <h2>
        <Typewriter text="Otimo is designed to help you seek new perspectives." :interval="50" :delay="2000" />
      </h2>
      <ScrollPrompt class="onboarding-scroll-prompt" />
    </section>
    <section>
      <VideoSlideShow :video-sources="['/wide4.mp4', '/wide4.mp4']" />
      <h2>
        <Typewriter text="To take harmonious action in your day to day life" :delay="500" :interval="100" />
      </h2>
    </section>
    <section>
      <VideoSlideShow :video-sources="['/wide2.mp4']" />
      <h3>
        <Typewriter text="To save money, " :interval="100" :delay="500" />
      </h3>
      <h3>
        <Typewriter text="to boost your health, " :interval="100" :delay="1500" />
      </h3>
      <h3>
        <Typewriter text="to find inner peace..." :interval="100" :delay="2500" />
      </h3>
    </section>
    <section>
      <VideoSlideShow :video-sources="[
        '/wide3.mp4',
      ]" />
      <h3>
        <Typewriter text="And to be in symbiosis with others and the planet." :interval="100" :delay="500" />
      </h3>
    </section>
    <section>
      <h2>Let us know more about you</h2>
      <p>First, let as usk a few questions so that we can help you better. Share only as much you'd like.</p>
      <div class="buttons">
        <button>Fill the survey</button>
        <button class="secondary">Skip this step</button>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  font-size: 80px;
  position: relative;
  z-index: 2;
  // background: rgba(0, 0, 0, 0.284);
  line-height: 1.2em;
  display: inline-block;
  width: auto;

  @media (max-width: 700px) {
    font-size: 25px;
  }
}

.onboarding-scroll-prompt {
  position: absolute;
  bottom: calc(env(safe-area-inset-bottom) + 10px);
  left: calc(50% + 10px);
  transform: translateX(-50%);
  height: 100px;
  width: 32px;
  opacity: 0;
  animation: 0.3s fadeIn forwards;
  animation-delay: 3.5s;
}

h2 {
  position: relative;
  z-index: 2;
  // background: rgba(0, 0, 0, 0.322);
  display: inline-block;

  @media (max-width: 700px) {
    font-size: 20px;
  }
}

h3 {
  position: relative;
  z-index: 3;
  // background: rgba(0, 0, 0, 0.322);
  display: inline-block;
  padding: 10px;
}

.onboarding {
  border-radius: 0px;
  scroll-snap-type: y mandatory;
}

.buttons {
  display: flex;
  justify-content: space-between
}

section {
  content-visibility: auto;

  height: calc(100vh - env(safe-area-inset-bottom));
  padding: 36px;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: black;
  color: lightgrey;
  text-shadow: 1px 1px black;

  &:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      margin-bottom: 0;
    }
  }

  &:nth-child(2) {
    h2 {
      position: absolute;
      right: 20%;
      top: 50%;

      @media (max-width: 800px) {
        left: 50%;
        width: 80%;
        transform: translate(-50%, -50%);
      }
    }

    @media (max-width: 800px) {
      :deep(video) {
        object-position: left;
      }
    }
  }

  &:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      margin: 0;
      padding: 0;
    }

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  &:nth-child(4) {
    h3 {
      min-width: 320px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}


button.secondary {
  background: white;
  color: darkgray;
  border: 0;
  font-weight: 400;
}
</style>
