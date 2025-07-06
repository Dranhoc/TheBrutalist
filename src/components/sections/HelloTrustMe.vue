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
      <div class="s-hello__text">
        <span class="creepy-text">Trust Me</span>
        <span class="creepy-text">Contact Me</span>
        <span class="creepy-text">You won't regret It</span>
      </div>
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

  .s-hello__text {
    position: absolute;
    width: 100%;
    top: 0;
    left: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 2;
    color: var(--text-secondary);
    background-color: transparent;
    font-weight: bold;
    text-align: center;
    font-family: "Special Elite", system-ui;
    @apply md:w-[60vw];

    .creepy-text {
      opacity: 0;
      transform: scale(1.2);
      filter: blur(8px);
      animation: vaporZoom 5s infinite;
      animation-timing-function: ease-in-out;

      &:nth-child(1) {
        animation-delay: 0.4s;
        @apply text-neg-5-16 sm:text-neg-5-24 lg:text-neg-5-70;
      }
      &:nth-child(2) {
        animation-delay: 1.7s;
        @apply text-neg-5-18 sm:text-neg-5-32 lg:text-neg-5-80;
      }
      &:nth-child(3) {
        animation-delay: 2.9s;
        @apply text-neg-5-12 sm:text-neg-5-16 lg:text-neg-5-50;
      }
    }
  }

  @keyframes vaporZoom {
    0% {
      opacity: 0;
      transform: scale(0) translateY(10px) translateX(0);
      filter: blur(15px);
    }
    20% {
      opacity: 1;
      transform: scale(1) translateY(0) translateX(0);
      filter: blur(1px);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.05) translateY(-5px) rotate(-10deg);
      filter: blur(4px);
      color: white;
    }
    100% {
      opacity: 0;
      transform: scale(3) translateY(10px) rotate(30deg) translateX(-20%);
      filter: blur(8px);
      color: rgb(113, 1, 1);
    }
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
    animation: fadeInSpiral 0.3s ease forwards, spinAndPulse 4s infinite linear;
    animation-delay: 2s, 2.5s;

    @screen sm {
      animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-md 4s infinite linear;
      animation-delay: 2s, 2.5s;
    }
    @screen md {
      top: 39%;
      left: 39%;
      animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-md 4s infinite linear;
      animation-delay: 2s, 2.5s;
    }
    @screen 2xl {
      top: 39%;
      left: 39%;
      animation: fadeInSpiral-2xl 0.5s ease forwards, spinAndPulse-2xl 4s infinite linear;
      animation-delay: 2s, 2.5s;
    }
  }

  .right-spiral {
    top: 37%;
    left: 56%;
    transform: scale(0);
    animation: fadeInSpiral 0.3s ease forwards, spinAndPulse 4s infinite linear reverse;
    animation-delay: 2s, 2.5s;

    @screen sm {
      animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-md 4s infinite linear reverse;
      animation-delay: 2s, 2.5s;
    }
    @screen md {
      top: 39%;
      left: 58%;
      animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-md 4s infinite linear reverse;
      animation-delay: 2s, 2.5s;
    }
    @screen 2xl {
      top: 39%;
      left: 58%;
      animation: fadeInSpiral-2xl 0.5s ease forwards, spinAndPulse-2xl 4s infinite linear reverse;
      animation-delay: 2s, 2.5s;
    }
  }
}
</style>
