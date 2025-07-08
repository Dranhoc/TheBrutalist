<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import slenderdev from "@/assets/img/slenderdev.png?w=150;200;300;450&format=webp&as=srcset";

const isSlenderVisible = ref(false);
const footerContent = ref<HTMLElement | null>(null);

let timeoutId: number | null = null;

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        timeoutId = window.setTimeout(() => {
          isSlenderVisible.value = true;
        }, 1500);
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        isSlenderVisible.value = false;
      }
    },
    { threshold: 0.2 }
  );

  if (footerContent.value) {
    observer.observe(footerContent.value);
  }

  onUnmounted(() => {
    observer.disconnect();
    if (timeoutId) clearTimeout(timeoutId);
  });
});
</script>

<template>
  <footer class="footer">
    <div class="footer__slenderdev">
      <img :srcset="slenderdev" alt="" role="presentation" :class="{ 'slender-animate': isSlenderVisible }" />
    </div>
    <div class="footer__content" ref="footerContent">
      <span class="title-4 px-10">Wait...<br />Did you find the SlenderDev&nbsp;?</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  background-color: var(--bg-primary);
  padding-bottom: 10px;
  margin-top: 50px;
  z-index: 1;
  overflow: hidden;

  &__slenderdev {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #eeeeee;
    height: 100vh;
    z-index: 1;

    img {
      position: absolute;
      bottom: 40px;
      height: 60%;
      filter: blur(5px);
      z-index: 2;
      transform: translate(0%, 0%) scale(1);
      opacity: 0;

      &.slender-animate {
        animation: slenderCircle 3s forwards;
      }
    }
  }

  &__content {
    position: relative;
    text-align: center;
    font-family: "Special Elite", system-ui;
    padding-bottom: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #eeeeee;
    // background-color: white;
    color: var(--text-primary);
    z-index: -1;
    @apply flex w-full justify-center;
  }
}
</style>
