<template>
  <div ref="containerRef" class="magnifier-canvas">
    <div class="secret-text" ref="secretTextRef">
      Where weird ideas<br />
      become real
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";

const containerRef = ref(null);
const secretTextRef = ref(null);
let renderer;
let scene;
let camera;
let uniforms;
let animationFrameId;

// Shaders
const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform float uZoom;
  uniform float uRadius;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(uTex, uv);
    
    vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 normalizedMouse = uMouse;
    vec2 normalizedUv = uv;
    
    normalizedMouse.x *= aspectRatio.x;
    normalizedUv.x *= aspectRatio.x;
    
    float dist = distance(normalizedUv, normalizedMouse);
    
    if (dist < uRadius && uMouse.x >= 0.0 && uMouse.y >= 0.0) {
      vec2 offset = uv - uMouse;
      float strength = 1.0 - smoothstep(0.0, uRadius, dist);
      
      float angle = atan(offset.y, offset.x);
      float radius = length(offset);
      
      float wave = sin(dist * 40.0 + uTime * 3.0) * 0.005 * strength;
      radius += wave;
      
      radius /= (1.0 + uZoom * strength);
      
      vec2 magnifiedUv = uMouse + vec2(cos(angle), sin(angle)) * radius;
      magnifiedUv = clamp(magnifiedUv, 0.0, 1.0);
      
      color = texture2D(uTex, magnifiedUv);
      
      float glow = (1.0 - dist / uRadius) * 0.1;
      color.rgb += glow;
    }
    
    gl_FragColor = color;
  }
`;

onMounted(() => {
  if (!containerRef.value) return;
  setTimeout(() => {
    initCanvas();
  }, 100);
});

function initCanvas() {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const width = Math.floor(rect.width) || 800;
  const height = Math.floor(rect.height) || 600;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
    preserveDrawingBuffer: true,
  });

  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";

  containerRef.value.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.load("/office-mobile.png", (texture) => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.flipY = true;

    createMaterial(texture, width, height);
  });
}

function createMaterial(texture, width, height) {
  uniforms = {
    uTex: { value: texture },
    uMouse: { value: new THREE.Vector2(-1, -1) },
    uZoom: { value: 2.0 },
    uRadius: { value: 0.2 },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(width, height) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const animate = () => {
    if (uniforms) {
      uniforms.uTime.value += 0.016;
    }
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();

  // Event listeners
  const updateMouse = (e) => {
    if (!containerRef.value || !uniforms) return;

    const bounds = containerRef.value.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = 1 - (e.clientY - bounds.top) / bounds.height;

    uniforms.uMouse.value.set(x, y);
    checkTextReveal(e.clientX, e.clientY);
  };

  const hideMouse = () => {
    if (uniforms) {
      uniforms.uMouse.value.set(-1, -1);
    }
    hideText();
  };

  containerRef.value.addEventListener("mousemove", updateMouse);
  containerRef.value.addEventListener("mouseleave", hideMouse);
}

function checkTextReveal(mouseX, mouseY) {
  if (!secretTextRef.value || !containerRef.value) return;

  const containerBounds = containerRef.value.getBoundingClientRect();
  const textBounds = secretTextRef.value.getBoundingClientRect();

  const textRelativeX = mouseX - textBounds.left;
  const textRelativeY = mouseY - textBounds.top;

  const loupeRadius = (containerBounds.width * 0.2) / 2;

  const textCenterX = textBounds.left + textBounds.width / 2;
  const textCenterY = textBounds.top + textBounds.height / 2;

  const distance = Math.sqrt(Math.pow(mouseX - textCenterX, 2) + Math.pow(mouseY - textCenterY, 2));

  if (distance < loupeRadius * 2) {
    const clipPath = `circle(${loupeRadius}px at ${textRelativeX}px ${textRelativeY}px)`;
    secretTextRef.value.style.clipPath = clipPath;
    secretTextRef.value.style.opacity = "1";
  } else {
    hideText();
  }
}

function hideText() {
  if (secretTextRef.value) {
    secretTextRef.value.style.clipPath = "circle(0px at -1000px -1000px)";
    secretTextRef.value.style.opacity = "0";
  }
}

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (renderer) {
    renderer.dispose();
    if (containerRef.value && renderer.domElement) {
      containerRef.value.removeChild(renderer.domElement);
    }
  }
});
</script>

<style scoped>
.magnifier-canvas {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  overflow: hidden;
  cursor: none;
  box-shadow: rgba(181, 181, 181, 0.35) -5px 0px 20px;
}

@media (min-width: 768px) {
  .magnifier-canvas {
    border-radius: 20px;
    width: calc(100% - 20px);
  }
}

.secret-text {
  position: absolute;
  top: 30%;
  right: 14%;
  text-align: center;
  font-family: "Permanent Marker", cursive;
  font-size: 3vw;
  font-weight: 400;
  color: var(--pink-color);
  pointer-events: none;
  z-index: 10;
  transform: rotate(10deg);
  animation: pulse 3s ease-in-out infinite;
}

@media (min-width: 768px) {
  .secret-text {
    animation: unset;
    font-size: 2vw;
    transition: opacity 0.1s ease, clip-path 0.05s ease-out;
    opacity: 0;
    clip-path: circle(0px at -1000px -1000px);
    font-size: 1.2vw;
  }
}

:deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
