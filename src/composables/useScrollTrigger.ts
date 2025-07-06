import { ref, readonly } from "vue";

const sidebarAnimated = ref(false);

export const useScrollTrigger = () => {
  const setSidebarAnimation = (isAnimated: boolean) => {
    sidebarAnimated.value = isAnimated;
  };

  return {
    sidebarAnimated: readonly(sidebarAnimated),
    setSidebarAnimation,
  };
};
