<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";
import OfficeCanvas from "@/components/OfficeCanvas.vue";
import SoftSkillsParallax from "@/components/sections/SoftSkillsParallax.vue";
import Stack from "@/components/sections/Stack.vue";
import CursorFilter from "@/components/CursorFilter.vue";
import { useSEO } from "@/composables/useSEO";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import Slider from "@/components/sections/Slider.vue";
import Contact from "@/components/sections/Contact.vue";
import HelloTrustMe from "@/components/sections/HelloTrustMe.vue";

useSEO({
  title: "SlenderDev - Front-end Developer Portfolio",
  description: "SlenderDev - Front-end developer from Liège (Belgium). Strange but friendly web experiences by Christophe Leroy ",
  keywords: ["Front-end developer", "Web portfolio", "Creative developer", "Web Agency", "Vue.js", "Belgium", "Liège", "slenderdev", "Freelance developer"],
  url: "https://www.slenderdev.be/",
  image: "og-home.jpg",
});

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
  <main>
    <CursorFilter
      :style-rules="[
        { selector: '.s-about', size: 90 },
        { selector: '.s-work-with', size: 90 },
        { selector: '.s-slider', size: 20, shape: 'circle' },
        { selector: '.s-contact', size: 30, shape: 'star', particles: true },
      ]"
    />

    <section class="s-hi" id="home">
      <div class="s-hi__content">
        <h1>
          HI. I'M A CREATIVE
          <GlitchAnimation text="FRONT-END" />
          DEVELOPER.
        </h1>
        <figure class="s-hi__me">
          <div class="s-hi__text whitespace-pre-line">JUST IN TIME. {{ "\n" }}I WAS WAITING{{ "\n" }}FOR YOU!</div>
          <img class="w-full h-full object-cover me-top" :srcset="meTop" alt="my photo" />
          <img class="w-full h-full object-cover me-bottom" :srcset="meBottom" alt="my photo" />
        </figure>
      </div>
    </section>
    <section class="s-about" id="about">
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
    </section>

    <SoftSkillsParallax />

    <Stack />

    <Slider />

    <HelloTrustMe />

    <Contact />

    <Footer />
  </main>
</template>

<style scoped lang="scss">
.s-hi {
  position: relative;
  background-color: var(--bg-body);
  overflow: hidden;
  min-height: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 2;
  &::before {
    position: absolute;
    content: "";
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-primary);
    z-index: 1;
  }
  &__content {
    margin-top: 10px;
    margin-left: 10px;
    z-index: 3;
    width: calc(100% - 20px);
    min-height: 600px;
    height: calc(100vh - 20px);
    padding: 40px 20px;
    background-color: var(--bg-body);
    border-radius: 20px;
    @apply lg:ml-0 lg:w-[calc(100%-10px)];
  }

  .me-top {
    animation: openMouth 1s forwards 2.5s;
    position: relative;
  }

  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
    opacity: 0;
    animation: translateFromBottom 0.5s forwards 1.5s;
    left: 10px;
    bottom: 9px;
    @apply w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%] lg:left-0;

    img {
      height: 100%;
      width: auto;
      object-fit: cover;
      z-index: -1;
    }
  }

  &__text {
    position: absolute;
    top: 0px;
    transform: translate(90%, -20%);
    opacity: 0;
    line-height: 1;
    background-color: var(--text-primary);
    color: var(--text-secondary);
    padding: 1.5vw;
    z-index: 2;
    animation: translateFromMouth 0.5s forwards 2.5s;
    @apply text-neg-5-16 md:text-neg-5-24 4xl:p-30;
  }
}

.s-about {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 0 !important;
  background-color: var(--bg-primary);
  gap: 20px;

  @apply md:flex-row pt-120;

  &__me {
    padding: 60px 20px 100px;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    flex-shrink: 0;

    @apply md:w-[calc(50%)];
    p {
      padding-top: 20px;
      @apply md:pt-40;
    }
  }
  &__illustration {
    @apply md:w-[50%];
  }
}

.s-office {
  padding-block: 80px;
  figure {
    border-radius: 5px;
  }
}
</style>
