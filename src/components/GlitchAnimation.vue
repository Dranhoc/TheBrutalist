<template>
  <span
    class="glitch-stack"
    :class="{
      'glitch-disabled': !enabled,
      'glitch-hover': trigger === 'hover',
    }"
    :style="{ color: color }"
  >
    <span v-for="n in 3" :key="n" :style="{ '--index': n - 1 }">
      {{ text }}
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  interval?: number;
  duration?: number;
  enabled?: boolean;
  color?: string;
  trigger?: "auto" | "hover";
}

withDefaults(defineProps<Props>(), {
  interval: 4,
  duration: 300,
  enabled: true,
  color: "inherit",
  trigger: "auto",
});
</script>

<style scoped lang="scss">
.glitch-stack {
  display: grid;
  grid-template-columns: 1fr;
  font-weight: inherit;

  span {
    font-weight: bold;
    grid-row-start: 1;
    grid-column-start: 1;
    --stacks: 3;
    --stack-height: calc(100% / var(--stacks) - 1px);
    --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
    --clip-top: calc(var(--stack-height) * var(--index));
    --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
    clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  }

  span:nth-child(odd) {
    --glitch-translate: 8px;
  }

  span:nth-child(even) {
    --glitch-translate: -8px;
  }
}

// Animation automatique toutes les 4s
.glitch-stack:not(.glitch-disabled):not(.glitch-hover) span {
  animation: stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards calc(var(--index) * 120ms), glitchCycle 4s ease infinite 1s;
}

// Animation au hover
.glitch-hover span {
  animation: stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards calc(var(--index) * 120ms);
}

.glitch-hover:hover span {
  animation: stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards calc(var(--index) * 120ms), glitch 300ms ease;
}

// Animation d'entrée initiale
@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow: -2px 3px 0 #ff0040, 2px -3px 0 #00ff88;
  }
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow: 2px -3px 0 #ff0040, -2px 3px 0 #00ff88;
  }
  100% {
    text-shadow: none;
  }
}

// Animation de glitch pour hover ET auto (300ms exactement)
@keyframes glitch {
  0% {
    text-shadow: -2px 3px 0 #ff0040, 2px -3px 0 #00ff88;
    transform: translate(var(--glitch-translate));
  }
  5% {
    text-shadow: 2px -3px 0 #ff0040, -2px 3px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -1));
  }
  10% {
    text-shadow: -3px 2px 0 #ff0040, 3px -2px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * 1.5));
  }
  15% {
    text-shadow: 3px -2px 0 #ff0040, -3px 2px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -1.5));
  }
  20% {
    text-shadow: -1px 4px 0 #ff0040, 1px -4px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * 0.8));
  }
  25% {
    text-shadow: 1px -4px 0 #ff0040, -1px 4px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -0.8));
  }
  30% {
    text-shadow: -4px 1px 0 #ff0040, 4px -1px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * 1.2));
  }
  35% {
    text-shadow: 4px -1px 0 #ff0040, -4px 1px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -1.2));
  }
  40% {
    text-shadow: -2px 2px 0 #ff0040, 2px -2px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * 0.6));
  }
  45% {
    text-shadow: 2px -2px 0 #ff0040, -2px 2px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -0.6));
  }
  50% {
    text-shadow: -1px 3px 0 #ff0040, 1px -3px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * 0.4));
  }
  55% {
    text-shadow: 1px -3px 0 #ff0040, -1px 3px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -0.4));
  }
  60% {
    text-shadow: -3px 0px 0 #ff0040, 3px 0px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * 0.2));
  }
  65% {
    text-shadow: 3px 0px 0 #ff0040, -3px 0px 0 #00ff88;
    transform: translate(calc(var(--glitch-translate) * -0.2));
  }
  70%,
  100% {
    text-shadow: none;
    transform: none;
  }
}

@keyframes glitchCycle {
  0% {
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  4%,
  100% {
    text-shadow: none;
    transform: none;
  }
}
</style>
