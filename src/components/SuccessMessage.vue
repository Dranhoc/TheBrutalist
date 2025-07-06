<script setup lang="ts">
interface Props {
  show: boolean;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: "Thank you, your message has been sent successfully. I'll get back to you within 48 hours. See you soon.",
});
</script>

<template>
  <div v-if="show" class="animate-from-bottom absolute -bottom-0 left-[calc(50%-135px)] max-w-[270px] text-16 uppercase z-[3] bg-emerald-400/30 backdrop-blur-sm p-20 rounded-[20px] text-slate-500">
    {{ message }}
  </div>
</template>
