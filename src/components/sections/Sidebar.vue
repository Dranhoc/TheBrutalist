<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";
import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import bg from "@/assets/img/bg-wall.png?w=150;200&format=webp&as=srcset";

const { setLanguage, currentLanguage } = useLanguageSwitcher();
const toggleLanguage = () => {
  setLanguage(currentLanguage.value === "en" ? "fr" : "en");
};

const nav: Ref<HTMLElement | null> = ref(null);
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<template>
  <aside>
    <img :srcset="bg" alt="" role="presentation" />
    <nav ref="nav">
      <router-link to="/"><GlitchAnimation text="HOME" trigger="hover" /></router-link>
      <router-link to="/typography"><GlitchAnimation text="ABOUT" trigger="hover" /></router-link>
      <router-link to="/admin"><GlitchAnimation text="WORK" trigger="hover" /></router-link>
      <router-link to="/admin"><GlitchAnimation text="CONTACT" trigger="hover" /></router-link>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
aside {
  position: relative;
  // border-right: 3px solid var(--text-primary);
  // box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px;
  z-index: 1;
  top: 0;
  left: 0;
  width: 180px;
  background-color: var(--bg-body);
  flex-shrink: 0;
  @apply py-40 hidden lg:flex justify-center;
  img {
    position: fixed;
    width: 180px;
    top: -40px;
    min-height: calc(100vh + 40px);
    opacity: 0.6;
  }
}

nav {
  position: fixed;
  left: -10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  transition: gap 0.5s ease-out;
  @apply px-20 text-neg-5-32;

  & > * {
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
    transition: transform 0.5s ease-out;

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
      transition: background-color 0.15s ease;
      border-top: 2px solid white;
    }

    &:hover::before {
      background-color: var(--pink-color);
    }
  }
}
</style>
