<template>
  <section class="s-softskills" ref="sectionRef">
    <div class="title" ref="titleRef" :style="{ transform: `translateX(${titleOffset}px)` }">
      <!-- <img :srcset="bg" alt="" role="prensentation" /> -->
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
      <span class="title-2">SOFT&nbsp;SKILLS</span>
    </div>
    <div class="text" ref="textRef" :style="{ transform: `translateX(${textOffset}px)` }">
      PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN. DARK MODE
      DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER. PIXEL PERFECTIONIST. DEBUGGING DETECTIVE. CSS WHISPERER. BUTTON ALIGNMENT NINJA. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. UI MOOD READER. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. HOVER STATE ENTHOUSIAST. EMPATHY-DRIVEN DESIGN.
      DARK MODE DEFENDER. LOADING SPINNER PHILOSOPHER. FIGMA TRANSLATOR. FONT SNOB (IN A GOOD WAY). CURIOSITY OVERDRIVE. MARGIN TWEAKER."IT WORKS ON MY MACHINE" DIPLOMAT. COLOR CONTRAST ADVOCATE. LOADING SPEED FREAK. COMPONENT RECYCLER. NAMING THING
      PHILOSOPHER.
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
// import bg from "@/assets/img/bg-wall.png?w=150;200&format=webp&as=srcset";

const sectionRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const titleOffset = ref(-600);
const textOffset = ref(0);

let ticking = false;

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
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
  const sectionRect = section.getBoundingClientRect();
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;

  const sectionTop = sectionRect.top;
  const sectionBottom = sectionRect.bottom;

  const triggerOffset = 100;
  const adjustedSectionTop = sectionTop + triggerOffset;

  const isVisible = sectionBottom > triggerOffset && adjustedSectionTop < windowHeight;

  if (isVisible) {
    const progress = Math.max(0, Math.min(1, (windowHeight - adjustedSectionTop) / (windowHeight + sectionHeight)));

    const maxTitleOffset = 320; // 400 * 0.8 = 320
    const maxTextOffset = -480; // 600 * 0.8 = 480

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
  height: 500px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  // box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  box-shadow: rgba(47, 50, 53, 0.33) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;

  .title {
    position: absolute;
    display: flex;
    gap: 100px;
    // top: 40px;
    left: 20px;
    width: 300vw;
    will-change: transform;
    transition: transform 0.2s ease;
    // background-color: #e6e6e6;
    background-image: url("/public/bg-wall-h.png");
    background-repeat: repeat;
    @apply py-40;

    span {
      display: block;
      padding-inline: 20px !important;
      white-space: nowrap;
      @apply text-neg-5-45 btn-primary;

      &::before {
        border-top: 2px solid var(--text-primary);
      }
      &:hover::before {
        background-color: var(--text-primary);
      }
    }
  }

  .text {
    position: absolute;
    display: flex;
    top: 140px;
    left: 20px;
    width: 300vw;
    height: 260px;
    overflow-y: hidden;
    z-index: -1;
    will-change: transform;
    transition: transform 0.3s ease;

    @apply text-neg-5-26 mt-40 pb-40;
  }

  .decor {
    display: block;
    height: 40px;
    width: 100%;
    background-color: white;
  }
}
</style>
