<template>
  <button class="audio-button" @click="unlockAudio" v-if="!audioStarted">
    <span class="icon-speaker">
      <VueSVG src="/svg/speaker.svg" />
      <span class="wave wave-1"></span>
      <span class="wave wave-2"></span>
      <span class="wave wave-3"></span>
    </span>
    <span class="text">TAP TO SOUND</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueSVG from "./VueSVG.vue";

const emit = defineEmits(["unlock"]);

const audioStarted = ref(false);

function unlockAudio() {
  audioStarted.value = true;
  emit("unlock");
}
</script>

<style scoped lang="scss">
.audio-button {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
  @apply scale-75 md:scale-100;

  .text {
    position: absolute;
    bottom: -15px;
    line-height: 0.8;
    width: 300%;
    font-weight: 400;
    @apply text-14;
  }

  .icon-speaker {
    display: flex;
    width: 40px;
  }

  .wave {
    position: absolute;
    border: 3px solid rgb(21, 21, 21);
    border-radius: 50%;
    opacity: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: wave-animation 1.6s infinite ease-out;
    clip-path: polygon(76% 0, 100% 0, 100% 35%, 100% 70%, 100% 100%, 76% 100%, 85% 82%, 90% 62%, 90% 37%, 86% 19%);
  }

  .wave-1 {
    width: 30px;
    height: 30px;
    animation-delay: 0s;
  }

  .wave-2 {
    width: 40px;
    height: 40px;
    animation-delay: 0.8s;
  }

  .wave-3 {
    width: 50px;
    height: 50px;
    animation-delay: 1.6s;
  }
}

@keyframes wave-animation {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
