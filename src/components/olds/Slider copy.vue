<script setup lang="ts">
import { ref, computed } from "vue";
import VueSVG from "@/components/VueSVG.vue";
import GlitchAnimation from "@/components/GlitchAnimation.vue";
import slider1 from "@/assets/img/Portfolio/weshre-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider2 from "@/assets/img/Portfolio/sypra-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider3 from "@/assets/img/Portfolio/magvice-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider4 from "@/assets/img/Portfolio/studio-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider5 from "@/assets/img/Portfolio/alpsy-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider6 from "@/assets/img/Portfolio/immovision-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";
import slider7 from "@/assets/img/Portfolio/weshre-app-1.png?w=150;350;700;900;1200;1600&format=webp&as=srcset";

const currentSlideIndex = ref(0);

const slides = [
  {
    id: 1,
    title: "WESHRE",
    image: slider1,
    text: "2025 \n WeShre \n Design: Hugo",
    link: "#",
  },
  {
    id: 2,
    title: "SYPRA",
    image: slider2,
    text: "2024 \n Sypra \n Design: Fanny \n Agency: Epekta",
    link: "#",
  },
  {
    id: 3,
    title: "MAGVICE",
    image: slider3,
    text: "2024 \n Magvice \n Design: Fanny \n Agency: Epekta",
    link: "#",
  },
  {
    id: 4,
    title: "WS STUDIO",
    image: slider4,
    text: "2025 \n WeShre Studio \n Design: Hugo \n Agency : WeShre Studio",
    link: "#",
  },
  {
    id: 5,
    title: "ALPSY",
    image: slider5,
    text: "2024 \n Alpsy \n Design: Me",
    link: "#",
  },
  {
    id: 6,
    title: "IMMOVISION",
    image: slider6,
    text: "2024 \n Alpsy \n Design: Fanny",
    link: "#",
  },
  {
    id: 7,
    title: "WESHRE APP",
    image: slider7,
    text: "2025 \n Alpsy \n Design: Hugo",
    link: "#",
  },
];

const goToSlide = (index: number) => {
  currentSlideIndex.value = index;
};

const getSlideClass = (index: number) => {
  const diff = index - currentSlideIndex.value;
  const totalSlides = slides.length;

  let normalizedDiff = diff;
  if (Math.abs(diff) > totalSlides / 2) {
    normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides;
  }

  switch (normalizedDiff) {
    case 0:
      return "slide--1";
    case -1:
      return "slide--2";
    case 1:
      return "slide--3";
    case -2:
      return "slide--4";
    case 2:
      return "slide--5";
    case -3:
      return "slide--6";
    case 3:
      return "slide--7";
    default:
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

const touchStartX = ref(0);
const touchStartY = ref(0);
const isSwiping = ref(false);

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
</script>

<template>
  <section class="s-slider full-w">
    <div class="mb-40 sm:mb-60 md:mb-80 lg:mb-100">
      <h2>WORK AND WONDERS</h2>
      <div class="text-pos-5-18 lg:text-pos-5-20 font-normal">A FEW THINGS I MADE HAPPEN</div>
    </div>
    <div class="s-slider__buttons">
      <button class="btn-primary" v-for="(slide, index) in slides" :key="slide.id" :class="{ active: index === currentSlideIndex }" @click="goToSlide(index)">
        <!-- <VueSVG src="/svg/plane.svg" /> -->
        <GlitchAnimation :text="slide.title" trigger="hover" />
      </button>
    </div>
    <div class="s-slider__content">
      <div v-for="slideData in orderedSlides" :key="slideData.id" :class="['slide', slideData.slideClass]" v-show="slideData" @click="handleSlideClick(slideData)">
        <div :class="['bg', `bg--${slideData.id}`]">
          <img :srcset="slideData.image" alt="" role="presentation" />
        </div>
        <p class="reset" :class="{ active: slideData.originalIndex === currentSlideIndex }">
          {{ slideData.text }}
        </p>
      </div>
      <div class="s-slider__height"></div>
    </div>

    <div class="s-slider__button">
      <a :href="slides[currentSlideIndex].link" target="_blank" rel="noopener noreferrer" class="btn-site"> See website </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-slider {
  position: relative;
  width: 100%;
  background-color: white;
  @apply px-20  -mt-20;

  &__height {
    width: 100%;
    aspect-ratio: 250/160;
    background-color: white;
    z-index: -1;
    @screen lg {
      max-width: 65%;
      // margin-bottom: 160px;
    }
  }

  &__button {
    // margin-top: 40px;
    text-align: center;

    .btn-site {
      display: inline-block;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 999px;
      font-family: "JetBrains Mono", serif;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 2px solid var(--text-primary);
      @screen lg {
        transform: translateY(-50%);
      }

      &:hover {
        background-color: transparent;
        border-color: var(--bg-primary);
        color: var(--bg-primary);
        // transform: translateY(-2px);
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
      }
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @apply gap-10 lg:gap-20 sm:justify-center;
  }

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 50px;
  }

  .slide {
    position: absolute;
    display: flex;
    aspect-ratio: 280/150;
    border-radius: 10px;
    top: 0;
    left: 50%;
    overflow: hidden;
    transition: all 0.5s ease;
    cursor: pointer;
    @screen sm {
      aspect-ratio: 280/150;
    }

    p {
      position: relative;
      color: white;
      padding: 30px;
      margin-top: auto;
      max-width: 650px;
      z-index: 7;
      pointer-events: none;
      line-height: 1.5;
      white-space: pre-line;
      @apply text-neg-5-14 p-10 md:text-neg-5-16 md:p-30;

      &::before {
        position: absolute;
        content: "";
        width: 600%;
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

    &--1 {
      width: 100%;
      max-width: 100%;
      z-index: 5;
      transform: translateX(-50%);
      cursor: default;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      @apply lg:max-w-[65%];

      p {
        opacity: 1;
        transition: opacity 0.3s ease 0.5s;
      }
    }

    &--2,
    &--3 {
      width: 100%;
      max-width: 50%;
      z-index: 4;
      box-shadow: rgba(0, 0, 0, 0.575) 0px 20px 30px -10px;

      &:hover {
        transform: scale(1.02);
        @apply shadow-lg;
      }

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
    &--2 {
      transform: translate(-85%, 15%);
      &:hover {
        transform: translate(-85%, 15%) scale(1.02);
      }
    }
    &--3 {
      transform: translate(-15%, 15%);
      &:hover {
        transform: translate(-15%, 15%) scale(1.02);
      }
    }

    &--4,
    &--5 {
      width: 100%;
      max-width: 35%;
      z-index: 3;
      box-shadow: rgba(0, 0, 0, 0.575) 0px 20px 30px -10px;

      &:hover {
        transform: scale(1.05);
      }

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
    &--4 {
      left: 0;
      transform: translate(0%, 45%);
      &:hover {
        transform: translate(0%, 45%) scale(1.05);
      }
    }
    &--5 {
      left: unset;
      right: 0;
      transform: translate(0%, 45%);
      &:hover {
        transform: translate(0%, 45%) scale(1.05);
      }
    }

    &--6,
    &--7 {
      width: 100%;
      max-width: 30%;
      z-index: 2;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 15px 25px -10px;

      &:hover {
        transform: scale(1.03);
      }

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
    &--6 {
      left: 0;
      transform: translate(5%, 65%);
      &:hover {
        transform: translate(5%, 65%) scale(1.03);
      }
    }
    &--7 {
      left: unset;
      right: 0;
      transform: translate(-5%, 65%);
      &:hover {
        transform: translate(-5%, 65%) scale(1.03);
      }
    }

    &--hidden {
      width: 100%;
      max-width: 65%;
      z-index: 10;
      top: 0;
      left: unset;
      right: 0;
      transform: translate(100%, 45%) scale(0);
      pointer-events: none;
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

// Media queries pour le responsive mobile
@media (max-width: 768px) {
  .s-slider {
    &__content {
      margin-top: 30px;
    }

    .slide {
      &--2,
      &--3 {
        max-width: 45%;
      }

      &--4,
      &--5 {
        max-width: 30%;
      }

      &--6,
      &--7 {
        max-width: 25%;
      }
    }
  }
}
</style>
