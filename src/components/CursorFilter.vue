<template>
  <div>
    <div ref="cursor" :class="['cursor-filter', cursorClass]" :style="cursorStyles"></div>
    <FairyDust v-if="showParticles" :x="cursorX" :y="cursorY" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import type { Ref } from "vue";
import FairyDust from "@/components/FairyDust.vue";

type CursorShape = "circle" | "square" | "star";

interface Props {
  size?: number;
  enlargedSize?: number;
  color?: string;
  blendMode?: "difference" | "exclusion" | "multiply" | "screen" | "overlay";
  shape?: CursorShape;
  transition?: string;
  enlargeOnSelector?: string;
  disabled?: boolean;
  zIndex?: number;
  styleRules?: StyleRule[];
}

interface StyleRule {
  selector: string;
  size?: number;
  color?: string;
  shape?: CursorShape;
  particles?: boolean;
}

const props = withDefaults(defineProps<Props & { section?: string }>(), {
  size: 50,
  enlargedSize: 125,
  color: "white",
  blendMode: "difference",
  shape: "circle",
  transition: "transform 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out, clip-path 0.3s ease-out",
  enlargeOnSelector: "",
  disabled: false,
  zIndex: 9999,
  section: "",
  styleRules: () => [],
});

const cursor: Ref<HTMLElement | null> = ref(null);
const currentSize = ref(props.size);
const cursorColor = ref(props.color);
const cursorShape = ref<CursorShape>(props.shape ?? "circle");
const showParticles = ref(false);
const cleanupEvents: (() => void)[] = [];
const cursorX = ref(0);
const cursorY = ref(0);

const isContact = computed(() => props.section === "s-contact");

watch(isContact, (contact) => {
  document.body.classList.toggle("is-contact", contact);
  console.log("contact is watching us");
});

const cursorClass = computed(() => ({
  "cursor-filter--square": cursorShape.value === "square",
  "cursor-filter--star": cursorShape.value === "star",
  "cursor-filter--disabled": props.disabled,
  "cursor-filter--particles": showParticles.value,
}));

const cursorStyles = computed(() => ({
  "--cursor-size": `${currentSize.value}px`,
  "--cursor-color": cursorColor.value,
  "--cursor-blend-mode": props.blendMode,
  "--cursor-transition": props.transition,
  "--cursor-z-index": props.zIndex,
}));

const updateCursorPosition = (e: MouseEvent): void => {
  if (cursor.value && !props.disabled) {
    cursor.value.style.left = e.clientX + "px";
    cursor.value.style.top = e.clientY + "px";
    cursorX.value = e.clientX;
    cursorY.value = e.clientY;
  }
};

const setupStyleEvents = () => {
  if (props.styleRules.length > 0) {
    props.styleRules.forEach((rule) => {
      const elements = document.querySelectorAll(rule.selector);
      elements.forEach((element) => {
        const onEnter = () => applyStyle(rule);
        const onLeave = resetStyle;

        element.addEventListener("mouseenter", onEnter);
        element.addEventListener("mouseleave", onLeave);

        cleanupEvents.push(() => {
          element.removeEventListener("mouseenter", onEnter);
          element.removeEventListener("mouseleave", onLeave);
        });
      });
    });
  }
};

const removeStyleEvents = () => {
  cleanupEvents.forEach((cleanup) => cleanup());
  cleanupEvents.length = 0;
};

const applyStyle = (rule: StyleRule) => {
  cursorColor.value = rule.color ?? props.color;
  cursorShape.value = rule.shape ?? props.shape;
  showParticles.value = !!rule.particles;
  currentSize.value = rule.size ?? props.enlargedSize;
};

const resetStyle = () => {
  cursorColor.value = props.color;
  cursorShape.value = props.shape;
  showParticles.value = false;
  currentSize.value = props.size;
};

onMounted(() => {
  if (!props.disabled) {
    document.addEventListener("mousemove", updateCursorPosition);
    document.body.style.cursor = "none";

    setTimeout(setupStyleEvents, 100);
  }
});

onUnmounted(() => {
  document.removeEventListener("mousemove", updateCursorPosition);
  document.body.style.cursor = "auto";
  removeStyleEvents();
});

watch(
  () => props.styleRules,
  () => {
    removeStyleEvents();
    setTimeout(setupStyleEvents, 100);
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
  clip-path: polygon(50% 0%, 100% 0, 100% 35%, 100% 63%, 100% 100%, 49% 100%, 0 100%, 0 71%, 0 36%, 0 0);
}

.cursor-filter--square {
  border-radius: 8px;
}

.cursor-filter--disabled {
  display: none;
}

.cursor-filter--star {
  width: var(--cursor-size);
  height: var(--cursor-size);
  background: var(--green-color);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  transition: var(--cursor-transition);
  transform-origin: center center;
  animation: spin 5s linear infinite;
}
</style>
