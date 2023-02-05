import { useTask, timeout } from 'vue-concurrency';
import { useEventListener } from './event';


export function useWindowResizeListener(cb: () => void) {
  const task = useTask(function* () {
    yield timeout(30);
    cb();
  }).restartable();

  useEventListener(() => window, 'resize', task.perform);
}

export function useViewportHeight() {
  const initialWindowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  const setCssVariable = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(document.documentElement.style.getPropertyValue('--vh'));
  };

  setCssVariable();
  const onHeightChange = () => {
    // Only set new windowHeight if also width changes (whole window resize, orientation change)
    // not when only height is reduced = android topbar disappearing, mobile keyboard appearing
    if (window.innerWidth !== initialWindowWidth) {
      windowHeight = window.innerHeight;
      setCssVariable();
    }

    // sometimes orientation change happens in two steps, first width is changed, then height is changed
    // so detect big change in height (30% or more) => update css variabler
    else if (
      windowHeight / window.innerHeight > 1.2 ||
      windowHeight / window.innerHeight < 0.8
    ) {
      windowHeight = window.innerHeight;
      setCssVariable();
    }
  };

  useWindowResizeListener(onHeightChange);
}
