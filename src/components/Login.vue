<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as rive from "@rive-app/canvas";
import Envelope from '../components/Envelope.vue';
import Google from '../components/Google.vue';
import { supabase } from '/~/data/supabase';

const timeout = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const isHidden = ref(false);
const canvasRef = ref();
const isUsingEmail = ref(false);
const emailValue = ref<string>();
const successMessage = ref();

const videoRef = ref<HTMLMediaElement>();
const videoRef2 = ref<HTMLMediaElement>();
const videoRef3 = ref<HTMLMediaElement>();
const videoRef4 = ref<HTMLMediaElement>();

let riv: rive.Rive;

const prefetch = (url: string) => {
  const link = document.createElement('link');
  link.setAttribute('rel', 'prefetch');
  link.setAttribute('href', url);
  document.head.append(link);
};

const googleAuth = async () => {
  const googlePromise = supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      skipBrowserRedirect: true,
      redirectTo: window.location.href,
    }
  });
  googlePromise.then(({ data }) => {
    if (data.url) {
      prefetch(data.url);
    }
  })
  animate(async () => {
    const { data } = await googlePromise;
    if (data.url) {
      window.location.href = data.url;
    }
  })
};

const email = async () => {
  if (emailValue.value?.length) {
    const promise = supabase.auth.signInWithOtp({
      email: emailValue.value
    });
    animate(async () => {
      await promise;
      successMessage.value = `An email has been sent to ${emailValue.value}.`;
    });
  }
}

const setEmail = (event) => {
  emailValue.value = event.target?.value;
};

const animate = (cb: () => void) => {
  riv.play();
  riv.on(rive.EventType.Stop, () => {
    isHidden.value = true;
    timeout(300).then(cb);
  });
};

const reset = () => {
  successMessage.value = null;
  isHidden.value = false;
  isUsingEmail.value = false;
  emailValue.value = undefined;
  riv.unsubscribeAll();
  riv.reset();
};

onMounted(() => {
  riv = new rive.Rive({
    src: "/tree5.riv",
    canvas: canvasRef.value,
  });

  // videoRef.value.play();
  let canPlayNext = false;
  videoRef2.value?.addEventListener('canplay', () => {
    canPlayNext = true;
    console.log('canplay');
  });

  videoRef.value!.playbackRate = 2;
  videoRef.value?.addEventListener('ended', () => {
    console.log('ended');
    if (!canPlayNext) {
      videoRef.value?.play();
    } else {
      videoRef.value?.classList.add('hidden');
      videoRef2.value?.play();
      videoRef2.value?.classList.remove('hidden');
    }
  });
});
</script>

<template>
  <div v-if="successMessage" class="success">
    <h1>
      {{ successMessage }}
    </h1>
    <button @click="reset" class="plain">Back to login screen</button>
  </div>
  <div class="box" :class="{ hide: isHidden }">
    <div class="left">
      <video ref="videoRef" autoplay="true" muted src="/vid4.mp4" />
      <video ref="videoRef2" preload="auto" muted src="/vid3.mp4" loop class="hidden" />
      <video ref="videoRef3" muted src="/vid1.mp4" loop class="hidden" />
      <video ref="videoRef4" muted src="/vid2.mp4" loop class="hidden" />
      <h1>Ótimo</h1>
      <h2>Your personal guide towards harmony</h2>
    </div>
    <div class="right">
      <canvas ref="canvasRef" id="canvas" width="300" height="300"></canvas>
      <div v-if="isUsingEmail" class="email-row">
        <input @input="setEmail" autofocus type="email" placeholder="Your email address" />
        <button @click="email" class="button-link">Send&nbsp;link</button>
      </div>
      <a v-else @click="() => isUsingEmail = true" class="button-link">
        <Envelope class="icon" /> Continue with Email
      </a>
      <a @click="googleAuth" class="button-link">
        <Google class="icon" /> Continue with Google
      </a>
    </div>
    <!-- <Tree ref="treeRef" class="tree" /> -->
  </div>
</template>

<style lang="scss" scoped>
canvas {
  margin-bottom: -28px;
}

nav {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 150px;
  margin-bottom: 50px;
  z-index: 2;
  position: relative;
  text-shadow: 1px 1px black;
}

h2 {
  position: relative;
  z-index: 2;
  text-shadow: 1px 1px black;
}

.left {
  position: relative;
}

video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 1;
  transition: 0.3s opacity;

  &.hidden {
    opacity: 0;
  }
}

.success {
  line-height: 120px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: inline-block;
  padding: 100px;
  top: 50%;
  transform: translateY(-50%);

  h1 {
    font-size: 40px;
    margin-bottom: 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.259);
  }

  button.plain {
    border: 0;
    background: white;
    color: grey;
    font-weight: 400;
  }
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  height: 100vh;
}

.left {
  background: var(--green);
  color: white;
  border-right: 1px solid black;
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: 0.5s width, 0.5s transform;
}

.box.hide .left {
  /* width: 0%; */
  transform: translateX(-100%);
}

.box.hide .right {
  opacity: 0;
}

.right {
  width: 50%;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: center;
  transition: 0.5s opacity;
  transition-delay: 0.2s;
}

.button-link {
  border: 2px solid var(--green);
  color: var(--green);
  background: white;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  width: 280px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  border-radius: 3px;
}

.button-link:active {
  transform: translate(0px, 1px);
}

.icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 8px;
}

input {
  width: 165px;
  margin-right: -1px;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-grow: 0;
  flex-shrink: 1;
}

.email-row {
  display: flex;
  justify-content: center;
  width: 260px;
  margin-top: 12px;
}

.email-row button {
  /* display: none; */
  display: inline;
  margin: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
