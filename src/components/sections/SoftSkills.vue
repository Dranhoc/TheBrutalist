<template>
  <section class="s-softskills" ref="sectionRef">
    <div class="s-softskills__content">
      <div class="bg-video">
        <video autoplay muted loop playsinline preload="auto" src="/rain-bg.mp4" aria-hidden="true"></video>
        <div class="title" ref="titleRef" :style="{ transform: `translateX(${titleOffset}px)` }">
          <span class="title-2" v-for="n in 15" :key="n">SOFT&nbsp;SKILLS</span>
        </div>
      </div>
      <div class="s-softskills__text-wrapper">
        <div class="text" ref="textRef" :style="{ transform: `translateX(${textOffset}px)` }">
          <span>
            HOVER STATE ENTHOUSIAST · DARK MODE DEFENDER · PIXEL PERFECTIONIST · UI MOOD READER · <span class="killer">NOT A SERIAL KILLER ·</span> DEBUGGING DETECTIVE · RESPONSIVE MINDSET · TYPESCRIPT THERAPIST · DEADLINE SURFER · CSS WHISPERER ·
            GIT CONFLICT NEGOTIATOR · COMPONENT RECYCLER · FONT SNOB (IN A GOOD WAY) · <span class="killer">NOT A SERIAL KILLER ·</span> LOADING SPEED FREAK · BUTTON ALIGNMENT NINJA · COLOR CONTRAST ADVOCATE · MARGIN TWEAKER · FIGMA TRANSLATOR ·
            LOADING SPINNER PHILOSOPHER · CURIOSITY OVERDRIVE · <span class="killer">NOT A SERIAL KILLER ·</span> "IT WORKS ON MY MACHINE" DIPLOMAT · EMPATHY-DRIVEN DESIGN · NAMING THING PHILOSOPHER · DARK MODE DEFENDER · CSS WHISPERER · DEBUGGING
            DETECTIVE · PIXEL PERFECTIONIST · HOVER STATE ENTHOUSIAST · DEADLINE SURFER · GIT CONFLICT NEGOTIATOR · UI MOOD READER · RESPONSIVE MINDSET. <span class="killer">NOT A SERIAL KILLER ·</span> BUTTON ALIGNMENT NINJA · TYPESCRIPT THERAPIST ·
            FONT SNOB (IN A GOOD WAY) · COLOR CONTRAST ADVOCATE · LOADING SPINNER PHILOSOPHER · COMPONENT RECYCLER · MARGIN TWEAKER · CURIOSITY OVERDRIVE · "IT WORKS ON MY MACHINE" DIPLOMAT · EMPATHY-DRIVEN DESIGN · NAMING THING PHILOSOPHER · DARK
            MODE DEFENDER · RESPONSIVE MINDSET · PIXEL PERFECTIONIST · GIT CONFLICT NEGOTIATOR · <span class="killer">NOT A SERIAL KILLER ·</span> DEBUGGING DETECTIVE · CSS WHISPERER · UI MOOD READER · BUTTON ALIGNMENT NINJA ·
            <span class="killer">NOT A SERIAL KILLER ·</span> HOVER STATE ENTHOUSIAST · TYPESCRIPT THERAPIST · DEADLINE SURFER · LOADING SPINNER PHILOSOPHER · COMPONENT RECYCLER · MARGIN TWEAKER · FONT SNOB (IN A GOOD WAY) · LOADING SPEED FREAK.
            CURIOSITY OVERDRIVE · COLOR CONTRAST ADVOCATE · "IT WORKS ON MY MACHINE" DIPLOMAT · NAMING THING PHILOSOPHER · EMPATHY-DRIVEN DESIGN · DARK MODE DEFENDER · FIGMA TRANSLATOR · RESPONSIVE MINDSET · UI MOOD READER · DEBUGGING DETECTIVE ·
            HOVER STATE ENTHOUSIAST · CSS WHISPERER · GIT CONFLICT NEGOTIATOR · PIXEL PERFECTIONIST · TYPESCRIPT THERAPIST · <span class="killer">NOT A SERIAL KILLER ·</span> DEADLINE SURFER · COLOR CONTRAST ADVOCATE · FONT SNOB (IN A GOOD WAY) ·
            LOADING SPEED FREAK. MARGIN TWEAKER · BUTTON ALIGNMENT NINJA · FIGMA TRANSLATOR · EMPATHY-DRIVEN DESIGN · COMPONENT RECYCLER · LOADING SPINNER PHILOSOPHER · CURIOSITY OVERDRIVE · NAMING THING PHILOSOPHER · "IT WORKS ON MY MACHINE"
            DIPLOMAT · DARK MODE DEFENDER · HOVER STATE ENTHOUSIAST · PIXEL PERFECTIONIST · CSS WHISPERER · UI MOOD READER · GIT CONFLICT NEGOTIATOR · RESPONSIVE MINDSET · DEADLINE SURFER · DEBUGGING DETECTIVE ·
            <span class="killer">NOT A SERIAL KILLER ·</span> TYPESCRIPT THERAPIST · COLOR CONTRAST ADVOCATE · FONT SNOB (IN A GOOD WAY) · LOADING SPEED FREAK · COMPONENT RECYCLER · MARGIN TWEAKER · FIGMA TRANSLATOR · LOADING SPINNER PHILOSOPHER ·
            EMPATHY-DRIVEN DESIGN · CURIOSITY OVERDRIVE · BUTTON ALIGNMENT NINJA · NAMING THING PHILOSOPHER · "IT WORKS ON MY MACHINE" DIPLOMAT · DARK MODE DEFENDER · RESPONSIVE MINDSET · HOVER STATE ENTHOUSIAST · UI MOOD READER · GIT CONFLICT
            NEGOTIATOR · CSS WHISPERER · PIXEL PERFECTIONIST · DEADLINE SURFER · DEBUGGING DETECTIVE · TYPESCRIPT THERAPIST · COLOR CONTRAST ADVOCATE · <span class="killer">NOT A SERIAL KILLER ·</span> BUTTON ALIGNMENT NINJA · LOADING SPEED FREAK ·
            COMPONENT RECYCLER · FONT SNOB (IN A GOOD WAY) · MARGIN TWEAKER · FIGMA TRANSLATOR · LOADING SPINNER PHILOSOPHER · EMPATHY-DRIVEN DESIGN · CURIOSITY OVERDRIVE · NAMING THING PHILOSOPHER · "IT WORKS ON MY MACHINE" DIPLOMAT · HOVER STATE
            ENTHOUSIAST · DARK MODE DEFENDER · PIXEL PERFECTIONIST · UI MOOD READER · <span class="killer">NOT A SERIAL KILLER ·</span> DEBUGGING DETECTIVE · RESPONSIVE MINDSET · TYPESCRIPT THERAPIST · DEADLINE SURFER · CSS WHISPERER · GIT CONFLICT
            NEGOTIATOR · COMPONENT RECYCLER · FONT SNOB (IN A GOOD WAY) · <span class="killer">NOT A SERIAL KILLER ·</span> LOADING SPEED FREAK · BUTTON ALIGNMENT NINJA · COLOR CONTRAST ADVOCATE · MARGIN TWEAKER · FIGMA TRANSLATOR · LOADING SPINNER
            PHILOSOPHER · CURIOSITY OVERDRIVE · <span class="killer">NOT A SERIAL KILLER ·</span> "IT WORKS ON MY MACHINE" DIPLOMAT · EMPATHY-DRIVEN DESIGN · NAMING THING PHILOSOPHER · DARK MODE DEFENDER · CSS WHISPERER
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const sectionRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const titleOffset = ref(-600);
const textOffset = ref(0);
let ticking = false;

onMounted(() => {
  const mainElement = document.querySelector(".main");
  if (mainElement) {
    mainElement.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }
});

onBeforeUnmount(() => {
  const mainElement = document.querySelector(".main");
  if (mainElement) {
    mainElement.removeEventListener("scroll", handleScroll);
  }
});

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

function updateParallax() {
  if (!sectionRef.value) {
    ticking = false;
    return;
  }

  const section = sectionRef.value;
  const mainElement = document.querySelector(".main") as HTMLElement;

  if (!mainElement) {
    ticking = false;
    return;
  }

  const mainRect = mainElement.getBoundingClientRect();
  const sectionRect = section.getBoundingClientRect();

  const sectionTop = sectionRect.top - mainRect.top;
  const sectionBottom = sectionRect.bottom - mainRect.top;
  const sectionHeight = section.offsetHeight;
  const mainHeight = mainElement.clientHeight;

  const triggerOffset = 200;
  const adjustedSectionTop = sectionTop + triggerOffset;

  const isVisible = sectionBottom > triggerOffset && adjustedSectionTop < mainHeight;

  if (isVisible) {
    const progress = Math.max(0, Math.min(1, (mainHeight - adjustedSectionTop) / (mainHeight + sectionHeight)));

    const maxTitleOffset = 320;
    const maxTextOffset = -480;
    const baseTitleOffset = -400;

    const titleProgress = easeOutCubic(progress);
    const textProgress = easeInOutCubic(progress);

    titleOffset.value = baseTitleOffset + titleProgress * maxTitleOffset;
    textOffset.value = textProgress * maxTextOffset;
  } else {
    titleOffset.value = -600;
    textOffset.value = 0;
  }

  ticking = false;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
</script>

<style scoped lang="scss">
.s-softskills {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-primary);
  height: calc(92vh - 60px);
  height: calc(92dvh - 60px);
  max-height: 750px;
  overflow-x: hidden;

  &__content {
    background-color: var(--bg-primary);
    overflow-x: hidden;
  }

  .bg-video {
    position: relative;
    height: 180px;
    z-index: 0;
    pointer-events: none;

    video {
      position: absolute;
      content: "";
      object-fit: cover;
      height: 180px;
      width: 100%;
      z-index: -1;
      filter: grayscale(100%) brightness(200%) contrast(150%) sepia(0%) hue-rotate(0deg) saturate(100%);
      animation: vampiricFlash 8s infinite;
    }
  }

  .title {
    position: absolute;
    top: 60px;
    display: flex;
    gap: 100px;
    will-change: transform;
    transition: transform 0.2s ease;
    z-index: 5;
    overflow-x: hidden;
    @apply w-[300vw] md:w-[200vw] lg:w-[180vw] 4xl:w-[3000px];

    span {
      display: block;
      padding: 20px;
      white-space: nowrap;
      pointer-events: none;
      @apply text-neg-5-45 btn-primary;
      &::before {
        border-top: 2px solid var(--bg-primary);
      }
    }
  }

  &__text-wrapper {
    position: relative;
    overflow: hidden;
    padding-top: 60px;
    height: 320px;
    @apply md:h-335 3xl:h-400;
  }

  .text {
    position: relative;
    display: flex;
    will-change: transform;
    transition: transform 0.3s ease;
    color: var(--text-secondary);
    z-index: 3;
    width: 250vw;
    overflow-y: hidden;
    line-height: 2;
    font-family: "Special Elite", system-ui;

    @apply text-pos-5-18 md:text-pos-5-26 font-normal;
    @screen md {
      line-height: 1.5;
    }

    .killer {
      animation: vampiricFlash 8s infinite;
    }
  }
}
</style>
