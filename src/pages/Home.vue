<script setup lang="ts">
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import meBottom from "@/assets/img/me-bottom.png?w=100;150;300;450&format=webp&as=srcset";
import meTop from "@/assets/img/me-top.png?w=100;150;300;450&format=webp&as=srcset";
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
import { onMounted } from "vue";

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
        <MagnifierCanvasSquare />
      </div>
    </section>

    <SoftSkillsParallax />

    <ContactMe />

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

    <section class="s-contact-title">
      <div class="s-contact-content">
        <h2 class="reset">LET'S WORK TOGETHER</h2>
        <div class="subtitle">Type fast, before this cute moment melts into the void.</div>
      </div>
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
    @apply w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%];

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
  }

  &::before {
    position: absolute;
    content: "";
    top: -30%;
    width: 150%;
    height: 70%;
    background: radial-gradient(ellipse at 60% 10%, #7c7c7c, #e8e8e882 10%, transparent 50%);
    transform: scaleX(1.7) scaleY(1.2) rotate(-10deg);
    filter: blur(15px);
    animation: pulse 8s forwards infinite;
    animation-delay: 3s;
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
.s-contact-title {
  margin-top: 100px;
  padding-top: 20px;
  border-top: 2px solid #ff00aa6b;
  // box-shadow: rgba(251, 0, 255, 0.36) 0px 0px 10px;
  @apply px-20 md:mt-150 lg:mt-200;

  h2 {
    color: var(--text-secondary);
    text-shadow: rgba(251, 0, 255, 0.36) 0px 0px 10px;
    -webkit-text-stroke: 1px #ff00aa6b; /* Contour rose flashy */
    text-stroke: 1px #ff00aa6b;
    line-height: 1.2;
    @apply text-pos-5-36 lg:text-pos-5-[3.5vw] 3xl:text-pos-5-[90px];
  }
  .subtitle {
    color: #ff00aa6b;
    @apply uppercase text-pos-5-18 lg:text-pos-5-20 font-normal pb-60 md:pb-80 lg:pb-120;
  }

  &__content {
    @apply sm:mt-120 md:mt-140 lg:mt-160;
  }
}
</style>
