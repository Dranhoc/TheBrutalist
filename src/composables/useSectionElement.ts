import { ref, defineExpose } from "vue";

export function useSectionElement() {
  const sectionRef = ref<HTMLElement | null>(null);

  defineExpose({
    sectionRef,
  });

  return sectionRef;
}
