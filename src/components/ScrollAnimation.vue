<template>
  <div ref="elementRef" :class="['scroll-animation-container', { [animationClass]: isAnimated }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

interface Props {
  animationClass: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
  emitIntersection?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  threshold: 0.1,
  once: true,
  emitIntersection: false,
});

const elementRef = ref<HTMLElement | null>(null);
const isAnimated = ref(false);
const hasBeenTriggered = ref(false);
let observer: IntersectionObserver | null = null;
let timeoutId: number | null = null;

const emit = defineEmits<{
  intersection: [isIntersecting: boolean];
}>();

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];

  if (props.emitIntersection) {
    emit("intersection", entry.isIntersecting);
  }

  if (entry.isIntersecting) {
    if (props.once && hasBeenTriggered.value) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      isAnimated.value = true;
      hasBeenTriggered.value = true;
    }, props.delay);
  } else if (!props.once) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    isAnimated.value = false;
  }
};

const createObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(handleIntersection, {
    threshold: props.threshold,
  });

  if (elementRef.value) {
    observer.observe(elementRef.value);
  }
};

onMounted(() => {
  createObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

watch(
  () => props.threshold,
  () => {
    createObserver();
  }
);

watch(
  () => props.once,
  (newOnce) => {
    if (!newOnce) {
      hasBeenTriggered.value = false;
    }
  }
);
</script>

<style scoped>
.scroll-animation-container {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scroll-animation-container.fade-in {
  opacity: 1;
}
</style>
