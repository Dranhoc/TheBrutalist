<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import me from "@/assets/img/me.png?w=100;150;300;450&format=webp&as=srcset";
import me2 from "@/assets/img/me.png?w=350;500;700;1000;1300;1600;2000&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";
import MagnifierCanvasSquare from "@/components/MagnifierCanvasSquare.vue";
import SoftSkillsParallax from "@/components/sections/SoftSkillsParallax.vue";
import ContactMe from "@/components/sections/ContactMe.vue";
import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useSEO } from "@/composables/useSEO";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import ScrollAnimation from "@/components/ScrollAnimation.vue";
import Slider from "@/components/sections/Slider.vue";
import Contact from "@/components/sections/Contact.vue";

const t = usePageTranslation();

const cursor: Ref<HTMLElement | null> = ref(null);

const updateCursorPosition = (e: MouseEvent): void => {
  if (cursor.value) {
    cursor.value.style.left = e.clientX + "px";
    cursor.value.style.top = e.clientY + "px";
  }
};

onMounted(() => {
  document.addEventListener("mousemove", updateCursorPosition);
  document.body.style.cursor = "none";
});

onUnmounted(() => {
  document.removeEventListener("mousemove", updateCursorPosition);
  document.body.style.cursor = "auto";
});

const enlargeCursor = (): void => {
  if (cursor.value) {
    cursor.value.classList.add("enlarged");
  }
};

const shrinkCursor = (): void => {
  if (cursor.value) {
    cursor.value.classList.remove("enlarged");
  }
};

onMounted(() => {
  document.addEventListener("mousemove", updateCursorPosition);
  document.body.style.cursor = "none";

  const aboutSection = document.querySelector(".s-about");
  if (aboutSection) {
    aboutSection.addEventListener("mouseenter", enlargeCursor);
    aboutSection.addEventListener("mouseleave", shrinkCursor);
  }
});

onUnmounted(() => {
  document.removeEventListener("mousemove", updateCursorPosition);
  document.body.style.cursor = "auto";

  const aboutSection = document.querySelector(".s-about");
  if (aboutSection) {
    aboutSection.removeEventListener("mouseenter", enlargeCursor);
    aboutSection.removeEventListener("mouseleave", shrinkCursor);
  }
});

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
    <div ref="cursor" class="cursor-invert"></div>

    <section class="s-hi">
      <h1>
        HI. I'M A CREATIVE
        <GlitchAnimation text="FRONT-END" />
        DEVELOPER.
      </h1>
      <figure class="s-hi__me">
        <figure class="s-hi__svg">
          <VueSVG src="/svg/tohire.svg" />
        </figure>
        <img class="w-full h-full object-cover" :srcset="me" alt="my photo" />
      </figure>
    </section>
    <section class="s-about">
      <div class="s-about__me">
        <h2>ABOUT ME</h2>
        <p>
          Hey, I’m Christophe — a front-end developer based near Liège, Belgium.
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
.cursor-invert {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  top: 0;
  left: 0;
  background: white;
  mix-blend-mode: difference;
  transition: transform 0.1s ease-out;
  transform: translate(-50%, -50%);

  &.enlarged {
    transform: translate(-50%, -50%) scale(2.5);
    transition: transform 0.3s ease-out;
  }
}

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
  &__me {
    position: absolute;
    width: 40vw;
    bottom: 0;
    left: 0;
    z-index: -1;
    @screen md {
      width: 13vw;
      // right: 15vw;
      left: 180px;
      bottom: -2vw;
    }
    img {
      opacity: 0;
      animation: translateFromBottom 0.5s forwards 1.5s;
    }
  }
  &__svg {
    position: absolute;
    width: 45vw;
    right: -10vw;
    top: -5em;
    z-index: -2;
    opacity: 0;
    @screen md {
      width: 26vw;
      right: -10vw;
      top: -90px;
    }
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
