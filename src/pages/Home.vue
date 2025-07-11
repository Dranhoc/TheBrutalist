<script setup lang="ts">
import { useSEO } from "@/composables/useSEO";

import Welcome from "@/components/sections/Welcome.vue";
import About from "@/components/sections/About.vue";
import Slider from "@/components/sections/Slider.vue";
import TrustMe from "@/components/sections/TrustMe.vue";
import Contact from "@/components/sections/Contact.vue";
import Footer from "@/components/sections/Footer.vue";

useSEO({
  title: "SlenderDev - Front-end Developer Portfolio",
  description: "SlenderDev - Front-end developer from Liège (Belgium). Strange but friendly web experiences by Christophe Leroy ",
  keywords: ["Front-end developer", "Web portfolio", "Creative developer", "Web Agency", "Vue.js", "Belgium", "Liège", "slenderdev", "Freelance developer"],
  url: "https://www.slenderdev.be/",
  image: "og-home.jpg",
});
</script>

<template>
  <main class="main">
    <Welcome />
    <About />
    <Slider />
    <TrustMe />
    <Contact />
    <Footer />
  </main>
</template>

<style scoped lang="scss"></style>
