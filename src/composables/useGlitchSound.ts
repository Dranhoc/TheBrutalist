import { useAudioStore } from "@/stores/audio";
import hoverGlitchURL from "@/assets/sounds/hover-glitch.mp3";

let audioContext: AudioContext | null = null;
let buffer: AudioBuffer | null = null;

async function initSound() {
  if (!audioContext) {
    audioContext = new AudioContext();
    const response = await fetch(hoverGlitchURL);
    const arrayBuffer = await response.arrayBuffer();
    buffer = await audioContext.decodeAudioData(arrayBuffer);
  }
}

export default function useGlitchSound() {
  const audioStore = useAudioStore();

  const playGlitch = () => {
    if (!buffer || !audioContext || !audioStore.isUnlocked) return;

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;

    source.connect(gainNode).connect(audioContext.destination);
    source.start(0);
  };

  return {
    initSound,
    playGlitch,
  };
}
