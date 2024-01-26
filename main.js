import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(100)

// renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material)

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff)
// pointLight.position.set(5, 5, 5)
// scene.add(pointLight)
// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(50, 50, 0);
scene.add(directionalLight);
// Visual representation of the light source
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);



scene.add(torus)

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

const  controls = new OrbitControls(camera, renderer.domElement)

  // Create the bottom of the ocean
  const oceanColor = 0x8B4513; // Brown color
  const oceanGeometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
  // Manipulate the vertices to create bumps and hills
  const vertices = oceanGeometry.attributes.position.array;
  console.log(vertices.length);
  for (let i = 0; i < vertices.length; i += 3) {
    const amplitude = 15; // Adjust the height of the bumps
    vertices[i + 2] = Math.random() * amplitude;
  }
  oceanGeometry.computeVertexNormals();

  const oceanMaterial = new THREE.MeshStandardMaterial({ color: oceanColor });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.rotation.x = -Math.PI / 2; // Rotate the ocean to be horizontal

  scene.add(ocean);
function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.z += 0.01
  controls.update()
  renderer.render(scene, camera)
}
animate()