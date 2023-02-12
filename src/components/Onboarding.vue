<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Typewriter from '/~/components/Typewriter.vue';
import VideoSlideShow from '/~/components/VideoSlideShow.vue';
import { supabase } from '/~/data/supabase';
import ScrollPrompt from '/~/components/ScrollPrompt.vue';
import Form from '/~/components/icons/Form.vue';
import Square from '/~/components/icons/Square.vue';
import Responsive from '/~/components/Responsive.vue';
import { useRouter } from 'vue-router';
import { timeout } from 'vue-concurrency';

const user = ref();
const hidden = ref(false);
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user?.user_metadata;
});

const router = useRouter();

const transitionToSurvey = async () => {
  hidden.value = true;
  await timeout(500);
  document.scrollingElement!.scrollTop = 0;
  router.push({ name: 'Survey' });
};

onMounted(() => {
  document.querySelector('html')?.setAttribute('style', 'scroll-snap-type: y mandatory; scroll-snap-stop: always');
});

onUnmounted(() => {
  document.querySelector('html')?.setAttribute('style', '');
});
</script>
<template>
  <div v-if="user" class="onboarding" :class="{ hidden }">
    <section>
      <VideoSlideShow :duration="12" :video-sources="['/wide5.mp4', '/wide5.mp4']" />
      <h1>
        <Typewriter :text="`Welcome, ${user?.name ? user.name.split(' ')[0] : 'traveller'}`" :interval="100"
          :delay="500" />
      </h1><br />
      <h2>
        <Typewriter text="Otimo is designed to help you seek new perspectives." :interval="50" :delay="2000" />
      </h2>
      <ScrollPrompt class="onboarding-scroll-prompt" />
      <Square :animate="true" />
    </section>
    <section>
      <VideoSlideShow :video-sources="['/wide4.mp4', '/wide4.mp4']" />
      <h2>
        <Typewriter text="To take harmonious action in your day to day life" :delay="500" :interval="100" />
      </h2>
      <Square :animate="true" />
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
      <Square :animate="true" />
    </section>
    <section>
      <VideoSlideShow :video-sources="[
        '/wide3.mp4',
        '/wide3.mp4',
      ]" />
      <h3>
        <Typewriter text="And to be in symbiosis with others and the planet." :interval="100" :delay="500" />
      </h3>
      <Square :animate="true" />
    </section>
    <Responsive tagName="section" class="cta">
      <div class="form-icon">
        <Form />
      </div>
      <h2>
        <Typewriter text="Ready to get started?" :delay="300" />
      </h2>
      <p>
        <Typewriter text="Let us know more about you. Share only as much you'd like." :delay="700" />
      </p>
      <div class="buttons">
        <button @click="transitionToSurvey">
          <Typewriter text="Fill the survey" :delay="1200" />
        </button>
      </div>
      <footer>
        <div class="left">
          Otimo s.r.o. is a registered company in Czech Republic.
        </div>
        <div class="right">
          <a>About us</a>&nbsp;
          <a>Instagram</a>
        </div>
      </footer>
    </Responsive>
  </div>
</template>
<style lang="scss" scoped>
.onboarding {
  border-radius: 0px;
  scroll-snap-type: y mandatory;
  opacity: 1;
  transition: 0.5s opacity;

  &.hidden {
    opacity: 0;
  }
}

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
  bottom: 0;
  left: calc(50%);
  transform: translateX(-50%);
  height: 100px;
  opacity: 0;
  animation: 1s fadeIn forwards;
  animation-delay: 3.5s;

  @media (max-width: 600px) {
    bottom: 40px;
  }
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

.buttons {
  display: flex;
  justify-content: space-between;
  opacity: 0;
  animation: 0.5s fadeIn forwards;
  animation-delay: 1s;
}

section,
.cta {
  height: calc(var(--vh) * 100);
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

section.cta {
  background: white;
  text-shadow: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    margin-bottom: 36px;
  }

  :deep(.word) {
    background: none;
  }

  .form-icon {
    transform: translateX(8px);
    width: 100px;
    margin-bottom: 16px;
  }

  button {
    background: var(--green);
    color: white;
    padding: 16px 20px;
    border: 0;
  }

  footer {
    // border-top: 1px solid lightgrey;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
    padding: 16px;
    color: rgb(74, 71, 71);
    font-size: 13px;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
}
</style>
