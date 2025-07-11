<script setup lang="ts">
import { ref, onMounted } from "vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import { useContactForm, type ContactFormData } from "@/composables/useContactForm";
import bgUnicorn from "@/assets/img/bg-unicorn.png?w=200;350;500;700;900;1200&format=webp&as=srcset";
import ScrollAnimation from "@/components/ScrollAnimation.vue";
import { useScrollTrigger } from "@/composables/useScrollTrigger";

const { setSidebarAnimation } = useScrollTrigger();

const isTitleAnimated = ref(false);

const handleContactIntersection = (isIntersecting: boolean) => {
  setSidebarAnimation(isIntersecting);
  isTitleAnimated.value = isIntersecting;

  if (isIntersecting) {
    document.body.classList.add("is-contact");
  } else {
    document.body.classList.remove("is-contact");
  }
};

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
  accessKey: "583c4c93-d95e-4ae0-8b50-61bfd0171571",
};

const { formData, isSubmitting, isSuccess, serverError, handleSubmit } = useContactForm(contactFormConfig);

const handleTextareaInput = () => {
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
  <section class="s-contact-title" :class="{ animated: isTitleAnimated }">
    <div class="s-contact-title__content">
      <h2 class="reset">LET'S WORK TOGETHER</h2>
      <div class="subtitle">Type fast before this cute moment melts into the void.</div>
    </div>
  </section>

  <ScrollAnimation animation-class="fade-in" :delay="0" :threshold="0.1" :once="false" :emit-intersection="true" @intersection="handleContactIntersection">
    <section id="contact" class="s-contact" :class="{ animated: isTitleAnimated }">
      <form @submit.prevent="handleSubmit">
        <div class="s-contact__form">
          <img :srcset="bgUnicorn" alt="" role="presentation" />
          <span class="s-contact__subtitle">TELL ME ABOUT YOUR PROJECT{{ "\n" }}OR SIMPLY DROP A SWEET MESSAGE</span>

          <div>
            <label for="name" class="sr-only">NAME</label>
            <input type="text" placeholder="Name" id="name" name="name" v-model="formData.name" :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }" :disabled="isSubmitting" required minlength="2" />
          </div>

          <div>
            <label for="company" class="sr-only">Company</label>
            <input type="text" placeholder="Company" id="company" name="company" v-model="formData.company" :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }" :disabled="isSubmitting" required minlength="2" />
          </div>

          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            v-model="formData.email"
            :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
            :disabled="isSubmitting"
            required
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address (e.g. user@example.com)"
          />

          <label for="message" class="sr-only">Message</label>
          <textarea
            :class="{ 'animate-from-bottom--px': isVisible2, 'opacity-0': !isVisible2 }"
            name="message"
            id="message"
            placeholder="Leave a message here"
            ref="textareaRef"
            v-model="formData.message"
            @input="handleTextareaInput"
            rows="1"
            :disabled="isSubmitting"
            required
            minlength="10"
          />

          <div class="relative flex gap-10 items-center mb-4">
            <SuccessMessage :show="isSuccess" />
            <div v-if="serverError" class="error-message">
              {{ serverError }}
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            <span>{{ isSubmitting ? "SENDING..." : "SUBMIT" }}</span>
          </button>
        </div>
      </form>
    </section>
  </ScrollAnimation>
</template>

<style lang="scss">
.s-contact {
  // background-color: var(--bg-primary);
  width: 100%;
  font-family: "Sour Gummy", sans-serif;
  // transition: background-color 0.3s ease;

  &.animated {
    // background-color: var(--bg-body);
  }

  &__subtitle {
    margin-bottom: 30px;
    white-space: pre-line;
    color: var(--text-secondary);
    text-shadow: rgb(251, 53, 254) 0px 0px 5px;
    text-align: center;
    font-family: "Sour Gummy", sans-serif !important;
    line-height: 1.2;
    @apply text-pos-5-20 md:text-pos-5-24 lg:text-pos-5-26;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    @apply py-40 px-20;
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
    overflow: visible;
    border-radius: 30px;
    width: 100%;
    max-width: 750px;
    // background-color: var(--bg-primary);
    box-shadow: rgba(255, 94, 250, 0.25) 0px 50px 100px -20px, rgba(255, 8, 239, 0.3) 0px 30px 60px -30px, rgba(210, 31, 255, 0.35) 0px -2px 6px 0px inset;
    @apply px-20 py-40 sm:px-40 sm:py-50 md:p-60 lg:px-60 lg:pt-60 lg:pb-80;

    & > * {
      z-index: 4;
    }

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
      backdrop-filter: blur(35px);
      background-image: radial-gradient(ellipse at center center, rgba(173, 173, 173, 0.197), rgba(79, 79, 79, 0.148));
      box-shadow: rgba(96, 109, 110, 0.25) 0px 50px 100px -20px, rgba(255, 255, 255, 0.3) 0px 30px 60px -30px, rgba(76, 82, 82, 0.35) 0px -2px 6px 0px inset;
      color: var(--text-secondary);
      outline: none;
      padding-block: 12px;
      padding-right: 24px;
      margin-inline: auto;
      padding-inline: 24px;
      position: relative;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: var(--text-secondary);
      }

      @apply text-pos-5-16 lg:text-pos-5-20 font-normal;

      &:placeholder-shown {
        border-color: rgba(255, 255, 255, 0.222) !important;
      }

      &:focus {
        border-color: rgba(255, 255, 255, 0.222) !important;
      }

      &:valid:not(:placeholder-shown) {
        border-color: rgba(100, 255, 100, 0.8) !important;
      }

      &:invalid:not(:placeholder-shown):not(:user-invalid) {
        border-color: rgba(255, 100, 100, 0.8) !important;
      }

      &:invalid:not(:placeholder-shown):not(:user-valid) {
        border-color: rgba(255, 255, 255, 0.222) !important;
      }
    }

    input {
      border-radius: 999px;
    }

    textarea {
      overflow: hidden;
      resize: none;
      min-height: 120px;
      border-radius: 20px;
      @apply md:min-h-200;
    }
  }

  .btn-submit {
    color: var(--text-secondary);
    text-align: center;
    background-color: rgba(251, 38, 255, 0.6);
    border-radius: 999px;
    width: 100%;
    max-width: 200px;
    transition: letter-spacing 0.5s ease, max-width 0.5s ease;
    line-height: 1.6;
    @apply text-pos-5-18 md:text-pos-5-20 lg:text-pos-5-20 px-24 py-7 font-semibold;

    &:hover {
      width: 100%;
      max-width: 500px;
      @apply text-pos-40-18 md:text-pos-40-20 lg:text-pos-40-20 px-24 font-semibold;
    }
  }

  .error-message {
    position: absolute;
    bottom: -30px;
    right: 0;
    max-width: 270px;
    font-size: 14px;
    z-index: 5;
    background-color: rgba(178, 41, 17, 0.9);
    backdrop-filter: blur(10px);
    padding: 15px;
    border-radius: 10px;
    color: white;
    animation: slideInFromBottom 0.3s ease-out;
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.s-contact-title {
  height: 300px;
  transition: background-color 0.5s ease;
  color: var(--text-secondary);
  @apply pt-80;

  &__content {
    @apply p-40;
  }

  h2 {
    line-height: 1.2;
    transition: color 0.01s ease, font-size 0.5s ease, letter-spacing 0.5s ease;
    @apply text-neg-5-42 lg:text-neg-5-50 3xl:text-neg-5-70;
  }
  .subtitle {
    transition: color 0.01s ease;
    @apply uppercase text-pos-5-18 lg:text-pos-5-20 font-normal pb-60 md:pb-80 lg:pb-120;
  }
  &.animated {
    &__content {
      border-top: 2px solid #ff00aa6b;
    }
    h2 {
      color: var(--text-secondary);
      text-shadow: rgb(251, 0, 255) 0px 0px 10px;
      font-family: "Sour Gummy", sans-serif;

      @apply text-pos-5-32 lg:text-pos-5-60 3xl:text-pos-5-70;
    }
    .subtitle {
      font-family: "Sour Gummy", sans-serif;
      color: #ff00aa6b;
    }

    &__content {
      @apply sm:mt-120 md:mt-140 lg:mt-160;
    }
  }
}
</style>
