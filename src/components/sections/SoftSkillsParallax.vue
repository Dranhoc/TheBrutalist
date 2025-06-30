<template>
  <section class="s-softskills" ref="sectionRef">
    <div class="title" ref="titleRef" :style="{ transform: `translateX(${titleOffset}px)` }">
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

const sectionRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const titleOffset = ref(-600); // Position de base à -600px
const textOffset = ref(0);

let ticking = false;

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  // Calculer la position initiale
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

  // Calculer le pourcentage de visibilité de la section
  const sectionTop = sectionRect.top;
  const sectionBottom = sectionRect.bottom;

  // Décaler le déclenchement de 300px plus bas
  const triggerOffset = 100;
  const adjustedSectionTop = sectionTop + triggerOffset;

  // La section est visible quand son bottom > triggerOffset et son top ajusté < windowHeight
  const isVisible = sectionBottom > triggerOffset && adjustedSectionTop < windowHeight;

  if (isVisible) {
    // Calculer le progress avec le décalage
    const progress = Math.max(0, Math.min(1, (windowHeight - adjustedSectionTop) / (windowHeight + sectionHeight)));

    // Réduire la vitesse de 20% (multiplier par 0.8)
    const maxTitleOffset = 320; // 400 * 0.8 = 320
    const maxTextOffset = -480; // 600 * 0.8 = 480

    // Position de base du titre à -600px pour qu'il soit visible en continu
    const baseTitleOffset = -400;

    // Appliquer des courbes d'easing différentes
    const titleProgress = easeOutCubic(progress);
    const textProgress = easeInOutCubic(progress);

    titleOffset.value = baseTitleOffset + titleProgress * maxTitleOffset;
    textOffset.value = textProgress * maxTextOffset;
  } else {
    // Quand la section n'est pas visible, garder le titre à sa position de base
    titleOffset.value = -600;
    textOffset.value = 0;
  }

  ticking = false;
}

// Fonctions d'easing pour des mouvements plus naturels
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
  border-bottom: 5px solid black;

  .title {
    position: absolute;
    display: flex;
    gap: 100px;
    top: 40px;
    left: 20px;
    width: 300vw;
    will-change: transform; // Optimisation pour les animations
    transition: transform 0.2s ease;

    span {
      @apply text-neg-5-45;
      white-space: nowrap;
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
    will-change: transform; // Optimisation pour les animations
    transition: transform 0.3s ease;
    @apply text-neg-5-26;
  }
}
</style>
