import { useTask, timeout } from 'vue-concurrency';
import { useEventListener } from './event';
import { onMounted } from 'vue';


export function useWindowResizeListener(cb: () => void) {
  const task = useTask(function* () {
    yield timeout(30);
    cb();
  }).keepLatest();

  useEventListener(() => window, 'resize', task.perform);
}

export function useViewportHeight() {
  const setCssVariable = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(document.documentElement.style.getPropertyValue('--vh'));
  };

  setCssVariable();
  setTimeout(setCssVariable, 0);
  setTimeout(setCssVariable, 100);
  onMounted(setCssVariable);
  useWindowResizeListener(setCssVariable);
}
