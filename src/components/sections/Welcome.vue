<script setup lang="ts">
import { ref } from "vue";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
import GlitchAnimation from "@/components/GlitchAnimation.vue";

const sectionRef = ref<HTMLElement | null>(null);
</script>

<template>
  <section class="s-hi" id="home" ref="sectionRef">
    <div class="s-hi__content">
      <h1>
        HI. I'M A CREATIVE
        <GlitchAnimation text="FRONT-END" />
        DEVELOPER.
      </h1>
      <figure class="s-hi__me">
        <div class="s-hi__text whitespace-pre-line">JUST IN TIME. {{ "\n" }}I WAS WAITING{{ "\n" }}FOR YOU!</div>
        <img class="w-full h-full object-cover me-top" :srcset="meTop" alt="my photo" />
        <img class="w-full h-full object-cover me-bottom" :srcset="meBottom" alt="my photo" />
      </figure>
    </div>
  </section>
</template>

<style lang="scss">
.s-hi {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8vh);
  background-color: var(--bg-body);
  width: 100%;
  z-index: 1;

  &__content {
    position: relative;
    height: calc(100vh - 8vh);
    @apply p-20 md:p-40;
  }

  .me-top {
    position: relative;
    animation: openMouth 1s forwards 2.5s;
  }
  .me-bottom {
  }

  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    opacity: 0;
    animation: translateFromBottompx 0.5s forwards 1.3s;
    left: -20px;
    bottom: 0px;
    @apply w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%];

    img {
      height: 100%;
      width: auto;
      object-fit: cover;
      z-index: 2;
    }
  }

  &__text {
    position: absolute;
    top: 0px;
    transform: translate(90%, -20%);
    opacity: 0;
    line-height: 1;
    background-color: rgba(0, 0, 0, 0.9);
    color: var(--text-secondary);
    padding: 1.5vw;
    animation: translateFromMouth 0.5s forwards 2.5s;
    z-index: 1;
    @apply text-neg-5-16 md:text-neg-5-24 4xl:p-30;
  }
}
</style>
