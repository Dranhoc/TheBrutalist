<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";
import OfficeCanvas from "@/components/OfficeCanvas.vue";
import SoftSkillsParallax from "@/components/sections/SoftSkillsParallax.vue";
import Stack from "@/components/sections/Stack.vue";
import CursorFilter from "@/components/CursorFilter.vue";
import { useSEO } from "@/composables/useSEO";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import ScrollAnimation from "@/components/ScrollAnimation.vue";
import Slider from "@/components/sections/Slider.vue";
import Contact from "@/components/sections/Contact.vue";

onMounted(() => {
  const video = document.querySelector<HTMLVideoElement>(".s-hello__video");
  if (video) {
    video.playbackRate = 0.4;
  }
});

const t = usePageTranslation();

useSEO({
  title: "Home",
  description: "Your trusted partner for aviation support solutions",
  keywords: ["studio", "weshre", "web agency"],
  url: "https://template-studio.weshre.com/",
  image: "/images/og-home.png",
});

const magnifierKey = ref(0);
let resizeObserver: ResizeObserver;

onMounted(() => {
  const video = document.querySelector<HTMLVideoElement>(".s-hello__video");
  if (video) {
    video.playbackRate = 0.4;
  }

  // AJOUTER ÇA :
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
              console.log("🔄 Remounting MagnifierCanvas");
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

// AJOUTER ÇA :
onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <main>
    <CursorFilter
      :size="50"
      :enlarge-rules="[
        { selector: '.s-about', size: 90 },
        { selector: '.s-work-with', size: 90 },
        { selector: '.s-slider', size: 20 },
        { selector: '.s-contact', size: 15 },
      ]"
      color="white"
      blend-mode="difference"
    />

    <section class="s-hi">
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
    <section class="s-about">
      <div class="s-about__me">
        <h2><GlitchAnimation text="THIS IS ME" /></h2>
        <p>
          I'm Christophe, a front-end developer based near Liège — Belgium.
          <br /><br />
          I design and build responsive websites, clean UI and reusable components with just enough personality to stand out, but never too much to annoy the user.
          <br /><br />
          I like things that work well, look right, and behave the way users expect — no surprises, no drama.
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

    <section class="s-hello">
      <video class="s-hello__video" autoplay loop muted playsinline aria-hidden="true">
        <source src="/storm.mp4" type="video/mp4" />
      </video>
      <figure class="s-hello__me">
        <ScrollAnimation animation-class="left-spiral" :delay="0" :threshold="0" :once="true">
          <div><VueSVG src="/svg/spiral-left.svg" /></div>
        </ScrollAnimation>
        <ScrollAnimation animation-class="right-spiral" :delay="0" :threshold="0" :once="true">
          <div><VueSVG src="/svg/spiral.svg" /></div>
        </ScrollAnimation>
        <ScrollAnimation animation-class="fade-in" :delay="0" :threshold="0.3" :once="true">
          <div class="s-hello__text whitespace-pre-line">TRUST&nbsp;ME,{{ "\n" }}CONTACT&nbsp;ME,{{ "\n" }}YOU&nbsp;WON'T{{ "\n" }}REGRET&nbsp;IT!</div>
        </ScrollAnimation>
        <ScrollAnimation animation-class="animate-from-bottom" :delay="0" :threshold="0" :once="true">
          <img class="w-full h-full object-cover me-top" :srcset="meTop" alt="my photo" />
          <img class="w-full h-full object-cover me-bottom" :srcset="meBottom" alt="my photo" />
        </ScrollAnimation>
      </figure>
    </section>

    <Contact />

    <Footer />
  </main>
</template>

<style scoped lang="scss">
.s-hi {
  position: relative;

  background-color: var(--bg-body);
  // color: var(--text-secondary);
  overflow: hidden;
  min-height: 100vh;
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
  margin-inline: 0 !important;
  background-color: var(--bg-primary);
  gap: 20px;

  @apply md:flex-row pt-120 pb-60;

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

.s-hello {
  position: relative;
  display: flex;
  background-color: var(--bg-primary);
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
    opacity: 1;
    z-index: 1;
    @screen md {
      padding-inline: 10px;
    }
  }

  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    left: 0;
    bottom: 0;
    @apply w-[50%] md:w-[40%];

    img {
      height: 100%;
      width: auto;
      object-fit: cover;
      z-index: 2;
    }
  }

  &__text {
    position: absolute;
    top: 0px;
    left: calc(50vw - 40px);
    line-height: 1;
    background-color: var(--text-secondary);
    color: var(--text-primary);
    padding-inline: 1.5vw;
    padding-block: 2vw;
    z-index: 2;
    @apply text-neg-5-20 md:text-neg-5-36 md:left-[calc(100%-40px)] 4xl:p-40;
  }
  .left-spiral,
  .right-spiral {
    position: absolute;
    z-index: 4;

    transform-origin: center;
  }

  .left-spiral {
    top: 37%;
    left: 38%;
    transform: scale(0);
    animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-sm 4s infinite linear;
    animation-delay: 2s, 2.5s;

    @media (min-width: 768px) {
      top: 39%;
      left: 39%;
      animation: fadeInSpiral-md 0.5s ease forwards, spinAndPulse-md 4s infinite linear;
      animation-delay: 2s, 2.5s;
    }
  }

  .right-spiral {
    top: 37%;
    left: 56%;
    transform: scale(0);
    animation: fadeInSpiral-sm 0.5s ease forwards, spinAndPulse-sm 4s infinite linear reverse;
    animation-delay: 2s, 2.5s;

    @media (min-width: 768px) {
      top: 39%;
      left: 58%;
      animation: fadeInSpiral-md 0.5s ease forwards, spinAndPulse-md 4s infinite linear reverse;
      animation-delay: 2s, 2.5s;
    }
  }
}
</style>
