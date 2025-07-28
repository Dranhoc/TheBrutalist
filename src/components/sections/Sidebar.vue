<script setup lang="ts">
import { useScrollTrigger } from "@/composables/useScrollTrigger";
import { ref, onMounted, onUnmounted, watch } from "vue";
import type { Ref } from "vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import hoverGlitchURL from "@/assets/sounds/hover-glitch.mp3";

let audioContext: AudioContext;
let buffer: AudioBuffer | null = null;

async function loadSound(url: string) {
  audioContext = new AudioContext();
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  buffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playGlitch() {
  if (!buffer || !audioContext) return;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5;

  source.connect(gainNode).connect(audioContext.destination);
  source.start(0);
}

onMounted(() => {
  loadSound(hoverGlitchURL);
});

const { sidebarAnimated } = useScrollTrigger();

const nav: Ref<HTMLElement | null> = ref(null);
const sidebarVideo: Ref<HTMLVideoElement | null> = ref(null);
let lastScrollY = 0;
let scrollVelocity = 0;
let smoothedVelocity = 0;
let ticking = false;
let debounceTimer: NodeJS.Timeout | null = null;
let lastThrottleTime = 0;

const resetNavigation = () => {
  if (nav.value) {
    nav.value.style.gap = "20px";
    nav.value.style.marginTop = "0px";
    const links = nav.value.querySelectorAll("a");
    links.forEach((link) => {
      (link as HTMLElement).style.transform = "rotate(0deg) translateY(0px)";
    });
  }
  smoothedVelocity = 0;
};

const updateScrollVelocity = () => {
  const mainElement = document.querySelector(".main") as HTMLElement;
  if (!mainElement) {
    ticking = false;
    return;
  }

  const currentScrollY = mainElement.scrollTop;
  const rawVelocity = currentScrollY - lastScrollY;
  const scrollDirection = rawVelocity > 0 ? "down" : "up";

  scrollVelocity = Math.abs(rawVelocity);
  lastScrollY = currentScrollY;
  smoothedVelocity = smoothedVelocity * 0.7 + scrollVelocity * 0.3;

  if (nav.value) {
    const links = nav.value.querySelectorAll("a");

    if (sidebarAnimated.value) {
      smoothedVelocity = smoothedVelocity * 0.85;
      const currentGap = parseFloat(nav.value.style.gap) || 20;
      const targetGap = 40;
      const newGap = currentGap + (targetGap - currentGap) * 0.2;
      nav.value.style.gap = `${newGap}px`;

      links.forEach((link) => {
        const currentTransform = (link as HTMLElement).style.transform;
        if (currentTransform && currentTransform !== "rotate(0deg) translateY(0px)") {
          (link as HTMLElement).style.transform = "rotate(0deg) translateY(0px)";
        }
      });
    } else {
      const velocityRatio = Math.min(smoothedVelocity / 100, 1);

      if (scrollDirection === "down") {
        const maxGap = 20;
        const newGap = maxGap * (1 - velocityRatio);
        nav.value.style.gap = `${newGap}px`;

        nav.value.style.marginTop = "0px";

        links.forEach((link, index) => {
          const isFirst = index === 0;
          const rotation = isFirst ? 0 : velocityRatio * (index % 2 === 0 ? -6 : 6);
          (link as HTMLElement).style.transform = `rotate(${rotation}deg)`;
        });
      } else {
        nav.value.style.gap = "20px";

        links.forEach((link, index) => {
          const isLast = index === links.length - 1;

          if (isLast) {
            (link as HTMLElement).style.transform = "rotate(0deg)";
          } else {
            const rotation = velocityRatio * (index % 2 === 0 ? -6 : 6);
            const adjustedVelocity = Math.pow(velocityRatio, 0.5);
            const moveDistance = adjustedVelocity * 20 * (links.length - 1 - index);
            (link as HTMLElement).style.transform = `rotate(${rotation}deg) translateY(${moveDistance}px)`;
          }
        });
      }
    }
  }

  ticking = false;
};

const handleScroll = () => {
  const now = Date.now();
  if (now - lastThrottleTime < 50) {
    return;
  }
  lastThrottleTime = now;
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(resetNavigation, 500);
  if (!ticking) {
    requestAnimationFrame(updateScrollVelocity);
    ticking = true;
  }
};

watch(sidebarAnimated, (newValue) => {
  if (sidebarVideo.value) {
    if (newValue) {
      sidebarVideo.value.currentTime = 0;
      sidebarVideo.value.play();
    } else {
      sidebarVideo.value.pause();
    }
  }
});

onMounted(() => {
  const mainElement = document.querySelector(".main");
  if (mainElement) {
    mainElement.addEventListener("scroll", handleScroll, { passive: true });
    lastScrollY = mainElement.scrollTop;
  }

  if (sidebarVideo.value) {
    sidebarVideo.value.playbackRate = 0.8;
  }
});

onUnmounted(() => {
  const mainElement = document.querySelector(".main");
  if (mainElement) {
    mainElement.removeEventListener("scroll", handleScroll);
  }
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<template>
  <aside :class="{ 'animate-sidebar': sidebarAnimated }">
    <nav ref="nav">
      <a class="btn-theme" href="#home"><GlitchAnimation text="HOME" trigger="hover" @mouseenter="playGlitch" /></a>
      <a class="btn-theme" href="#about"><GlitchAnimation text="ABOUT" trigger="hover" @mouseenter="playGlitch" /></a>
      <a class="btn-theme" href="#work"><GlitchAnimation text="WORK" trigger="hover" @mouseenter="playGlitch" /></a>
      <a class="btn-theme" href="#contact"><GlitchAnimation text="CONTACT" trigger="hover" @mouseenter="playGlitch" /></a>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
aside {
  position: fixed;
  height: 100%;
  z-index: 5;
  flex-shrink: 0;
  transition: background-color 0.3s ease;

  &.animate-sidebar {
    background-color: var(--bg-body);
  }

  @apply hidden xl:flex;
}

nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8vh - 80px);
  height: calc(100dvh - 8dvh - 80px);
  top: calc(4vh + 40px);
  top: calc(4dvh + 40px);
  left: 5px;
  gap: 20px;
  transition: gap 0.5s ease-out, margin-top 1.2s linear;
  z-index: 1;
  @apply lg:text-neg-5-12 xl:text-neg-5-14 2xl:text-neg-5-18 3xl:text-neg-5-20 2xl:left-10 3xl:left-20 4xl:w-[calc((100vw-1920px)/2)];

  .btn-theme {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    color: var(--text-secondary);
    padding: 10px;
    line-height: 1;
    z-index: 1;
    transition: margin 0.3s ease, padding 0.3s ease, font-size 0.3s ease, transform 0.5s ease-out;
    @apply 4xl:ml-auto 4xl:mr-40;

    &::before {
      position: absolute;
      content: "";
      inset: 0;
      top: -2px;
      width: 100%;
      height: 100%;
      background-color: var(--bg-primary);
      z-index: -1;
      clip-path: polygon(4% 0, 99% 0, 95% 100%, 0% 100%);
      border-top: 2px solid white;
      transition: background-color 0.3s ease, border-radius 0.3s ease, clip-path 0.3s ease;
    }

    &:hover::before {
      background-color: var(--pink-color);
    }
  }
}

aside.animate-sidebar {
  img {
    opacity: 0 !important;
  }

  .sidebar-video {
    opacity: 1 !important;
  }

  .btn-theme {
    @apply animate-btn-theme;
    &::before {
      @apply animate-btn-bg-theme;
    }
  }
}
</style>
