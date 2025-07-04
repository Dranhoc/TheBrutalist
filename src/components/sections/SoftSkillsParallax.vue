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
      HOVER STATE ENTHOUSIAST. DARK MODE DEFENDER. PIXEL PERFECTIONIST. UI MOOD READER. DEBUGGING DETECTIVE. RESPONSIVE MINDSET. TYPESCRIPT THERAPIST. DEADLINE SURFER. CSS WHISPERER. GIT CONFLICT NEGOTIATOR. COMPONENT RECYCLER. FONT SNOB (IN A GOOD
      WAY). LOADING SPEED FREAK. BUTTON ALIGNMENT NINJA. COLOR CONTRAST ADVOCATE. MARGIN TWEAKER. FIGMA TRANSLATOR. LOADING SPINNER PHILOSOPHER. CURIOSITY OVERDRIVE. "IT WORKS ON MY MACHINE" DIPLOMAT. EMPATHY-DRIVEN DESIGN. NAMING THING PHILOSOPHER.
      DARK MODE DEFENDER. CSS WHISPERER. DEBUGGING DETECTIVE. PIXEL PERFECTIONIST. HOVER STATE ENTHOUSIAST. DEADLINE SURFER. GIT CONFLICT NEGOTIATOR. UI MOOD READER. RESPONSIVE MINDSET. BUTTON ALIGNMENT NINJA. TYPESCRIPT THERAPIST. FONT SNOB (IN A
      GOOD WAY). COLOR CONTRAST ADVOCATE. LOADING SPINNER PHILOSOPHER. COMPONENT RECYCLER. MARGIN TWEAKER. CURIOSITY OVERDRIVE. "IT WORKS ON MY MACHINE" DIPLOMAT. EMPATHY-DRIVEN DESIGN. NAMING THING PHILOSOPHER. DARK MODE DEFENDER. RESPONSIVE
      MINDSET. PIXEL PERFECTIONIST. GIT CONFLICT NEGOTIATOR. DEBUGGING DETECTIVE. CSS WHISPERER. UI MOOD READER. BUTTON ALIGNMENT NINJA. HOVER STATE ENTHOUSIAST. TYPESCRIPT THERAPIST. DEADLINE SURFER. LOADING SPINNER PHILOSOPHER. COMPONENT RECYCLER.
      MARGIN TWEAKER. FONT SNOB (IN A GOOD WAY). LOADING SPEED FREAK. CURIOSITY OVERDRIVE. COLOR CONTRAST ADVOCATE. "IT WORKS ON MY MACHINE" DIPLOMAT. NAMING THING PHILOSOPHER. EMPATHY-DRIVEN DESIGN. DARK MODE DEFENDER. FIGMA TRANSLATOR. RESPONSIVE
      MINDSET. UI MOOD READER. DEBUGGING DETECTIVE. HOVER STATE ENTHOUSIAST. CSS WHISPERER. GIT CONFLICT NEGOTIATOR. PIXEL PERFECTIONIST. TYPESCRIPT THERAPIST. DEADLINE SURFER. COLOR CONTRAST ADVOCATE. FONT SNOB (IN A GOOD WAY). LOADING SPEED FREAK.
      MARGIN TWEAKER. BUTTON ALIGNMENT NINJA. FIGMA TRANSLATOR. EMPATHY-DRIVEN DESIGN. COMPONENT RECYCLER. LOADING SPINNER PHILOSOPHER. CURIOSITY OVERDRIVE. NAMING THING PHILOSOPHER. "IT WORKS ON MY MACHINE" DIPLOMAT. DARK MODE DEFENDER. HOVER STATE
      ENTHOUSIAST. PIXEL PERFECTIONIST. CSS WHISPERER. UI MOOD READER. GIT CONFLICT NEGOTIATOR. RESPONSIVE MINDSET. DEADLINE SURFER. DEBUGGING DETECTIVE. TYPESCRIPT THERAPIST. COLOR CONTRAST ADVOCATE. FONT SNOB (IN A GOOD WAY). LOADING SPEED FREAK.
      COMPONENT RECYCLER. MARGIN TWEAKER. FIGMA TRANSLATOR. LOADING SPINNER PHILOSOPHER. EMPATHY-DRIVEN DESIGN. CURIOSITY OVERDRIVE. BUTTON ALIGNMENT NINJA. NAMING THING PHILOSOPHER. "IT WORKS ON MY MACHINE" DIPLOMAT. DARK MODE DEFENDER. HOVER STATE
      ENTHOUSIAST. UI MOOD READER. RESPONSIVE MINDSET. GIT CONFLICT NEGOTIATOR. PIXEL PERFECTIONIST. CSS WHISPERER. DEADLINE SURFER. DEBUGGING DETECTIVE. TYPESCRIPT THERAPIST. FONT SNOB (IN A GOOD WAY). COLOR CONTRAST ADVOCATE. LOADING SPINNER
      PHILOSOPHER. COMPONENT RECYCLER. LOADING SPEED FREAK. MARGIN TWEAKER. CURIOSITY OVERDRIVE. FIGMA TRANSLATOR. "IT WORKS ON MY MACHINE" DIPLOMAT. EMPATHY-DRIVEN DESIGN. NAMING THING PHILOSOPHER. DARK MODE DEFENDER. RESPONSIVE MINDSET. HOVER STATE
      ENTHOUSIAST. UI MOOD READER. GIT CONFLICT NEGOTIATOR. CSS WHISPERER. PIXEL PERFECTIONIST. DEADLINE SURFER. DEBUGGING DETECTIVE. TYPESCRIPT THERAPIST. COLOR CONTRAST ADVOCATE. BUTTON ALIGNMENT NINJA. LOADING SPEED FREAK. COMPONENT RECYCLER. FONT
      SNOB (IN A GOOD WAY). MARGIN TWEAKER. FIGMA TRANSLATOR. LOADING SPINNER PHILOSOPHER. EMPATHY-DRIVEN DESIGN. CURIOSITY OVERDRIVE. NAMING THING PHILOSOPHER. "IT WORKS ON MY MACHINE" DIPLOMAT.
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
