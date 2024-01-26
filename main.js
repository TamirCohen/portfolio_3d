import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

function addTree(scene) {
  // Create trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 10);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  // Create leaves
  const leavesGeometry = new THREE.ConeGeometry(5, 5, 4);
  const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x008000 });
  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);

  // Position leaves
  leaves.position.y = 5;

  // Create tree
  const tree = new THREE.Group();
  tree.add(trunk);
  tree.add(leaves);

  // Position tree at a random location
  const range = 100;
  const x = Math.random() * range - range / 2;
  const z = Math.random() * range - range / 2;
  tree.position.set(x, 5, z);

  // Add tree to scene
  scene.add(tree);
}

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(50)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(200, 200, 0);
scene.background = new THREE.Color(0x0099cc);

scene.add(directionalLight);
// Visual representation of the light source
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);

// Create a sphere that represents the sun
const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

// Position the sun at the same position as the directional light
sun.position.copy(directionalLight.position);

// Add the sun to the scene
scene.add(sun);


const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

const  controls = new OrbitControls(camera, renderer.domElement)

// Create the bottom of the ocean
const groundColor = 0x8B4513; // Brown color
const groundGeometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
// Manipulate the vertices to create bumps and hills
const vertices = groundGeometry.attributes.position.array;
console.log(vertices.length);
for (let i = 0; i < vertices.length; i += 3) {
  const amplitude = 3; // Adjust the height of the bumps
  vertices[i + 2] = Math.random() * amplitude;
}
groundGeometry.computeVertexNormals();

const groundMaterial = new THREE.MeshStandardMaterial({ color: groundColor });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the ground to be horizontal

scene.add(ground);

addTree(scene);


// Choose 50 location to create the trees, and add them to the scene
for (let i = 0; i < 60; i++) {
  addTree(scene);
}


function animate() {
  requestAnimationFrame(animate)
  // torus.rotation.x += 0.01
  // torus.rotation.z += 0.01
  controls.update()
  renderer.render(scene, camera)
}
animate()