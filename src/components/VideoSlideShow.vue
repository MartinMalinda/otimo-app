<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{ videoSources: string[], maxWidth?: number | string, crop?: boolean, duration?: number }>();

const videos = ref(props.videoSources.map((src) => ({
  src,
  el: undefined as HTMLMediaElement | undefined,
  canPlay: false,
  canPlayPromise: null as null | Promise<boolean>,
  isPlaying: false,
  listeners: {} as Record<string, any>,
})));

const getNextVideo = (video: typeof videos.value[0]) => {
  const nextIndex = videos.value.indexOf(video) + 1;
  return videos.value[nextIndex] || videos.value[0];
};

document.addEventListener('scroll', (event) => {
  console.log(document.scrollingElement?.scrollTop);
  if (document.scrollingElement?.scrollTop === 0) {
  }
});

onMounted(() => {
  videos.value.forEach((video) => {

    // CanPlay functionality
    video.canPlayPromise = new Promise(resolve => {
      video.listeners.canplay = () => {
        video.canPlay = true;
        resolve(true);
      }
      video.el?.addEventListener('canplay', video.listeners.canplay);
    });

    if (videos.value.length > 1) {
      video.el?.addEventListener('ended', () => {
        const nextVideo = getNextVideo(video);
        if (nextVideo.canPlay) {
          setTimeout(() => {
            video.isPlaying = false;
          }, 200)
          nextVideo.el?.play();
        } else {
          video.el?.play();
        }
      });
    } else {
      video.el!.loop = true;
    }

    video.el?.addEventListener('play', () => {
      video.isPlaying = true;
      const nextVideo = getNextVideo(video);
      nextVideo.el!.preload = 'auto';
      videos.value.filter(_video => _video !== video).forEach(video => {
        video.el?.pause();
        video.isPlaying = false;
      });
    });
  });

  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      const firstVid = videos.value[0];
      firstVid.canPlayPromise?.then(() => {
        firstVid.el?.play();
      })
    } else {
      videos.value.forEach((video) => video.el?.pause());
    }
  }, { rootMargin: '200px', threshold: 0.2 });

  observer.observe(videos.value[0].el as HTMLMediaElement);

});

const getVideoPath = (path: string) => {
  const paramsBase = `du_${props.duration || '7'},ac_none,q_auto:good,vc_h264,`;
  let params = `${paramsBase}c_${props.crop ? 'crop' : 'scale'},w_${props.maxWidth || 1650}`;
  if (window.innerWidth < 900 && window.innerHeight > window.innerWidth) {
    params = `${paramsBase}c_crop,g_center,h_1200,w_700`;
  }

  return `https://res.cloudinary.com/serenity-themes/video/upload/${params}/v1675517586/otimo${path}`;
};
</script>
<template>
  <div class="videos">
    <div class="loader"></div>
    <video v-for="video in videos" :class="{ hidden: !video.isPlaying }" :key="video.src" :src="getVideoPath(video.src)"
      muted playsinline :ref="(el: any) => video.el = el" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  background: black;
  opacity: 0.2;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

video {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 0.8;
  transition: 0.4s opacity;

  &.hidden {
    opacity: 0;
  }
}
</style>
