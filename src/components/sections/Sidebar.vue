<script setup lang="ts">
import { useScrollTrigger } from "@/composables/useScrollTrigger";
import { ref, onMounted, onUnmounted, watch } from "vue";
import type { Ref } from "vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import bg from "@/assets/img/bg-wall.png?w=150;200&format=webp&as=srcset";

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
    nav.value.style.gap = "40px";
    const links = nav.value.querySelectorAll("a");
    links.forEach((link) => {
      (link as HTMLElement).style.transform = "rotate(0deg) translateY(0px)";
    });
  }
  smoothedVelocity = 0;
};

const updateScrollVelocity = () => {
  const currentScrollY = window.scrollY;
  const rawVelocity = currentScrollY - lastScrollY;
  const scrollDirection = rawVelocity > 0 ? "down" : "up";

  scrollVelocity = Math.abs(rawVelocity);
  lastScrollY = currentScrollY;
  smoothedVelocity = smoothedVelocity * 0.7 + scrollVelocity * 0.3;

  if (nav.value) {
    const links = nav.value.querySelectorAll("a");

    if (sidebarAnimated.value) {
      smoothedVelocity = smoothedVelocity * 0.85;
      const currentGap = parseFloat(nav.value.style.gap) || 40;
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
        const maxGap = 40;
        const newGap = maxGap * (1 - velocityRatio);
        nav.value.style.gap = `${newGap}px`;

        links.forEach((link, index) => {
          const isFirst = index === 0;
          const rotation = isFirst ? 0 : velocityRatio * (index % 2 === 0 ? -6 : 6);
          (link as HTMLElement).style.transform = `rotate(${rotation}deg)`;
        });
      } else {
        nav.value.style.gap = "40px";

        links.forEach((link, index) => {
          const isLast = index === links.length - 1;

          if (isLast) {
            (link as HTMLElement).style.transform = "rotate(0deg)";
          } else {
            const rotation = velocityRatio * (index % 2 === 0 ? -6 : 6);
            const adjustedVelocity = Math.pow(velocityRatio, 0.5);
            const moveDistance = adjustedVelocity * 40 * (links.length - 1 - index);
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
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (sidebarVideo.value) {
    sidebarVideo.value.playbackRate = 0.8;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<template>
  <aside :class="{ 'animate-sidebar': sidebarAnimated }">
    <img :srcset="bg" alt="" role="presentation" />
    <video ref="sidebarVideo" class="sidebar-video" muted playsinline aria-hidden="true" preload="auto">
      <source src="/cloudy-bg.mp4" type="video/mp4" />
    </video>
    <nav ref="nav">
      <a class="btn-theme" href="#home"><GlitchAnimation text="HOME" trigger="hover" /></a>
      <a class="btn-theme" href="#about"><GlitchAnimation text="ABOUT" trigger="hover" /></a>
      <a class="btn-theme" href="#work"><GlitchAnimation text="WORK" trigger="hover" /></a>
      <a class="btn-theme" href="#contact"><GlitchAnimation text="CONTACT" trigger="hover" /></a>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
aside {
  position: relative;
  z-index: 1;
  top: 0;
  left: 0;
  width: 180px;
  background-color: var(--bg-primary);
  flex-shrink: 0;
  transition: background-color 0.3s ease;

  &.animate-sidebar {
    background-color: var(--bg-body);
    nav {
      @screen 4xl {
        left: calc((100vw - 2050px) / 2 + 10px);
      }
    }
  }

  @apply py-40 hidden lg:flex justify-center;

  img {
    position: fixed;
    width: 160px;
    top: 10px;
    left: 10px;
    height: calc(100vh - 20px);
    opacity: 0.9;
    transition: opacity 1s ease;
    z-index: 1;
    border-radius: 20px;
    @screen 4xl {
      left: calc((100vw - 2050px) / 2 + 10px);
    }
  }

  .sidebar-video {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 160px;
    height: calc(100% - 20px);
    border-radius: 20px;
    opacity: 0;
    object-fit: cover;
    transform-origin: center;
    transition: opacity 1s ease;
    z-index: 1;
    overflow: hidden;
    @apply hidden lg:block;
    @screen 4xl {
      left: calc((100vw - 2050px) / 2 + 10px);
    }
  }
}

nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 40px;
  transition: gap 0.5s ease-out;
  z-index: 1;
  @apply px-20 text-neg-5-30;

  @screen 4xl {
    left: calc((100vw - 2050px) / 2 + 5px);
  }

  .btn-theme {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    color: var(--text-secondary);
    padding: 10px;
    margin-left: auto;
    line-height: 1;
    z-index: 1;
    transition: margin 0.3s ease, padding 0.3s ease, font-size 0.3s ease, transform 0.5s ease-out;

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
