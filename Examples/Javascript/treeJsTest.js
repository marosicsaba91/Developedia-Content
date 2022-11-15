import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000);

// ---------------------------------------------

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Camera setup
camera.position.z = 10;
camera.position.y = 2;
camera.position.x = 2;

// Box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff5533});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate() {
  box.rotation.y += 0.05;
  renderer.render(scene, camera);
}

animate();

// Render
renderer.setAnimationLoop(animate);
