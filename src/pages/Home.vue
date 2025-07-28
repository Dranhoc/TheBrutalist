<script setup lang="ts">
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";

import Welcome from "@/components/sections/Welcome.vue";
import About from "@/components/sections/About.vue";
import Work from "@/components/sections/Work.vue";
import TrustMe from "@/components/sections/TrustMe.vue";
import Contact from "@/components/sections/Contact.vue";
import Footer from "@/components/sections/Footer.vue";

import BGsound from "@/assets/sounds/bg-suspense-without-bell.mp3";

let audioContext: AudioContext;
let buffer: AudioBuffer | null = null;
let isPlaying = false;

async function loadAndSetupSound(url: string) {
  audioContext = new AudioContext();
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  buffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playBackgroundLoop() {
  if (!audioContext || !buffer || isPlaying) return;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1.5;

  source.connect(gainNode).connect(audioContext.destination);
  source.start(0);
  isPlaying = true;
}

onMounted(() => {
  loadAndSetupSound(BGsound);

  const unlockAudio = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }
    playBackgroundLoop();
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };

  window.addEventListener("click", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
});

useSEO({
  title: "SlenderDev - Front-end Developer Portfolio",
  description: "SlenderDev - Front-end developer from Liège (Belgium). Strange but friendly web experiences by Christophe Leroy",
  keywords: ["Front-end developer", "Web portfolio", "Creative developer", "Web Agency", "Vue.js", "Belgium", "Liège", "slenderdev", "Freelance developer"],
  url: "https://www.slenderdev.be/",
  image: "og-home.jpg",
});
</script>

<template>
  <main class="main">
    <Welcome />
    <About />
    <Work />
    <TrustMe />
    <Contact />
    <Footer />
  </main>
</template>

<style scoped lang="scss"></style>
