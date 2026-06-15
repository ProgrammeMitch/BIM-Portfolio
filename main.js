// --- THREE.JS IMMERSIVE BACKGROUND ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a hyper-granular particle system to mimic point clouds/BIM nodes
const geometry = new THREE.BufferGeometry();
const particlesCount = 3000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles across a wide area
    posArray[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Subtle, tech-blue material
const material = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

camera.position.z = 3;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Slow, autonomous rotation
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

animate();

// Handle browser resizing seamlessly
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});