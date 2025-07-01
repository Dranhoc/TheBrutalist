<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";

const { setLanguage, currentLanguage } = useLanguageSwitcher();

const toggleLanguage = () => {
  setLanguage(currentLanguage.value === "en" ? "fr" : "en");
};
</script>

<template>
  <aside>
    <nav>
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
  @apply flex flex-col px-20 gap-40 text-neg-5-32;
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
    }
    &:hover::before {
      background-color: var(--pink-color);
    }
  }
}
</style>
