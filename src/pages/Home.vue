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
      <h1>
        HI. I'M A CREATIVE
        <GlitchAnimation text="FRONT-END" />
        DEVELOPER.
      </h1>
      <figure class="s-hi__me">
        <div class="s-hi__text whitespace-pre-line">JUST IN TIME. {{ "\n" }}I WAS WAITING{{ "\n" }}FOR YOU!</div>
        <img class="w-full h-full object-cover me-top" :srcset="meTop" alt="my photo" />
        <img class="w-full h-full object-cover" :srcset="meBottom" alt="my photo" />
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

    <ScrollAnimation animation-class="animate-from-bottom" :delay="0" :threshold="0" :once="false">
      <section class="s-hello">
        <figure class="s-hello__picture">
          <img :srcset="me2" alt="my photo" />
        </figure>
        <figure class="s-hello__dialog">
          <VueSVG src="/svg/dialog.svg" />
          <div class="text"><GlitchAnimation text="HEY, IT'S ME AGAIN." /> CONTACT ME YOU WON'T REGRET IT!</div>
        </figure>
      </section>
    </ScrollAnimation>

    <Contact />

    <Footer />
  </main>
</template>

<style scoped lang="scss">
.s-hi {
  position: relative;
  padding: 40px 20px 200px;
  background-color: transparent;
  z-index: 2;
  overflow: hidden;
  min-height: 70vh;
  white-space: pre-line;

  @screen sm {
    min-height: 100vh;
  }
  @screen lg {
    min-height: 100vh;
  }

  .me-top {
    animation: openMouth 1.4s forwards 2.5s;
  }
  &__me {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 40vw;
    bottom: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    animation: translateFromBottom 0.5s forwards 1.5s;
    @screen md {
      left: 0px;
      bottom: -2vw;
    }
    @apply md:w-[30vw] lg:w-[15vw];
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
  @apply mt-100 sm:mt-150 md:mt-250 lg:mt-300;

  &__picture {
    width: 60vw;
    margin-bottom: -5px;
    @screen md {
      width: 40vw;
    }
  }
  &__dialog {
    position: relative;
    display: flex;
    width: 40vw;
    max-width: 100%;
    height: auto;
    transform: translate(-20%, -30%);
    @screen md {
      width: 40vw;
    }
    .vue-svg-container {
      max-height: 200px !important;
      @screen md {
        max-height: 500px !important;
      }
    }

    :deep(svg) {
      overflow: hidden;
      aspect-ratio: 15/10;
      height: auto;
    }

    .text {
      position: absolute;
      display: block;
      right: 50%;
      width: 80%;
      transform: translate(50%, 0%);
      text-align: center;
      line-height: 1;
      @apply text-neg-5-[3vw];
    }
  }
}
</style>
