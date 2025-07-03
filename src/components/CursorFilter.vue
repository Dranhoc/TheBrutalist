<template>
  <div ref="cursor" :class="['cursor-filter', cursorClass]" :style="cursorStyles"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import type { Ref } from "vue";

interface EnlargeRule {
  selector: string;
  size: number;
}

interface Props {
  size?: number;
  enlargedSize?: number;
  enlargeRules?: EnlargeRule[];
  color?: string;
  blendMode?: "difference" | "exclusion" | "multiply" | "screen" | "overlay";
  shape?: "circle" | "square";
  transition?: string;
  enlargeOnSelector?: string;
  disabled?: boolean;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 50,
  enlargedSize: 125,
  enlargeRules: () => [],
  color: "white",
  blendMode: "difference",
  shape: "circle",
  transition: "transform 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out",
  enlargeOnSelector: "",
  disabled: false,
  zIndex: 9999,
});

const cursor: Ref<HTMLElement | null> = ref(null);
const currentSize = ref(props.size);

const cursorClass = computed(() => ({
  "cursor-filter--square": props.shape === "square",
  "cursor-filter--disabled": props.disabled,
}));

const cursorStyles = computed(() => ({
  "--cursor-size": `${currentSize.value}px`,
  "--cursor-color": props.color,
  "--cursor-blend-mode": props.blendMode,
  "--cursor-transition": props.transition,
  "--cursor-z-index": props.zIndex,
}));

const updateCursorPosition = (e: MouseEvent): void => {
  if (cursor.value && !props.disabled) {
    cursor.value.style.left = e.clientX + "px";
    cursor.value.style.top = e.clientY + "px";
  }
};

const enlargeCursor = (size?: number): void => {
  if (!props.disabled) {
    currentSize.value = size || props.enlargedSize;
  }
};

const shrinkCursor = (): void => {
  if (!props.disabled) {
    currentSize.value = props.size;
  }
};

const createEnlargeHandler = (size: number) => () => enlargeCursor(size);

const setupEnlargeEvents = () => {
  if (props.enlargeRules.length > 0) {
    props.enlargeRules.forEach((rule) => {
      const elements = document.querySelectorAll(rule.selector);
      const handler = createEnlargeHandler(rule.size);
      elements.forEach((element) => {
        element.addEventListener("mouseenter", handler);
        element.addEventListener("mouseleave", shrinkCursor);
      });
    });
  }

  if (props.enlargeOnSelector) {
    const elements = document.querySelectorAll(props.enlargeOnSelector);
    elements.forEach((element) => {
      element.addEventListener("mouseenter", () => enlargeCursor());
      element.addEventListener("mouseleave", shrinkCursor);
    });
  }
};

const removeEnlargeEvents = () => {
  if (props.enlargeRules.length > 0) {
    props.enlargeRules.forEach((rule) => {
      const elements = document.querySelectorAll(rule.selector);
      const handler = createEnlargeHandler(rule.size);
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", handler);
        element.removeEventListener("mouseleave", shrinkCursor);
      });
    });
  }

  if (props.enlargeOnSelector) {
    const elements = document.querySelectorAll(props.enlargeOnSelector);
    elements.forEach((element) => {
      element.removeEventListener("mouseenter", () => enlargeCursor());
      element.removeEventListener("mouseleave", shrinkCursor);
    });
  }
};

onMounted(() => {
  if (!props.disabled) {
    document.addEventListener("mousemove", updateCursorPosition);
    document.body.style.cursor = "none";

    setTimeout(setupEnlargeEvents, 100);
  }
});

onUnmounted(() => {
  document.removeEventListener("mousemove", updateCursorPosition);
  document.body.style.cursor = "auto";
  removeEnlargeEvents();
});

watch(
  () => [props.enlargeOnSelector, props.enlargeRules],
  () => {
    removeEnlargeEvents();
    setTimeout(setupEnlargeEvents, 100);
  },
  { deep: true }
);

watch(
  () => props.disabled,
  (newDisabled) => {
    if (newDisabled) {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", updateCursorPosition);
    } else {
      document.body.style.cursor = "none";
      document.addEventListener("mousemove", updateCursorPosition);
    }
  }
);
</script>

<style scoped>
.cursor-filter {
  position: fixed;
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-radius: 50%;
  pointer-events: none;
  z-index: var(--cursor-z-index);
  top: 0;
  left: 0;
  background: var(--cursor-color);
  mix-blend-mode: var(--cursor-blend-mode);
  transition: var(--cursor-transition);
  transform: translate(-50%, -50%);
}

.cursor-filter--square {
  border-radius: 8px;
}

.cursor-filter--disabled {
  display: none;
}
</style>
