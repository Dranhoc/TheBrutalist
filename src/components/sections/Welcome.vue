<script setup lang="ts">
import { ref, onMounted } from "vue";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
import GlitchAnimation from "@/components/GlitchAnimation.vue";

const sectionRef = ref<HTMLElement | null>(null);
const displayedText = ref("");
const showCursor = ref(true);

const fullText = "JUST IN TIME.\nI WAS WAITING\nFOR YOU!";

onMounted(() => {
  setTimeout(() => {
    startTypewriter();
  }, 2500);
});

function startTypewriter() {
  let currentIndex = 0;
  const typingSpeed = 40;

  const typeInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      displayedText.value = fullText.slice(0, currentIndex + 1);
      currentIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        showCursor.value = false;
      }, 1000);
    }
  }, typingSpeed);
}
</script>

<template>
  <section class="s-hi" id="home" ref="sectionRef">
    <div class="s-hi__content">
      <h1>
        <GlitchAnimation text="HI. I'M A CREATIVE" />
        <GlitchAnimation text="FRONT-END" />
        <GlitchAnimation text="DEVELOPER." />
      </h1>
      <figure class="s-hi__me">
        <div class="s-hi__text whitespace-pre-line">{{ displayedText }}</div>
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
  height: calc(100dvh - 8dvh);
  background-color: var(--bg-body);
  width: 100%;
  z-index: 1;

  &__content {
    position: relative;
    height: calc(100vh - 8vh);
    height: calc(100dvh - 8dvh);
    @apply p-20 md:p-40;
  }

  .me-top {
    position: relative;
    animation: openMouth 0.8s forwards 2.5s;
    animation-iteration-count: 2;
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
    right: 0px;
    transform: translate(100%, 50%);
    opacity: 1;
    line-height: 1;

    color: var(--text-primary);

    z-index: 1;
    border-radius: 50%;
    @apply text-neg-5-16 md:text-neg-5-24 4xl:p-30 2xl:right-50;
  }
}
</style>
