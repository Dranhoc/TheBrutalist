import { ref, onMounted, onBeforeUnmount } from "vue";

export const useDetectMouse = () => {
  const hasMouseSupport = ref(false);

  let mouseMoveHandler: (() => void) | null = null;
  let mouseEnterHandler: (() => void) | null = null;
  let timeoutId: number | null = null;

  const detectMouseSupport = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

      if (mediaQuery.matches) {
        hasMouseSupport.value = true;
        return;
      }

      const handleMediaChange = (e: MediaQueryListEvent) => {
        hasMouseSupport.value = e.matches;
      };

      mediaQuery.addEventListener("change", handleMediaChange);

      onBeforeUnmount(() => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      });
    }

    if (typeof window !== "undefined" && !hasMouseSupport.value) {
      mouseMoveHandler = () => {
        hasMouseSupport.value = true;
        cleanup();
      };

      mouseEnterHandler = () => {
        hasMouseSupport.value = true;
        cleanup();
      };

      window.addEventListener("mousemove", mouseMoveHandler, { once: true });
      window.addEventListener("mouseenter", mouseEnterHandler, { once: true });

      timeoutId = window.setTimeout(() => {
        cleanup();
      }, 3000);
    }
  };

  const cleanup = () => {
    if (typeof window !== "undefined") {
      if (mouseMoveHandler) {
        window.removeEventListener("mousemove", mouseMoveHandler);
        mouseMoveHandler = null;
      }

      if (mouseEnterHandler) {
        window.removeEventListener("mouseenter", mouseEnterHandler);
        mouseEnterHandler = null;
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  };

  onMounted(() => {
    detectMouseSupport();
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    hasMouseSupport,
    detectMouseSupport,
  };
};
