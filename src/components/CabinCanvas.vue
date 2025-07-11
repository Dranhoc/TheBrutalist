<template>
  <div ref="containerRef" class="magnifier-canvas">
    <div class="slenderdev" ref="slenderdevRef">
      <img src="/slenderdev.png" alt="" role="presentation" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";

const containerRef = ref(null);
const slenderdevRef = ref(null);
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
  loader.load("/cabin-mobile.png", (texture) => {
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
  if (!slenderdevRef.value || !containerRef.value) return;

  const containerBounds = containerRef.value.getBoundingClientRect();
  const textBounds = slenderdevRef.value.getBoundingClientRect();

  const textRelativeX = mouseX - textBounds.left;
  const textRelativeY = mouseY - textBounds.top;

  const loupeRadius = (containerBounds.width * 0.2) / 2;

  const textCenterX = textBounds.left + textBounds.width / 2;
  const textCenterY = textBounds.top + textBounds.height / 2;

  const distance = Math.sqrt(Math.pow(mouseX - textCenterX, 2) + Math.pow(mouseY - textCenterY, 2));

  if (distance < loupeRadius * 2) {
    const clipPath = `circle(${loupeRadius}px at ${textRelativeX}px ${textRelativeY}px)`;
    slenderdevRef.value.style.clipPath = clipPath;
    slenderdevRef.value.style.opacity = "1";
  } else {
    hideText();
  }
}

function hideText() {
  if (slenderdevRef.value) {
    slenderdevRef.value.style.clipPath = "circle(0px at -1000px -1000px)";
    slenderdevRef.value.style.opacity = "0";
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
  position: relative;
  overflow: hidden;
  cursor: none;
  box-shadow: rgba(181, 181, 181, 0.35) 5px 0px 20px;
  max-height: 700px;
  max-width: 700px;
  aspect-ratio: 1/1;
  @apply lg:!ml-0;
}

@screen md {
  .magnifier-canvas {
    border-radius: 20px;
  }
}

.slenderdev {
  position: absolute;
  bottom: 15%;
  left: 30%;
  width: 20px;
  transition: opacity 0.1s ease, clip-path 0.05s ease-out;
  opacity: 0;
  clip-path: circle(0px at -1000px -1000px);
  @apply sm:w-30 md:w-20 xl:w-30 4xl:w-40;
}

:deep(canvas) {
  display: block;
  max-height: 700px;
  max-width: 700px;
  object-fit: cover;
  object-position: center bottom;
  @apply md:rounded-[20px];
}
</style>
