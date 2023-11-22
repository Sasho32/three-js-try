import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(5, 0.5, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torusTexture = new THREE.TextureLoader().load('red_texture.jpg');
const material = new THREE.MeshStandardMaterial({ map: torusTexture });
const torus = new THREE.Mesh(geometry, material);


scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  // const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  // const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const material = new THREE.MeshStandardMaterial({ color: 0xA5ADAD });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load('jeff.png');
const jeffTexture = new THREE.TextureLoader().load('wood.jpg');
const jupiterTexture = new THREE.TextureLoader().load('jupiter.webp');

// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
// const jeff = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ map: jeffTexture }));
const jupiter = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ map: jupiterTexture }));

const CSKAGeometry = new THREE.BoxGeometry(4, 4, 4);

// Load textures
const textureLoader = new THREE.TextureLoader();
const c_texture = textureLoader.load('c_texture.png');
const s_texture = textureLoader.load('s_texture.png');
const k_texture = textureLoader.load('k_texture.png');
const a_texture = textureLoader.load('a_texture.png');
const black_texture = textureLoader.load('black_texture.png');


// Create materials with the specified textures
const materials = [
    new THREE.MeshBasicMaterial({ map: s_texture }),    // Right
    new THREE.MeshBasicMaterial({ map: a_texture }),  // Left
    new THREE.MeshBasicMaterial({ map: black_texture }),    // Up
    new THREE.MeshBasicMaterial({ map: black_texture }),    // Down
    new THREE.MeshBasicMaterial({ map: c_texture }),    // Front
    new THREE.MeshBasicMaterial({ map: k_texture }),  // Back
];

// Create the cube with the specified materials
const cube = new THREE.Mesh(CSKAGeometry, materials);

// Add the cube to the scene
scene.add(cube);

// cube.position.x = 5;
// cube.position.y = 2;
// cube.position.z = 0;



// ---------------CSKA-------------------------------->


// scene.add(jeff);
scene.add(jupiter);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);


// moon.position.z = 30;
moon.position.z = 5;
moon.position.x = -10;

// moon.position.setX(-10);

// jeff.position.x = -5;
// jeff.position.z = -10;
torus.position.x = -5;
torus.position.z = -10;
// jeff.position.x = 2;
jupiter.position.x = 5;
// jupiter.position.y = 10;
jupiter.position.z = -20;
cube.position.x = -5;
cube.position.z = -10;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// ---------------CSKA-------------------------------->



// Animation Loop



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;
  // jeff.rotation.x += 0.005;
  moon.rotation.y += 0.01;
  // jeff.rotation.y += 0.01;
  jupiter.rotation.y += 0.01;
  
  // cube.rotation.x += 0.01;
  cube.rotation.y -= 0.03;
  // controls.update();

  renderer.render(scene, camera);
}

animate();
