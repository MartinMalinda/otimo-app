<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as rive from "@rive-app/canvas";
import Envelope from './components/Envelope.vue';
import Google from './components/Google.vue';

const timeout = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const canvasRef = ref();
const isHidden = ref(false);
const isLoggingIn = ref(!!(window as any).authPromise);
const loggedIn = ref(!!localStorage.getItem('token'));
if (isLoggingIn.value) {
  (window as any).authPromise.then(() => {
    isLoggingIn.value = false;
    loggedIn.value = !!localStorage.getItem('token');
  });
}

let riv: rive.Rive;

const googleAuth = async () => {
  const initUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:-JtYy9Ru/oauth/google/init');
  initUrl.searchParams.set('redirect_uri', 'http://localhost:5173');
  const response = await fetch(initUrl);
  const json = await response.json();
  const { authUrl } = json;
  window.location.href = authUrl;
};

const grow = () => {
  riv.play();
  riv.on(rive.EventType.Stop, () => {
    console.log('stop');
    isHidden.value = true;
    timeout(300).then(() => {
      googleAuth();
    });
  });
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

onMounted(() => {
  riv = new rive.Rive({
    src: "/tree5.riv",
    canvas: canvasRef.value,
  });
});
</script>

<template>
  <div v-if="isLoggingIn"> Logging in</div>
  <div v-else-if="loggedIn">
    <nav>
      <p>Logged in</p>
      <button @click="logout">Log out</button>
    </nav>
  </div>
  <div v-else class="box" :class="{ hide: isHidden }">
    <div class="left">
      <h1>Ótimo</h1>
      <h2>Your personal guide towards harmony</h2>
    </div>
    <div class="right">
      <canvas ref="canvasRef" id="canvas" width="300" height="300"></canvas>
      <a @click="grow" class="button-link">
        <Envelope class="icon" /> Continue with Email
      </a>
      <a @click="grow" class="button-link">
        <Google class="icon" /> Continue with Google
      </a>
    </div>
    <!-- <Tree ref="treeRef" class="tree" /> -->
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 150px;
  margin-bottom: 50px;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  height: 100vh;
}

.left {
  background: #004e00;
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
  border: 2px solid #004e00;
  color: green;
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

.button-link:first-of-type {
  margin-top: -17px;
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
</style>
