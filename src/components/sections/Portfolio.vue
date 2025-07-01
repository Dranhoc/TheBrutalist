<script setup lang="ts">
import VueSVG from "@/components/VueSVG.vue";
</script>

<template>
  <section class="s-portfolio">
    <div>
      <h2 class="title-5 relative">
        WORK
        <figure class="sticker"><VueSVG src="/public/svg/sticker-new.svg"></VueSVG></figure>
      </h2>
    </div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div class="wtf col-span-2 title-5">WHY THIS ?</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div class="title-6 pl-20">AND MORE...</div>
  </section>
</template>

<style scoped lang="scss">
.s-portfolio {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0px;
  border-bottom: 4px solid black;
  & > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    outline: 2px solid black;
    aspect-ratio: 1/1;
  }
  .wtf {
    aspect-ratio: 2/1;
  }

  .sticker {
    height: 1px;
    width: 8vw;
    .vue-container-svg {
      width: 100%;
    }
    transform: translateY(-1.1em) translateX(1.2em);
  }
}
</style>
