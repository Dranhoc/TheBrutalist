<template>
  <section class="s-bottom">
    <div class="s-bottom__contact">
      <h2 class="title-4">NEED A WEBSITE {{ "\n" }}OR AN APP&nbsp;?{{ "\n" }}LET'S TALK.</h2>
      <a class="contact-link" href=""
        >Contact me
        <figure class="left">
          <VueSVG src="/svg/arrow-left.svg" />
        </figure>
        <figure class="top">
          <VueSVG src="/svg/arrow-top.svg" />
        </figure>
        <figure class="right">
          <VueSVG src="/svg/arrow-right.svg" class="w-full" />
        </figure>
      </a>
    </div>
    <div class="s-bottom__stack">
      <h3 class="title-2">WORK WITH</h3>
      <ul>
        <li>Vue3</li>
        <li>React</li>
        <li>Caffeine</li>
        <li>Typescript</li>
        <li>VITE</li>
        <li>SCSS/Tailwind</li>
        <li>Supabase, Paracetamol, Laravel</li>
        <li>Git, Figma</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import VueSVG from "@/components/VueSVG.vue";
</script>

<style scoped lang="scss">
.s-bottom {
  display: flex;
  flex-direction: column;
  @apply lg:flex-row;

  &__contact {
    // border-bottom: 5px solid black;
    background-color: var(--bg-body);
    // border-top: 5px solid black;
    // box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
    padding-block: 80px;
    padding-inline: 20px;
    white-space: pre-line;
    order: 2;
    @apply lg:w-[65%] lg:order-1;

    .contact-link {
      position: relative;
      display: block;
      font-family: "JetBrains Mono", serif;
      font-size: 18px;
      font-weight: 300;
      text-decoration: underline;
      margin-top: 100px;
      margin-left: 60%;
      @apply md:mt-60;

      .left,
      .right,
      .top {
        position: absolute;
        z-index: 2;
      }
      .left {
        top: 0;
        left: 0;
        transform: translate(-100%, 0%);
        .vue-svg-container {
          svg {
            box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
          }
        }
      }
      .right {
        top: 0;
        left: 0;
        transform: translate(40%, -80%);
      }
      .top {
        top: 0;
        left: 0;
        transform: translate(-30%, -120%);
      }
    }
  }
  &__stack {
    display: flex;
    flex-direction: column;
    color: var(--text-secondary);
    background-color: var(--bg-primary);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    order: 1;
    @apply lg:w-[35%] lg:order-2;

    padding-block: 40px;
    padding-inline: 20px;
    z-index: 5;
    ul {
      margin-top: 20px;
      list-style-type: disc;
      padding-left: 30px;
      li {
        font-family: "JetBrains Mono", serif;
        font-size: 20px;
        padding-left: 10px;
        @apply lg:text-[1.3vw];
      }
    }
  }
}
</style>
