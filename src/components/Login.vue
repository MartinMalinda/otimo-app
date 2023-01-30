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

let riv: rive.Rive;

const googleAuth = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google'
  });
};

const email = async () => {
  if (emailValue.value?.length) {
    await supabase.auth.signInWithOtp({
      email: emailValue.value
    });
    login(() => successMessage.value = `An email has been sent to ${emailValue.value}.`);
  }
}

const setEmail = (event) => {
  emailValue.value = event.target?.value;
};

const login = (cb: () => {}) => {
  riv.play();
  riv.on(rive.EventType.Stop, () => {
    isHidden.value = true;
    timeout(300).then(cb);
  });
};

onMounted(() => {
  riv = new rive.Rive({
    src: "/tree5.riv",
    canvas: canvasRef.value,
  });
});
</script>

<template>
  <h1 v-if="successMessage" class="success">{{ successMessage }}</h1>
  <div class="box" :class="{ hide: isHidden }">
    <div class="left">
      <h1>Ótimo</h1>
      <h2>Your personal guide towards harmony</h2>
    </div>
    <div class="right">
      <canvas ref="canvasRef" id="canvas" width="300" height="300"></canvas>
      <div v-if="isUsingEmail" class="email-row">
        <input @input="setEmail" autofocus type="email" placeholder="Your email address" />
        <button @click="email" class="button-link">Send link</button>
      </div>
      <a v-else @click="() => isUsingEmail = true" class="button-link">
        <Envelope class="icon" /> Continue with Email
      </a>
      <a @click="() => login(googleAuth)" class="button-link">
        <Google class="icon" /> Continue with Google
      </a>
    </div>
    <!-- <Tree ref="treeRef" class="tree" /> -->
  </div>
</template>

<style scoped>
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
}

h1.success {
  font-size: 40px;
  line-height: 120px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
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
  width: 50%;
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
  color: green;
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
  width: 280px;
  text-align: center;
}

.email-row {
  display: flex;
  width: 280px;
  margin-top: 14px;
}

.email-row button {
  /* display: none; */
  display: inline;
  margin: 0;
}
</style>
