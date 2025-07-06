<script setup lang="ts">
import { onMounted } from "vue";
import VueSVG from "@/components/VueSVG.vue";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
import ScrollAnimation from "@/components/ScrollAnimation.vue";

onMounted(() => {
  const video = document.querySelector<HTMLVideoElement>(".s-hello__video");
  if (video) {
    video.playbackRate = 0.4;
  }
});
</script>

<template>
  <section class="s-hello">
    <video class="s-hello__video" autoplay loop muted playsinline aria-hidden="true">
      <source src="/storm.mp4" type="video/mp4" />
    </video>
    <figure class="s-hello__me">
      <ScrollAnimation animation-class="left-spiral" :delay="0" :threshold="0" :once="true">
        <div><VueSVG src="/svg/spiral-left.svg" /></div>
      </ScrollAnimation>
      <ScrollAnimation animation-class="right-spiral" :delay="0" :threshold="0" :once="true">
        <div><VueSVG src="/svg/spiral.svg" /></div>
      </ScrollAnimation>
      <ScrollAnimation animation-class="fade-in" :delay="0" :threshold="0.3" :once="true">
        <div class="s-hello__text whitespace-pre-line">TRUST&nbsp;ME,{{ "\n" }}CONTACT&nbsp;ME,{{ "\n" }}YOU&nbsp;WON'T{{ "\n" }}REGRET&nbsp;IT!</div>
      </ScrollAnimation>
      <ScrollAnimation animation-class="animate-from-bottom" :delay="0" :threshold="0" :once="true">
        <img class="w-full h-full object-cover me-top" :srcset="meTop" alt="my photo" />
        <img class="w-full h-full object-cover me-bottom" :srcset="meBottom" alt="my photo" />
      </ScrollAnimation>
    </figure>
  </section>
</template>

<style scoped lang="scss">
.s-hello {
  position: relative;
  display: flex;
  background-color: var(--bg-primary);
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
    opacity: 1;
    z-index: 1;
    @screen md {
      padding-inline: 10px;
    }
  }

  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    left: 0;
    bottom: 0;
    @apply w-[50%] md:w-[40%];

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
    left: calc(50vw - 40px);
    line-height: 1;
    background-color: var(--text-secondary);
    color: var(--text-primary);
    padding-inline: 1.5vw;
    padding-block: 2vw;
    z-index: 2;
    @apply text-neg-5-20 md:text-neg-5-36 md:left-[calc(100%-40px)] 4xl:p-40;
  }
  .left-spiral,
  .right-spiral {
    position: absolute;
    z-index: 4;

    transform-origin: center;
  }

  .left-spiral {
    top: 37%;
    left: 38%;
    transform: scale(0);
    animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-sm 4s infinite linear;
    animation-delay: 2s, 2.5s;

    @media (min-width: 768px) {
      top: 39%;
      left: 39%;
      animation: fadeInSpiral-md 0.5s ease forwards, spinAndPulse-md 4s infinite linear;
      animation-delay: 2s, 2.5s;
    }
  }

  .right-spiral {
    top: 37%;
    left: 56%;
    transform: scale(0);
    animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-sm 4s infinite linear reverse;
    animation-delay: 2s, 2.5s;

    @media (min-width: 768px) {
      top: 39%;
      left: 58%;
      animation: fadeInSpiral-md 0.5s ease forwards, spinAndPulse-md 4s infinite linear reverse;
      animation-delay: 2s, 2.5s;
    }
  }
}
</style>
