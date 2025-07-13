<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import CabinCanvas from "@/components/CabinCanvas.vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";

const magnifierKey = ref(0);
let resizeObserver: ResizeObserver;

onMounted(() => {
  setTimeout(() => {
    const illustrationElement = document.querySelector(".s-stack__illustration") as HTMLElement;
    if (illustrationElement) {
      let oldWidth = illustrationElement.getBoundingClientRect().width;
      let oldHeight = illustrationElement.getBoundingClientRect().height;

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            const widthChange = Math.abs(width - oldWidth) / oldWidth;
            const heightChange = Math.abs(height - oldHeight) / oldHeight;

            if (widthChange > 0.15 || heightChange > 0.15) {
              magnifierKey.value++;
              oldWidth = width;
              oldHeight = height;
            }
          }
        }
      });
      resizeObserver.observe(illustrationElement);
    }
  }, 500);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <section class="s-stack">
    <div class="s-stack__content">
      <div class="s-stack__stack">
        <h3><GlitchAnimation text="THINGS I ARGUE WITH DAILY." /></h3>
        <ul>
          <li>HTML/CSS</li>
          <li>Vue3, React</li>
          <li>Caffeine</li>
          <li>SCSS/TailwindCSS</li>
          <li>Javascript</li>
          <li>Typescript</li>
          <li>VITE</li>
          <li>Supabase, Laravel</li>
          <li>Paracetamol</li>
          <li>Git/Github</li>
          <li>Figma</li>
        </ul>
      </div>
      <div class="s-stack__illustration">
        <CabinCanvas :key="magnifierKey" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-stack {
  position: relative;
  background-color: var(--bg-primary);
  z-index: 1;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: calc(100vh - 8vh);
    min-height: calc(100dvh - 8dvh);
    gap: 40px;
    background-color: var(--bg-primary);
    z-index: 1;
    @apply md:flex-row px-20 pb-60 md:p-40;
    @screen 4xl {
      min-height: unset;
      height: calc(100vh - 8vh);
      height: calc(100dvh - 8dvh);
      max-height: 1200px;
    }
  }

  &__illustration {
    display: flex;
    justify-content: center;
    @apply md:w-[50%];
  }

  &__stack {
    display: flex;
    flex-direction: column;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    flex-shrink: 0;
    width: 100%;
    @apply md:w-[50%];
    ul {
      margin-top: 20px;
      list-style-type: disc;
      padding-left: 30px;
      @apply md:mt-40;
      li {
        padding-left: 10px;
      }
    }
  }
}
</style>
