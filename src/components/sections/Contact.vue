div
<script setup lang="ts">
import { ref, onMounted } from "vue";
import VueSVG from "@/components/VueSVG.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import { useContactForm, type ContactFormData } from "@/composables/useContactForm";
import { useComponentTranslation } from "@/i18n";
import bgUnicorn from "@/assets/img/bg-unicorn.png?w=200;350;500;700;900;1200&format=webp&as=srcset";

const t = useComponentTranslation("contact");

const titleRef = ref<HTMLElement>();
const formRowRef = ref<HTMLElement>();
const textareaRef = ref<HTMLTextAreaElement>();

const isVisible = ref(false);
const isVisible2 = ref(false);

const contactFormConfig = {
  onSuccess: (data: ContactFormData) => {
    console.log("Form submitted successfully:", data);
  },
  onError: (error: Error) => {
    console.error("Form submission error:", error);
  },
  // Optionnel : ajouter votre clé API Web3Forms
  // accessKey: 'your-web3forms-access-key'
};

const { formData, isSubmitting, isSuccess, serverError, handleChange, handleSubmit, handleInvalid, handleInput } = useContactForm(contactFormConfig);

const handleTextareaInput = (e: Event) => {
  handleInput(e);
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);

  setTimeout(() => {
    isVisible2.value = true;
  }, 200);
});
</script>

<template>
  <section id="contact" class="s-contact">
    <h6 ref="titleRef" class="s-contact__title">DON'T HESITATE CONTACT ME RIGHT NOW!</h6>

    <form @submit="handleSubmit">
      <div class="s-contact__form">
        <img :srcset="bgUnicorn" alt="" role="presentation" />
        <span class="s-contact__subtitle">LET'S TALK ABOUT YOUR PROJECT{{ "\n" }}OR FEEL FREE TO LEAVE ME A MESSAGE</span>
        <div ref="formRowRef">
          <label for="name" class="sr-only">NAME</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            :value="formData.name"
            @input="(e) => handleChange('name', (e.target as HTMLInputElement).value)"
            @invalid="(e) => handleInvalid(e, 'name')"
            :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
            :disabled="isSubmitting"
            required
            minlength="2"
          />
        </div>
        <div ref="formRowRef">
          <label for="name" class="sr-only">Company</label>
          <input
            type="text"
            placeholder="Company"
            id="company"
            name="company"
            :value="formData.company"
            @input="(e) => handleChange('company', (e.target as HTMLInputElement).value)"
            @invalid="(e) => handleInvalid(e, 'company')"
            :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
            :disabled="isSubmitting"
            required
            minlength="2"
          />
        </div>

        <div>
          <label for="email" class="sr-only">Email"</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            :value="formData.email"
            @input="(e) => handleChange('email', (e.target as HTMLInputElement).value)"
            @invalid="(e) => handleInvalid(e, 'email')"
            :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
            :disabled="isSubmitting"
            required
          />
        </div>
        <div>
          <label for="subject" class="sr-only">Subject</label>
          <input
            type="subject"
            placeholder="Subject"
            id="subject"
            name="subject"
            :value="formData.subject"
            @input="(e) => handleChange('subject', (e.target as HTMLInputElement).value)"
            @invalid="(e) => handleInvalid(e, 'subject')"
            :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
            :disabled="isSubmitting"
            required
          />
        </div>

        <label for="message" class="sr-only">Message</label>
        <textarea
          :class="{ 'animate-from-bottom--px': isVisible2, 'opacity-0': !isVisible2 }"
          name="message"
          id="message"
          placeholder="Message"
          ref="textareaRef"
          :value="formData.message"
          @input="(e) => {
              handleChange('message', (e.target as HTMLTextAreaElement).value);
              handleTextareaInput(e);
            }"
          @invalid="(e) => handleInvalid(e, 'message')"
          rows="1"
          :disabled="isSubmitting"
          required
          minlength="10"
        />

        <div class="relative flex gap-10 items-center mb-4">
          <SuccessMessage :show="isSuccess" />
          <div v-if="serverError" class="animate-from-bottom absolute -bottom-30 right-0 ml-auto max-w-[270px] text-14 z-[3] bg-[#b2291189] backdrop-blur-sm p-15 rounded-[10px]">
            {{ serverError }}
          </div>
        </div>

        <!-- <button type="submit" class="btn-submit" :disabled="isSubmitting">
          <span>{{ isSubmitting ? "Sending..." : "Submit" }}</span>
        </button> -->
      </div>
    </form>
  </section>
</template>

<style lang="scss">
.s-contact {
  background-color: var(--bg-secondary);
  padding: 80px 20px;
  z-index: 3;
  width: 100%;

  &__subtitle {
    margin-bottom: 30px;
    white-space: pre-line;
    color: var(--text-secondary);
    text-shadow: rgba(251, 0, 255, 0.96) 0px 0px 46px;
    text-align: center;
    @apply text-pos-5-18 md:text-pos-5-20 lg:text-pos-5-20;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  div {
    width: 100%;
  }

  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    overflow: hidden;
    border-radius: 30px;
    width: 100%;
    max-width: 750px;
    background-color: transparent;
    & > * {
      z-index: 4;
    }
    box-shadow: rgba(255, 94, 250, 0.25) 0px 50px 100px -20px, rgba(255, 8, 239, 0.3) 0px 30px 60px -30px, rgba(210, 31, 255, 0.35) 0px -2px 6px 0px inset;
    @apply px-20 py-40 sm:px-40 sm:py-50 md:p-60 lg:px-60 lg:pt-70 lg:pb-80;

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      inset: 0;
      border-radius: 30px;
      z-index: 2;
      box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.2);
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      object-fit: cover;
      border-radius: 30px;
      z-index: 1;
    }

    input,
    textarea {
      display: flex;
      width: 100%;
      max-width: 500px;
      background-color: transparent;
      border: 3px solid rgba(255, 255, 255, 0.222);
      backdrop-filter: blur(30px);
      background-color: rgba(95, 95, 95, 0.055);
      text-indent: 24px;

      color: var(--text-secondary);
      text-shadow: rgba(0, 255, 255, 0.96) 0px 0px 20px;
      outline: none;
      padding-block: 12px;
      padding-right: 24px;
      margin-inline: auto;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: var(--text-secondary);
        // text-shadow: rgba(251, 0, 255, 0.96) 0px 0px 20px;
        // padding-left: 20px;
        // z-index: 10;
      }
      @apply text-pos-5-14 lg:text-pos-5-16 font-bold;
    }
    input {
      border-radius: 999px;
    }

    textarea {
      display: flex;
      overflow: hidden;
      resize: none;
      min-height: 200px;
      border-radius: 20px;
      @apply mb-40;
    }
  }
}
</style>
