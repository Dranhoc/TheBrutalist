<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import CabinCanvas from "@/components/CabinCanvas.vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";

const magnifierKey = ref(0);
let resizeObserver: ResizeObserver;

onMounted(() => {
  setTimeout(() => {
    const illustrationElement = document.querySelector(".s-work-with__illustration") as HTMLElement;
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
  <section class="s-work-with">
    <div class="s-work-with__illustration">
      <CabinCanvas :key="magnifierKey" />
    </div>
    <div class="s-work-with__stack">
      <h3><GlitchAnimation text="THINGS I ARGUE WITH DAILY." /></h3>
      <ul>
        <li>Vue3</li>
        <li>React</li>
        <li>Caffeine</li>
        <li>Typescript</li>
        <li>VITE</li>
        <li>SCSS/Tailwind</li>
        <li>Supabase, Paracetamol, Laravel</li>
        <li>Git, Figma</li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-work-with {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid var(--text-primary);
  background-color: var(--bg-primary);

  @apply md:flex-row mb-60 sm:pb-80 md:pb-100 lg:pb-160 pt-40;

  &__illustration {
    @apply md:w-[50%];
  }

  &__stack {
    display: flex;
    flex-direction: column;
    // padding: 60px 20px 100px;
    padding: 20px;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    flex-shrink: 0;
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
