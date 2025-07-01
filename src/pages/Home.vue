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
      <h1>HI. I'M A CREATIVE FRONT-END DEVELOPER.</h1>
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
        <h3>I BUILD UIs THAT DON'T SUCK.</h3>
      </div>
    </section>
    <SoftSkillsParallax />
    <section class="s-office w-full">
      <MagnifierCanvas />
    </section>
    <Portfolio />
    <section class="s-"></section>
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
  border-bottom: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px, rgba(0, 0, 0, 0.2) 0px 4px 4px 0px inset;
  &__me {
    padding: 40px 20px;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    width: 45%;
    flex-shrink: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px;
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
.s-portfolio {
  display: grid;
}
</style>
