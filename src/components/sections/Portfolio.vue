<script setup lang="ts">
import VueSVG from "@/components/VueSVG.vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import weshre1 from "@/assets/img/portfolio/weshre-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import sypra1 from "@/assets/img/portfolio/sypra-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import alpsy1 from "@/assets/img/portfolio/alpsy-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import brutalist1 from "@/assets/img/portfolio/brutalist-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import immovision1 from "@/assets/img/portfolio/immovision-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import magvice1 from "@/assets/img/portfolio/magvice-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import studio1 from "@/assets/img/portfolio/studio-1.png?w=100;150;200;250;400&format=webp&as=srcset";
import weshreapp1 from "@/assets/img/portfolio/weshre-app-1.png?w=100;150;200;250;400&format=webp&as=srcset";
</script>

<template>
  <section class="s-portfolio">
    <div>
      <div class="title-6 relative">
        WORK
        <figure class="sticker"><VueSVG src="/public/svg/sticker-new.svg"></VueSVG></figure>
      </div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">WESHRE</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="weshre1" alt="" /></figure>
      <a href="https://weshre.com/" target="_blank" class="btn-visit">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/hugo-simon-14a468185/" target="_blank">Hugo</a></div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">SYPRA</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="sypra1" /></figure>
      <a href="https://sypra.kiff.be/fr" target="_blank" class="btn-visit">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/fanny-fraselle-447b90142/" target="_blank">Fanny</a></div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">ALPSY</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="alpsy1" /></figure>
      <a href="https://alpsy.be/" target="_blank" class="btn-visit">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/chl26j1986/" target="_blank">Me</a></div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">WESHRE APP</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="weshreapp1" /></figure>
      <a href="https://weshre-preview.web.app/login" target="_blank" class="btn-visit">In progress</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/hugo-simon-14a468185/" target="_blank">Hugo</a></div>
    </div>

    <div class="wtf title-5">WHY THIS ?</div>

    <div class="website px-20">
      <h6 class="title-7">STUDIO WESHRE</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="studio1" /></figure>
      <a href="https://studio.weshre.com/" target="_blank" class="btn-visit">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/hugo-simon-14a468185/" target="_blank">Hugo</a></div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">IMMOVISION</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="immovision1" alt="" /></figure>
      <a href="https://immo-visions.be/" target="_blank" class="btn-visit">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/fanny-fraselle-447b90142/" target="_blank">Fanny</a></div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">MAGVICE</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="magvice1" /></figure>
      <a href="https://magvice.dev.slym.io/fr" target="_blank" class="btn-visit">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/fanny-fraselle-447b90142/" target="_blank">Fanny</a></div>
    </div>
    <div class="website px-20">
      <h6 class="title-7">THE BRUTALIST INCEPTION</h6>
      <figure class="rounded-[5px] overflow-hidden"><img :srcset="brutalist1" /></figure>
      <a href="#" class="btn-visit btn-visit--secondary">Visit website</a>
      <div class="designer">Design: <a href="https://www.linkedin.com/in/chl26j1986/" target="_blank">Me</a></div>
    </div>

    <div class="title-6 pl-20 sm:col-span-2 md:col-span-1"><GlitchAnimation text="AND MORE..." /></div>
  </section>
</template>

<style scoped lang="scss">
.s-portfolio {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px;
  border-bottom: 4px solid black;
  @screen sm {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  @screen md {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  & > * {
    &:not(.website) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    justify-content: center;
    outline: 2px solid black;
  }

  .wtf {
    @apply col-span-1 md:col-span-2;
  }

  .website {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
    padding: 20px;
    h6 {
      text-align: center;
    }
    figure {
      display: flex;
      flex-shrink: 1;
    }
    .btn-visit {
      position: relative;
      display: flex;
      font-family: "JetBrains Mono", serif;
      font-size: 13px;
      padding: 8px 20px;
      border: 1px solid black;
      margin-inline: auto;
      border-radius: 999px;
      text-decoration: none;
      z-index: 2;

      &:before {
        position: absolute;
        content: "";
        inset: 0;
        border-radius: inherit;
        background: #ffffff;
        z-index: -2;
      }

      &:after {
        position: absolute;
        content: "";
        inset: 0;
        border-radius: inherit;
        background: var(--yellow-color);
        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        transition: clip-path 0.28s;
        z-index: -1;
      }

      &:hover,
      &:focus {
        &:after {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
      }
    }
    .designer {
      font-family: "JetBrains Mono", serif;
      font-size: 13px;
      text-align: right;
      margin-right: -10px;
      margin-bottom: -10px;
      a {
        text-decoration: underline;
        transition: color 0.15s ease;
        &:hover {
          color: var(--green-color);
        }
      }
    }
  }

  .sticker {
    height: 1px;
    width: 8vw;
    .vue-container-svg {
      width: 100%;
    }
    transform: translateY(-1.1em) translateX(1.2em);
  }
}
</style>
