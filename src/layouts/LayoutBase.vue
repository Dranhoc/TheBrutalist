<script setup lang="ts">
import { ref, onMounted } from "vue";
import Sidebar from "@/components/sections/Sidebar.vue";
import CursorFilter from "@/components/CursorFilter.vue";
import { useDetectMouse } from "@/composables/useDetectMouse";
import bgDarkDesktop from "@/assets/img/bg/bg-horror.png?w=500;700;1000;1400;1700;2000;2500&format=webp&as=srcset";
import bgUnicornMobile from "@/assets/img/bg/bg-unicorn.png?w=300;400;500&format=webp&as=srcset";

const { hasMouseSupport } = useDetectMouse();

const unicornVideoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        const hasContactClass = document.body.classList.contains("is-contact");

        if (hasContactClass && unicornVideoRef.value) {
          unicornVideoRef.value.currentTime = 0;
          unicornVideoRef.value.play().catch((err) => {
            console.log("Video play failed:", err);
          });
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
});
</script>

<template>
  <div class="page">
    <div class="page__bg">
      <video class="bg-dark-mobile" autoplay loop muted playsinline aria-hidden="true">
        <source src="/bg/bg-dark-mobile.mp4" type="video/mp4" />
      </video>
      <video ref="unicornVideoRef" class="bg-unicorn-desktop" muted playsinline aria-hidden="true">
        <source src="/bg/bg-unicorn-desktop.mp4" type="video/mp4" />
      </video>
      <img class="bg-unicorn-mobile" :srcset="bgUnicornMobile" alt="" role="presentation" />
      <img class="bg-dark-desktop" :srcset="bgDarkDesktop" alt="" role="presentation" />
    </div>
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

<style lang="scss">
.page__bg {
  position: absolute;
  content: "";
  height: 100dvh;
  width: 100vw;
  inset: 0;
  filter: saturate(0%) brightness(200%);

  .bg-dark-mobile,
  .bg-unicorn-mobile {
    height: 100%;
    width: 100%;
    object-fit: cover;
    @apply md:hidden;
  }

  .bg-dark-desktop,
  .bg-unicorn-desktop {
    display: none;
    height: 100%;
    width: 100%;
    object-fit: cover;
    @apply md:block;
  }

  .bg-unicorn-desktop {
    display: none;
  }
}

body.is-contact {
  .page__bg {
    filter: unset;
  }

  .bg-dark-mobile {
    display: none;
  }

  .bg-dark-desktop {
    display: none;
  }

  .bg-unicorn-mobile {
    display: block;
    animation: fadeIn 0.3s ease;
    @apply md:hidden;
  }

  .bg-unicorn-desktop {
    display: block;
  }
}
</style>
