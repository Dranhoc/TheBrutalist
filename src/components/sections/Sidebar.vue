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
  display: flex;
  border-right: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px;
  z-index: 5;
  width: 420px;
  background-color: var(--bg-secondary);
  @apply float-left py-40 hidden lg:flex;
}
nav {
  position: fixed;
  left: 0;

  @apply flex flex-col px-20 gap-40 text-neg-5-36 text-right;
}
</style>
