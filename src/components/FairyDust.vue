<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from "vue";

const props = defineProps<{ x: number; y: number }>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  color: string;
}

const particles: Particle[] = [];

function createParticle() {
  const angleMin = Math.PI / 4; // 45°
  const angleMax = (3 * Math.PI) / 4; // 135°
  const speed = Math.random() * 4; // Vitesse max 4, tu peux ajuster

  const angle = angleMin + Math.random() * (angleMax - angleMin);
  const vx = speed * Math.cos(angle);
  const vy = speed * Math.sin(angle);
  particles.push({
    x: props.x,
    y: props.y,
    vx,
    vy,
    alpha: 1,
    radius: 2,
    color: "162, 91, 255",
  });
}

function animate() {
  if (!ctx || !canvasRef.value) return;

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
    }
  });

  animationFrameId = requestAnimationFrame(animate);
}

function resizeCanvas() {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
}

onMounted(() => {
  if (!canvasRef.value) return;
  const context = canvasRef.value.getContext("2d");
  if (!context) return;
  ctx = context;

  resizeCanvas();
  animate();
  window.addEventListener("resize", resizeCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("resize", resizeCanvas);
});

watch(
  () => [props.x, props.y],
  () => {
    for (let i = 0; i < 3; i++) createParticle();
  }
);
</script>

<template>
  <canvas ref="canvasRef" class="fairy-dust-canvas"></canvas>
</template>

<style scoped>
.fairy-dust-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>
