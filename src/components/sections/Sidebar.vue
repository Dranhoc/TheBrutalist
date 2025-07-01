<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";
import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

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
      (link as HTMLElement).style.transform = "rotate(0deg)";
    });
  }
  smoothedVelocity = 0;
};

const updateScrollVelocity = () => {
  const currentScrollY = window.scrollY;
  scrollVelocity = Math.abs(currentScrollY - lastScrollY);
  lastScrollY = currentScrollY;

  smoothedVelocity = smoothedVelocity * 0.7 + scrollVelocity * 0.3;

  if (nav.value) {
    const maxGap = 40;
    const maxVelocity = 100;

    const velocityRatio = Math.min(smoothedVelocity / maxVelocity, 1);
    const newGap = maxGap * (1 - velocityRatio);

    nav.value.style.gap = `${newGap}px`;

    const links = nav.value.querySelectorAll("a");
    links.forEach((link, index) => {
      const rotation = velocityRatio * (index % 2 === 0 ? -6 : 6);
      (link as HTMLElement).style.transform = `rotate(${rotation}deg)`;
    });
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
    <nav ref="nav">
      <router-link to="/">HOME</router-link>
      <router-link to="/typography">ABOUT</router-link>
      <router-link to="/admin">WORK</router-link>
      <router-link to="/admin">CONTACT</router-link>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
aside {
  position: relative;
  border-right: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px;
  z-index: 5;
  top: 0;
  left: 0;
  width: 420px;
  background-color: var(--bg-body);
  @apply py-40 hidden lg:flex justify-center;
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
    transition: transform 0.1s ease-out;

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
