<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import me from "@/assets/img/me.png?w=100;150;300;450&format=webp&as=srcset";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
import me2 from "@/assets/img/me.png?w=350;500;700;1000;1300;1600;2000&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";
import MagnifierCanvasSquare from "@/components/MagnifierCanvasSquare.vue";
import SoftSkillsParallax from "@/components/sections/SoftSkillsParallax.vue";
import ContactMe from "@/components/sections/ContactMe.vue";
import CursorFilter from "@/components/CursorFilter.vue";
import { useSEO } from "@/composables/useSEO";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import ScrollAnimation from "@/components/ScrollAnimation.vue";
import Slider from "@/components/sections/Slider.vue";
import Contact from "@/components/sections/Contact.vue";

const t = usePageTranslation();

useSEO({
  title: "Home",
  description: "Your trusted partner for aviation support solutions",
  keywords: ["studio", "weshre", "web agency"],
  url: "https://template-studio.weshre.com/",
  image: "/images/og-home.png",
});
</script>

<template>
  <main>
    <CursorFilter
      :size="50"
      :enlarge-rules="[
        { selector: '.s-about', size: 125 },
        { selector: '.s-work-with', size: 125 },
        { selector: '.s-slider', size: 20 },
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
      </div>
      <figure class="s-hi__me">
        <div class="s-hi__text whitespace-pre-line">JUST IN TIME. {{ "\n" }}I WAS WAITING{{ "\n" }}FOR YOU!</div>
        <img class="w-full h-full object-cover me-top" :srcset="meTop" alt="my photo" />
        <img class="w-full h-full object-cover me-bottom" :srcset="meBottom" alt="my photo" />
      </figure>
    </section>
    <section class="s-about">
      <div class="s-about__me">
        <h2>THIS IS ME</h2>
        <p>
          Hey, I'm Christophe — a front-end developer based near Liège, Belgium.
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
        <MagnifierCanvasSquare />
      </div>
    </section>

    <SoftSkillsParallax />

    <ContactMe />

    <Slider />

    <section class="s-hello">
      <figure class="s-hello__me">
        <ScrollAnimation animation-class="left-spiral" :delay="0" :threshold="0" :once="true">
          <div><VueSVG src="/public/svg/spiral-left.svg" /></div>
        </ScrollAnimation>
        <ScrollAnimation animation-class="right-spiral" :delay="0" :threshold="0" :once="true">
          <div><VueSVG src="/public/svg/spiral.svg" /></div>
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
  padding: 40px 20px;
  background-color: transparent;
  z-index: 2;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    h1 {
      line-height: 1;
      @apply text-neg-5-[17vw];

      @screen sm {
        @apply text-neg-5-[14vw];
      }

      @screen md {
        @apply text-neg-5-[12vw];
      }

      @screen lg {
        @apply text-neg-5-[10vw];
        text-align: right;
      }

      @screen 2xl {
        @apply text-neg-5-[10vw];
      }
      @screen 3xl {
        @apply text-neg-5-[12vw];
      }
    }
  }

  .me-top {
    animation: openMouth 1s forwards 2.5s;
    position: relative;
  }

  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    opacity: 0;
    animation: translateFromBottom 0.5s forwards 1.5s;
    left: 0;
    bottom: 0;
    @apply w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw];

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
    transform: translate(90%, -20%);
    opacity: 0;
    line-height: 1;
    background-color: var(--text-primary);
    color: var(--text-secondary);
    padding: 20px 15px;
    border-radius: 10px;
    z-index: 2;
    animation: translateFromMouth 0.5s forwards 2.5s;
    @apply text-neg-5-16 md:text-neg-5-24;
  }
}

.s-about {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-inline: 0 !important;

  @apply md:flex-row;

  &__me {
    padding: 60px 20px 100px;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    flex-shrink: 0;

    @apply md:w-[50%];
    p {
      padding-top: 20px;
      @apply md:pt-40;
    }
  }
}

.s-office {
  padding-block: 80px;
  figure {
    border-radius: 5px;
  }
}

.s-hello {
  display: flex;
  background-color: var(--bg-primary);
  padding-top: 60px;
  width: 100%;
  aspect-ratio: 16/10;
  @apply md:pt-100;

  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    left: 0;
    bottom: 0;
    @apply w-[50vw] md:w-[40vw];

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
    @apply text-neg-5-20 md:text-neg-5-36 md:left-[calc(40vw-40px)];
  }
  .left-spiral,
  .right-spiral {
    position: absolute;
    z-index: 4;

    transform-origin: center;
  }
  @keyframes spinAndPulse-sm {
    0% {
      transform: scale(4) rotate(0deg);
      opacity: 0.7;
    }
    20% {
      transform: scale(4) rotate(360deg);
    }
    40% {
      transform: scale(4) rotate(720deg);
    }
    60% {
      transform: scale(4) rotate(1080deg);
    }
    80% {
      transform: scale(4) rotate(1540deg);
    }
    100% {
      transform: scale(4) rotate(1800deg);
      opacity: 0.7;
    }
  }

  @keyframes spinAndPulse-md {
    0% {
      transform: scale(6) rotate(0deg);
      opacity: 0.7;
    }
    20% {
      transform: scale(6) rotate(360deg);
    }
    40% {
      transform: scale(6) rotate(720deg);
    }
    60% {
      transform: scale(6) rotate(1080deg);
    }
    80% {
      transform: scale(6) rotate(1540deg);
    }
    100% {
      transform: scale(6) rotate(1800deg);
      opacity: 0.7;
    }
  }

  @keyframes fadeInSpiral-sm {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(4);
      opacity: 0.7;
    }
  }

  @keyframes fadeInSpiral-md {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(6);
      opacity: 0.7;
    }
  }

  .left-spiral {
    top: 37%;
    left: 38%;
    transform: scale(0);
    animation: fadeInSpiral-sm 0.2s ease forwards, spinAndPulse-sm 4s infinite linear;
    animation-delay: 2s, 2.2s;

    @media (min-width: 768px) {
      top: 39%;
      left: 39%;
      animation: fadeInSpiral-md 0.2s ease forwards, spinAndPulse-md 4s infinite linear;
      animation-delay: 2s, 2.2s;
    }
  }

  .right-spiral {
    top: 37%;
    left: 56%;
    transform: scale(0);
    animation: fadeInSpiral-sm 0.2s ease forwards, spinAndPulse-sm 4s infinite linear reverse;
    animation-delay: 2s, 2.2s;

    @media (min-width: 768px) {
      top: 39%;
      left: 57%;
      animation: fadeInSpiral-md 0.2s ease forwards, spinAndPulse-md 4s infinite linear reverse;
      animation-delay: 2s, 2.2s;
    }
  }
}
</style>
