<script setup lang="ts">
import { ref, computed } from "vue";

import GlitchAnimation from "@/components/GlitchAnimation.vue";
import VueSVG from "@/components/VueSVG.vue";
import slider1 from "@/assets/img/Portfolio/weshre-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider2 from "@/assets/img/Portfolio/sypra-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider3 from "@/assets/img/Portfolio/magvice-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
// import slider4 from "@/assets/img/Portfolio/studio-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider5 from "@/assets/img/Portfolio/alpsy-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider6 from "@/assets/img/Portfolio/immovision-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider7 from "@/assets/img/Portfolio/weshre-app-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider8 from "@/assets/img/Portfolio/inception-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";

const currentSlideIndex = ref(0);
const previousSlideIndex = ref(0);
const isAnimating = ref(false);

const slides = [
  {
    id: 1,
    title: "WESHRE",
    image: slider1,
    text: "2025 \n WeShre \n Design: Hugo",
    link: "https://weshre.com/",
  },
  {
    id: 2,
    title: "SYPRA",
    image: slider2,
    text: "2024 \n Sypra \n Design: Fanny \n Agency: Epekta",
    link: "https://sypra.kiff.be/fr",
  },
  {
    id: 3,
    title: "MAGVICE",
    image: slider3,
    text: "2024 \n Magvice \n Design: Fanny \n Agency: Epekta",
    link: "https://magvice.dev.slym.io",
  },
  {
    id: 4,
    title: "INCEPTION",
    image: slider8,
    text: "2025 \n Inception \n Design: Me",
    link: "https://www.youtube.com/watch?v=xm3YgoEiEDc&list=RDxm3YgoEiEDc&start_radio=1&t=2s&autoplay=1",
  },
  // {
  //   id: 4,
  //   title: "WS STUDIO",
  //   image: slider4,
  //   text: "2025 \n WeShre Studio \n Design: Hugo \n Agency : WeShre Studio",
  //   link: "#",
  // },
  {
    id: 5,
    title: "ALPSY",
    image: slider5,
    text: "2024 \n Alpsy \n Design: Me",
    link: "https://alpsy.be/",
  },
  {
    id: 6,
    title: "IMMOVISION",
    image: slider6,
    text: "2024 \n ImmoVision \n Design: Fanny \n Agency: Epekta",
    link: "https://immo-visions.be/",
  },
  {
    id: 7,
    title: "WESHRE APP",
    image: slider7,
    text: "2025 \n WeShre App \n Design: Hugo",
    link: "https://weshre-preview.web.app/login",
  },
];

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentSlideIndex.value) return;

  isAnimating.value = true;
  previousSlideIndex.value = currentSlideIndex.value;
  currentSlideIndex.value = index;

  setTimeout(() => {
    isAnimating.value = false;
  }, 400);
};

const getSlideClass = (index: number) => {
  if (index === currentSlideIndex.value) {
    return "slide--current";
  } else if (index === previousSlideIndex.value && isAnimating.value) {
    return "slide--leaving";
  } else {
    return "slide--hidden";
  }
};

const orderedSlides = computed(() => {
  return slides.map((slide, index) => ({
    ...slide,
    originalIndex: index,
    slideClass: getSlideClass(index),
  }));
});

const goToPrevSlide = () => {
  const newIndex = currentSlideIndex.value === 0 ? slides.length - 1 : currentSlideIndex.value - 1;
  goToSlide(newIndex);
};

const goToNextSlide = () => {
  const newIndex = currentSlideIndex.value === slides.length - 1 ? 0 : currentSlideIndex.value + 1;
  goToSlide(newIndex);
};

const handleSlideClick = (slideData: any) => {
  if (slideData.originalIndex !== currentSlideIndex.value) {
    goToSlide(slideData.originalIndex);
  }
};

const touchStartX = ref(0);
const touchStartY = ref(0);
const touchEndX = ref(0);
const touchEndY = ref(0);

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX;
  touchEndY.value = e.touches[0].clientY;
};

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value) return;

  const deltaX = touchStartX.value - touchEndX.value;
  const deltaY = touchStartY.value - touchEndY.value;

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      goToNextSlide();
    } else {
      goToPrevSlide();
    }
  }

  touchStartX.value = 0;
  touchStartY.value = 0;
  touchEndX.value = 0;
  touchEndY.value = 0;
};
</script>

<template>
  <section class="s-slider full-w" id="work">
    <div class="s-slider__content">
      <figure class="web"><VueSVG src="/svg/web.svg" /></figure>
      <div class="s-slider__title">
        <h2><GlitchAnimation text="WORK AND WONDERS" /></h2>
        <div class="text-pos-5-18 lg:text-pos-5-20 font-normal">A SELECTION OF A FEW THINGS I MADE HAPPEN</div>
      </div>
      <div class="s-slider__buttons">
        <button class="btn-primary" v-for="(slide, index) in slides" :key="slide.id" :class="{ active: index === currentSlideIndex }" @click="goToSlide(index)">
          <GlitchAnimation :text="slide.title" trigger="hover" />
        </button>
      </div>
      <div class="s-slider__container" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div class="slides-container">
          <div v-for="slideData in orderedSlides" :key="slideData.id" :class="['slide', slideData.slideClass]" @click="handleSlideClick(slideData)">
            <div :class="['bg', `bg--${slideData.id}`]">
              <img :srcset="slideData.image" alt="" role="presentation" />
            </div>
            <p class="reset" :class="{ active: slideData.originalIndex === currentSlideIndex }">
              {{ slideData.text }}
            </p>
          </div>
        </div>
      </div>

      <div class="btn-spider">
        <a :href="slides[currentSlideIndex].link" target="_blank" rel="noopener noreferrer" class="btn-site">Visit website</a>
        <figure class="spider-figure">
          <div class="spider-thread"></div>
          <VueSVG src="/svg/spider.svg" />
        </figure>
      </div>
    </div>
  </section>
  <div class="decor"></div>
</template>

<style scoped lang="scss">
.s-slider {
  position: relative;
  width: 100%;
  background-color: var(--bg-primary);
  z-index: 1;
  @apply sm:px-10 lg:pr-10 lg:pl-0 -mt-60 mb-60 sm:mb-0;

  .web {
    position: absolute;
    right: 0%;
    top: 0%;
    z-index: 10;
    width: 40vw;
    height: 40vw;
    transform: translate(35%, -35%) rotate(20deg);
    filter: blur(5px);
    animation: blur 10s linear infinite;
    z-index: -1;
    @screen 2xl {
      width: 30vw;
      height: 30vw;
      max-width: 600px;
    }
    @keyframes blur {
      0% {
        filter: blur(5px);
      }
      80% {
        filter: blur(3px);
      }
      85% {
        filter: blur(0px);
      }
      95% {
        filter: blur(0px);
      }

      100% {
        filter: blur(5px);
      }
    }
  }

  &__content {
    position: relative;
    background-color: var(--bg-body);
    z-index: 2;
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    @apply sm:px-20;
    @screen sm {
      border-radius: 20px;
      width: calc(100% - 10px);
    }
  }

  &__title {
    @apply py-40 px-20 sm:px-0 mb-20 sm:mb-40 md:mb-60 lg:mb-80;
  }

  .btn-site {
    position: relative;
    display: inline-block;
    bottom: 40px;
    left: calc(50% - 88px);
    padding: 12px 24px;
    text-decoration: none;
    background-color: var(--bg-body);
    text-align: center;
    font-family: "Special Elite", system-ui;
    font-size: 16px;
    font-weight: 500;
    border: 2px solid var(--text-primary);
    transition: all 0.3s ease;
    z-index: 10;
    margin-inline: auto;
    @apply lg:bottom-100 2xl:bottom-130;

    &:hover {
      border-color: var(--bg-primary);
      color: var(--bg-primary);
      box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
    @apply px-20 sm:px-0 gap-10 lg:gap-20 sm:justify-center;
  }

  &__container {
    padding: 20px 0;
  }

  .slides-container {
    position: relative;
    width: 100%;
    min-height: calc(100vw / (280 / 150) + 80px);

    @screen lg {
      max-width: 65%;
      margin: 0 auto;
      min-height: calc(65vw / (280 / 150) + 80px);
    }
    @screen 4xl {
      min-height: calc((2050px * 0.65) / (280 / 150) + 80px);
    }
  }

  .slide {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    aspect-ratio: 280/150;
    display: flex;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;

    p {
      position: relative;
      color: var(--text-secondary);
      padding: 30px;
      margin-top: auto;
      width: 100%;
      z-index: 7;
      pointer-events: none;
      line-height: 1.5;
      white-space: pre-line;
      @apply text-pos-5-14 p-10 md:text-pos-5-16 md:p-30;

      &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: calc(100% + 20px);
        top: -20px;
        left: 0px;
        background: linear-gradient(to bottom, #21212100, #21212199);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease 0.3s;
      }

      &.active::before {
        opacity: 1;
      }
    }

    &--current {
      z-index: 5;
      transform: translateX(0) scale(1);
      cursor: default;
      opacity: 1;
      @screen sm {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      }

      p {
        opacity: 1;
        transition: opacity 0.3s ease 0.5s;
      }
    }

    &--leaving {
      z-index: 4;
      transform: translateX(-100%) scale(0.5);
      opacity: 0;
      pointer-events: none;

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }

    &--hidden {
      z-index: 1;
      transform: translateX(100%) scale(0.5);
      opacity: 0;
      pointer-events: none;

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
  }

  .bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: 768px) {
  .s-slider {
    &__content {
      margin-top: 30px;
      touch-action: pan-y;
    }
  }
}

.decor {
  position: relative;
  width: 100%;
  @apply h-60 lg:h-80 2xl:h-100;
  background-color: var(--bg-primary);
  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 150%;
    height: 100%;
    background: radial-gradient(ellipse at 60% 10%, #333333, #54545482 10%, transparent 50%);
    transform: scaleX(1.7) scaleY(1.2) translateY(20%) rotate(180deg);
    filter: blur(20px);
    animation: pulse 8s forwards infinite;
    animation-delay: 3s;
  }
}
.btn-spider {
  position: relative;

  .spider-thread {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    width: 1px;
    height: 30px;
    background-color: var(--text-primary);
    transition: height 2s ease;
    z-index: 3;
    pointer-events: none;
    top: 0;
  }

  .spider-figure {
    position: absolute;
    left: calc(50% - 5px);
    transform: translateX(-50%);
    transition: transform 2s ease;
    z-index: 2;
    width: 40px;
    height: 40px;
    @apply bottom-40 lg:bottom-100 2xl:bottom-130;
  }

  .btn-site:hover ~ .spider-figure {
    transform: translateX(-50%) translateY(50px);
  }
}
</style>
