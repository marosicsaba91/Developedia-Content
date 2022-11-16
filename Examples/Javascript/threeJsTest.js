import * as T from 'three';
import {OrbitControls} from 'OrbitControls';
import {FBXLoader} from 'FBXLoader';

const renderer = new T.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement);

// SETUP ------------------------------------

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000);
const clock = new T.Clock();

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onWindowResize()


// ASSETS ------------------------------------
const backgroundUrl = '../Assets/StarsBackground.jpg'
const planeUrl = '../Assets/LightPlane.fbx'

const textureLoader = new T.TextureLoader();
const backgroundTexture = textureLoader.load(backgroundUrl);

const fbxLoader = new FBXLoader(planeUrl);


// GAME --------------------------------------

// Background
scene.background = backgroundTexture;
renderer.setClearColor(0x661133)

// Axes Helper
const axesHelper = new T.AxesHelper(100);
scene.add(axesHelper)

// Camera setup
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 10);
orbit.update();

// Light
const ambientLight = new T.AmbientLight(0x661133);
scene.add(ambientLight);

const pointLight1 = new T.PointLight(0xffff55)
pointLight1.power = 10
pointLight1.position.set(5, 5, 0)
pointLight1.castShadow = true
scene.add(pointLight1)

const pointLight2 = new T.PointLight(0x3322ff)
pointLight2.power = 10
pointLight2.position.set(-5, 5, 0)
pointLight2.castShadow = true
scene.add(pointLight2)

const dirLight = new T.DirectionalLight(0x111111)
dirLight.power = 10
dirLight.position.set(-5, 5, 0)
scene.add(dirLight)

// Box
const boxGeometry = new T.BoxGeometry();
const boxMaterial = new T.MeshStandardMaterial({color: 0xffffff});
const box = new T.Mesh(boxGeometry, boxMaterial);
box.position.y = 1
box.castShadow = true
scene.add(box);

// Plane
const planeGeometry = new T.PlaneGeometry(10, 10, 15, 15);
const planeMaterial = new T.MeshStandardMaterial({color: 0xffffff});
const plane = new T.Mesh(planeGeometry, planeMaterial);
plane.rotation.set(-0.5 * Math.PI, 0, 0);
plane.receiveShadow = true
plane.position.y = -0.01
scene.add(plane);

function update() {
  const angleDeg = 90;
  const angleRad = angleDeg * Math.PI / 180;

  const step = clock.getDelta() * angleRad;
  box.rotation.y += step;

  renderer.render(scene, camera)
}


// Render
renderer.setAnimationLoop(update);
