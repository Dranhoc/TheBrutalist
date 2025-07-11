<script setup lang="ts">
import Sidebar from "@/components/sections/Sidebar.vue";
import CursorFilter from "@/components/CursorFilter.vue";
import { useDetectMouse } from "@/composables/useDetectMouse";

const { hasMouseSupport } = useDetectMouse();
</script>

<template>
  <div class="page">
    <div class="shadow-screen"></div>
    <CursorFilter
      v-if="hasMouseSupport"
      :style-rules="[
        { selector: '.s-about', size: 90 },
        { selector: '.s-work-with', size: 90 },
        { selector: '.s-slider', size: 20, shape: 'circle' },
        { selector: '.s-contact', size: 30, shape: 'star', particles: true },
      ]"
    />
    <Sidebar />
    <router-view />
  </div>
</template>
