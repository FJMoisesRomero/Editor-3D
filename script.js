// Importar la biblioteca THREE.js y los módulos adicionales
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Crear una escena Three.JS
const scene = new THREE.Scene();
// Crear una nueva cámara con posiciones y ángulos
const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);

// Variables para mantener la posición del mouse
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Variable global para el objeto 3D
let object;

// OrbitControls permite que la cámara se mueva alrededor de la escena
let controls;

// Establecer qué objeto renderizar
let objToRender = 'office_chair';

// Instantiar un cargador para el archivo .gltf
const loader = new GLTFLoader();


// Instantiar un nuevo renderizador y establecer su tamaño
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true permite el fondo transparente
renderer.setSize(document.getElementById("container3D").clientWidth, document.getElementById("container3D").clientHeight);

// Agregar el renderizador al DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Establecer la distancia de la cámara al modelo 3D
camera.position.z = 20;
camera.position.y = 5;
camera.position.x = 10;

// Agregar luces a la escena, para que podamos ver el modelo 3D
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensidad)
topLight.position.set(500, 500, 500); // arriba-izquierda
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "office_chair" ? 5 : 1);
scene.add(ambientLight);

// Agregar un ayudante de cuadrícula a la escena
const gridHelper = new THREE.GridHelper(10, 10, 0x808080, 0x808080); // (tamaño, divisiones, colorLíneaCentral, colorCuadrícula)
gridHelper.position.y = -.4; 
scene.add(gridHelper);

// Esto agrega controles a la cámara, para que podamos rotar / hacer zoom con el mouse
if (objToRender === "office_chair") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Renderizar la escena
function animate() {
  requestAnimationFrame(animate);
  // Aquí podríamos agregar código para actualizar la escena, agregando algún movimiento automático

  // Rotar el modelo continuamente
  if (object && objToRender === "eye") {
    object.rotation.y += .02; // Rota el modelo alrededor del eje y
  }

  renderer.render(scene, camera);
}

// Agregar un listener para redimensionar la ventana y la cámara
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(document.getElementById("container3D").clientWidth, document.getElementById("container3D").clientHeight);
});

// Manejo de clics en las imágenes para cambiar el modelo
document.querySelectorAll('.image-placeholder img').forEach((img, index) => {
    img.addEventListener('click', function() {
        // Determinar qué modelo corresponde a la imagen clicada
        if (index === 0) {
            objToRender = 'chair';
        } else if (index === 1) {
            objToRender = 'chair2';
        } else if (index === 2) {
            objToRender = 'office_chair';
        } else if (index === 3) {
            objToRender = 'gaming_chair';
        } else if (index === 4) {
            objToRender = 'table';
        } else if (index === 5) {
            objToRender = 'wooden_table';
        } else if (index === 6) {
            objToRender = 'folding_table';
        } else if (index === 7) {
            objToRender = 'square_picnic_table';
        }
        

        // Limpiar la escena actual
        scene.remove(object);

        // Cargar el nuevo modelo
        loader.load(
            `models/${objToRender}/scene.gltf`,
            function (gltf) {
                object = gltf.scene;
                if (objToRender === 'chair') {
                  object.position.y = -.4;
              } else {
                  object.position.y = .1;
              }
              // Escalar el modelo si es gaming_chair
              if (objToRender === 'gaming_chair') {
                object.scale.set(0.04, 0.04, 0.04); // Ajusta el factor de escala según sea necesario
            }
                scene.add(object);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% cargado');
            },
            function (error) {
                console.error(error);
            }
        );
    });
});

// Iniciar el renderizado 3D
animate();
