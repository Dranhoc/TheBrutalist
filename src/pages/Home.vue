<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import me from "@/assets/img/me.png?w=100;150&format=webp&as=srcset";
import office from "@/assets/img/office.png?w=300;500;800;1100;1500;1800;2200&format=webp&as=srcset";
import Footer from "@/components/sections/Footer.vue";

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
    <section class="s-softskills">
      <div class="title">
        <span class="title-2">SOFT&nbsp;SKILLS</span>
        <span class="title-2">SOFT&nbsp;SKILLS</span>
        <span class="title-2">SOFT&nbsp;SKILLS</span>
        <span class="title-2">SOFT&nbsp;SKILLS</span>
        <span class="title-2">SOFT&nbsp;SKILLS</span>
        <span class="title-2">SOFT&nbsp;SKILLS</span>
        <span class="title-2">SOFT&nbsp;SKILLS</span>
      </div>
      <span class="text">
        PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN. DARK MODE
        DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
        PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
        DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING
        THING PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN
        DESIGN. DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER.
        NAMING THING PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST.
        EMPATHY-DRIVEN DESIGN. DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK.
        COMPONENT RECYCLER. NAMING THING PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE
        ENTHOUSIAST. EMPATHY-DRIVEN DESIGN. DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED
        FREAK. COMPONENT RECYCLER. NAMING THING PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER
        STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN. DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING
        SPEED FREAK. COMPONENT RECYCLER. NAMING THING PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR.
        HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN. DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST ADVOCATE.
        LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT
        NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN. DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER.”IT WORKS ON MY MACHINE” DIPLOMAT. COLOR CONTRAST
        ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING PHILOSOPHER.
      </span>
    </section>
    <section class="s-office">
      <figure>
        <img :srcset="office" alt="The office" />
        <span>Where the dream comes true</span>
      </figure>
    </section>
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

.s-softskills {
  height: 500px;
  z-index: 1;
  // border-bottom: 5px solid black;
  // box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 4px;

  .title {
    position: absolute;
    display: flex;
    gap: 100px;
    top: 40px;
    left: 20px;
    width: 300vw;
    span {
      @apply text-neg-5-45;
    }
  }
  .text {
    position: absolute;
    display: flex;
    top: 130px;
    left: 20px;
    width: 180vw;
    height: 300px;
    overflow-y: hidden;
    z-index: -1;
    @apply text-neg-5-26;
  }
}
.s-office {
  padding: 5vw;
  border-bottom: 5px solid black;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
  figure {
    border-radius: 5px;
    overflow: hidden;

    img {
      border-radius: 5px;
      width: 100%;
    }
    span {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      color: var(--text-secondary);
      font-family: "JetBrains Mono", serif;
      font-weight: 200;
    }
  }
}

.s-portfolio {
  display: grid;
}
</style>
