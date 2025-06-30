<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import me from "@/assets/img/me.png?w=100;150&format=webp&as=srcset";
import office from "@/assets/img/office.png?w=300;500;800;1100;1500;1800;2200&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";
import MagnifierCanvas from "@/components/MagnifierCanvas.vue";
import SoftSkillsParallax from "@/components/sections/SoftSkillsParallax.vue";
import Portfolio from "@/components/sections/Portfolio.vue";

import { useSEO } from "@/composables/useSEO";

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
    <section class="s-hi">
      <h1>HI. I’M A CREATIVE FRONT-END DEVELOPER.</h1>
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
          Hi, my name is Christophe, I live near Liège in Belgium. <br /><br />
          I’m a front end developer who likes thing that work and look right.<br /><br />I build responsive websites, clean UI and reusable components - with just enough personality to stand out but never too much to annoy the user.
        </p>
      </div>
      <div class="s-about__catchphrase">
        <h3>I BUILD UIs THAT DON’T SUCK.</h3>
      </div>
    </section>
    <SoftSkillsParallax />
    <section class="s-office w-full">
      <span class="text-center text-neg-5-20 block mb-20">FIND THE VERY HIDDEN SECRET</span>
      <MagnifierCanvas />
    </section>
    <Portfolio />
    <Footer />
  </main>
</template>

<style scoped lang="scss">
.s-hi {
  padding: 40px 20px 8%;
  border-bottom: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;

  &__me {
    position: absolute;
    width: 11vw;
    right: 15vw;
    bottom: 0;
    z-index: 1;
  }
  &__svg {
    position: absolute;
    right: -10vw;
    top: -90px;
    width: 26vw;
    z-index: -1;
  }
}

.s-about {
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
  padding-block: 10vw;
  figure {
    border-radius: 5px;
  }
}

.s-portfolio {
  display: grid;
}
</style>
