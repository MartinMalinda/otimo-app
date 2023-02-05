import { onBeforeUnmount, onMounted } from "vue";

export function useEventListener(
  getTarget: () => Element | Window | Document,
  type: string,
  cb,
) {
  onMounted(() => {
    const target = getTarget();
    if (!target) {
      throw new Error(`Failed to set listener ${type}, element not found`);
    }

    target.addEventListener(type, cb);
  });

  onBeforeUnmount(() => {
    const target = getTarget();
    if (!target) {
      console.error(`Failed to remove ${type}, element not found`);
      return;
    }

    target.removeEventListener(type, cb);
  });
}
