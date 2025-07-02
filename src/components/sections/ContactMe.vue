<script setup lang="ts">
import VueSVG from "@/components/VueSVG.vue";
import MagnifierCanvasSquare from "@/components/MagnifierCanvasSquareTwo.vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
</script>

<template>
  <section class="s-work-with">
    <div class="s-work-with__illustration">
      <MagnifierCanvasSquare />
    </div>
    <div class="s-work-with__stack">
      <h3 class="title-2"><GlitchAnimation text="THINGS I ARGUE WITH DAILY" /></h3>
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
  @apply md:flex-row;

  &__stack {
    display: flex;
    flex-direction: column;
    padding: 60px 20px 100px;
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
        font-family: "JetBrains Mono", serif;
        font-size: 16px;
        padding-left: 10px;
        @apply lg:text-[1.5vw];
      }
    }
  }
}
</style>
