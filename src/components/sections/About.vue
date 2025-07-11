<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import OfficeCanvas from "@/components/OfficeCanvas.vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import SoftSkills from "@/components/sections/SoftSkills.vue";
import Stack from "@/components/sections/Stack.vue";

const sectionRef = ref<HTMLElement | null>(null);
const magnifierKey = ref(0);

let resizeObserver: ResizeObserver;

onMounted(() => {
  setTimeout(() => {
    const illustrationElement = document.querySelector(".s-about__illustration") as HTMLElement;
    if (illustrationElement) {
      let oldWidth = illustrationElement.getBoundingClientRect().width;
      let oldHeight = illustrationElement.getBoundingClientRect().height;

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            const widthChange = Math.abs(width - oldWidth) / oldWidth;
            const heightChange = Math.abs(height - oldHeight) / oldHeight;
            if (widthChange > 0.15 || heightChange > 0.15) {
              magnifierKey.value++;
              oldWidth = width;
              oldHeight = height;
            }
          }
        }
      });

      resizeObserver.observe(illustrationElement);
    }
  }, 500);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <section class="s-about" id="about" ref="sectionRef">
    <div class="s-about__content">
      <div class="s-about__me">
        <h2><GlitchAnimation text="THIS IS ME." /></h2>
        <p>
          I'm Christophe, a front-end developer based near Liège (Belgium).
          <br /><br />
          I design and build responsive websites, clean UI and reusable components with just enough personality to stand out, but never too much to annoy the user.
          <br /><br />
          I like things that work well, look right, and behave the way users expect. No surprises, no drama.
          <br /><br />
          I care about the details that make interfaces feel effortless, and I believe personality belongs in the experience, not in the way of it.
          <br /><br />
          My goal? To keep things simple, sharp, and just opinionated enough to leave a mark.
        </p>
      </div>
      <div class="s-about__illustration">
        <OfficeCanvas :key="magnifierKey" />
      </div>
    </div>
    <SoftSkills />
    <Stack />
  </section>
</template>

<style lang="scss">
.s-about {
  position: relative;
  // ✅ Plus de contrainte de hauteur fixe - scroll naturel
  background-color: var(--bg-primary);
  // ❌ Plus besoin de styles d'overflow spécifiques - géré par le main

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: calc(100vh - 8vh);
    padding: 40px;
    gap: 40px;
    background-color: var(--bg-primary);
    @apply md:flex-row;
  }

  &__me {
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    flex-shrink: 0;
    max-width: 800px;
    @apply md:w-[50%];

    p {
      padding-top: 40px;
    }
  }

  &__extra-content {
    margin-top: 40px;

    h3 {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 1.2em;
      font-weight: bold;
    }

    p {
      padding-top: 10px;
      line-height: 1.6;
    }
  }

  &__illustration {
    display: flex;
    justify-content: center;
    @apply md:w-[50%];
  }
}
</style>
