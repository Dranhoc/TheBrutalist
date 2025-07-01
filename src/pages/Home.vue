<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import me from "@/assets/img/me.png?w=100;150&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";
import MagnifierCanvas from "@/components/MagnifierCanvas.vue";
import SoftSkillsParallax from "@/components/sections/SoftSkillsParallax.vue";
import Portfolio from "@/components/sections/Portfolio.vue";
import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useSEO } from "@/composables/useSEO";
import GlitchAnimation from "@/components/GlitchAnimation.vue";

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
        <figure class="s-hi__svg animate-sticker">
          <VueSVG src="/svg/tohire.svg" />
        </figure>
        <img class="w-full h-full object-cover" :srcset="me" alt="my photo" />
      </figure>
    </section>
    <section class="s-about">
      <div class="s-about__me">
        <h2>ABOUT ME</h2>
        <p>
          Hi, my name is Christophe, I live near Liège in Belgium. <br /><br />
          I'm a front end developer who likes thing that work and look right.<br /><br />I build responsive websites, clean UI and reusable components - with just enough personality to stand out but never too much to annoy the user.
        </p>
      </div>
      <div class="s-about__catchphrase">
        <h3 class="py-60 md:py-0 text-center md:text-left">I BUILD UIs THAT DON'T SUCK.</h3>
      </div>
    </section>
    <SoftSkillsParallax />
    <section class="s-office w-full">
      <MagnifierCanvas />
    </section>
    <Portfolio />
    <section class="s-bottom">
      <div class="s-bottom__contact">
        <h2 class="title-4">NEED A WEBSITE&nbsp;?{{ "\n" }}LET'S TALK.</h2>
        <a class="contact-link" href=""
          >Contact me
          <figure class="left">
            <VueSVG src="/svg/arrow-left.svg" />
          </figure>
          <figure class="top">
            <VueSVG src="/svg/arrow-top.svg" />
          </figure>
          <figure class="right">
            <VueSVG src="/svg/arrow-right.svg" />
          </figure>
        </a>
      </div>
      <div class="s-bottom__stack">
        <h3 class="title-2">WORK WITH</h3>
        <ul>
          <li>Vue3</li>
          <li>React</li>
          <li>Caffeine</li>
          <li>Typescript</li>
          <li>VITE</li>
          <li>SCSS/Tailwind</li>
          <li>Supabase, Paracetamol, Laravel</li>
          <li>Git, Figma</li>
        </ul>
      </div>
    </section>
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
  padding: 40px 20px 8%;
  border-bottom: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
  background-color: transparent;
  z-index: 2;
  overflow: hidden;
  &__me {
    position: absolute;
    width: 11vw;
    right: 15vw;
    bottom: -1.5vw;
    z-index: -1;
    img {
      opacity: 0;
      animation: translateFromBottom 0.5s forwards 1.5s;
    }
  }
  &__svg {
    position: absolute;
    right: -10vw;
    top: -90px;
    width: 26vw;
    z-index: -2;
    opacity: 0;
  }
}
.s-about {
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px, rgba(0, 0, 0, 0.2) 0px 4px 4px 0px inset;
  @apply md:flex-row;
  &__me {
    padding: 40px 20px;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    flex-shrink: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px;
    @apply md:w-[45%];
    p {
      padding-top: 20px;
    }
  }
  &__catchphrase {
    padding-block: 40px;
    padding-inline: 20px;
    margin-block: auto;
  }
}
.s-office {
  border-bottom: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
  padding-block: 80px;
  figure {
    border-radius: 5px;
  }
}

.s-bottom {
  display: flex;
  flex-direction: column;
  @apply lg:flex-row;

  &__contact {
    border-bottom: 5px solid black;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
    padding-block: 40px;
    padding-inline: 20px;
    white-space: pre-line;
    order: 2;
    @apply lg:w-[65%] lg:order-1;

    .contact-link {
      position: relative;
      display: block;
      font-family: "JetBrains Mono", serif;
      font-size: 18px;
      font-weight: 300;
      text-decoration: underline;
      margin-top: 60px;
      margin-left: 60%;

      .left,
      .right,
      .top {
        position: absolute;
        z-index: 2;
      }
      .left {
        top: 0;
        left: 0;
        transform: translate(-100%, 0%);
        .vue-svg-container {
          svg {
            box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
          }
        }
      }
      .right {
        top: 0;
        left: 0;
        transform: translate(40%, -80%);
      }
      .top {
        top: 0;
        left: 0;
        transform: translate(-30%, -120%);
      }
    }
  }
  &__stack {
    display: flex;
    flex-direction: column;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    order: 1;
    @apply lg:w-[35%] lg:order-2;

    padding-block: 40px;
    padding-inline: 20px;
    z-index: 5;
    ul {
      margin-top: 20px;
      list-style-type: disc;
      padding-left: 15%;
      li {
        font-family: "JetBrains Mono", serif;
        font-size: 20px;
        @apply lg:text-[1.3vw];
      }
    }
  }
}
</style>
