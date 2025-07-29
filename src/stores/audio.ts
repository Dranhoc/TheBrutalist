import { defineStore } from "pinia";

export const useAudioStore = defineStore("audio", {
  state: () => ({
    isUnlocked: false,
  }),
  actions: {
    unlock() {
      this.isUnlocked = true;
    },
  },
});
