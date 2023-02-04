<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Typewriter from '/~/components/Typewriter.vue';
import VideoSlideShow from '/~/components/VideoSlideShow.vue';

onMounted(() => {
  document.querySelector('html')?.setAttribute('style', 'scroll-snap-type: y mandatory; scroll-snap-stop: always');
});

onUnmounted(() => {
  document.querySelector('html')?.setAttribute('style', '');
});
</script>
<template>
  <div class="onboarding">
    <section>
      <VideoSlideShow :video-sources="['/wide5.mp4', '/wide5.mp4']" />
      <h1>
        <Typewriter text="Welcome, traveller" :delay="500" />
      </h1><br />
      <h2>
        <Typewriter text="Otimo is designed to help you seek new perspectives." :interval="0" :delay="2000" />
      </h2>
    </section>
    <section>
      <VideoSlideShow :video-sources="['/wide4.mp4', '/wide4.mp4']" />
      <h2>
        <Typewriter text="To take harmonious action in your day to day life" :delay="500" :interval="0" />
      </h2>
    </section>
    <section>
      <VideoSlideShow :video-sources="['/wide2.mp4']" />
      <h3>
        <Typewriter text="To save money" :delay="500" />
      </h3><br />
      <h3>
        <Typewriter text="to boost your health" :delay="1500" />
      </h3><br />
      <h3>
        <Typewriter text="to find inner peace..." :delay="2500" />
      </h3><br />
    </section>
    <section>
      <VideoSlideShow :video-sources="[
        '/wide3.mp4',
      ]" />
      <h3>
        <Typewriter text="And to be in symbiosis with others and the planet." :delay="500" />
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
    font-size: 32px;
  }
}

h2 {
  position: relative;
  z-index: 2;
  // background: rgba(0, 0, 0, 0.322);
  padding: 10px;
  display: inline-block;
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
  height: 100vh;
  border: 1px solid black;
  padding: 36px;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: black;
  color: lightgrey;
  text-shadow: 1px 1px black;

  &:nth-child(2) {
    h2 {
      position: absolute;
      right: 20%;
      top: 50%;

    }
  }

  &:nth-child(3) {
    h3:nth-of-type(1) {
      position: relative;
      left: 20px;
    }

    h3:nth-of-type(2) {
      position: relative;
      left: 100px;
    }

    h3:nth-of-type(3) {
      position: relative;
      left: 200px;
    }
  }

  &:nth-child(4) {
    h3 {
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
