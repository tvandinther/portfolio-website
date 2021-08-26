import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function init() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(255, 255, 255);
    scene.fog = new THREE.FogExp2(0xffffff, 0.025);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(-3, 40, 15);

    renderer.render(scene, camera);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x0262b6 });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(30, 5, -15);

    scene.add(torus);

    const pointLight = new THREE.PointLight(0x0262b6);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    function addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0x0262b6 });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3)
            .fill()
            .map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z);
        scene.add(star);
    }

    Array(200).fill().forEach(addStar);

    function moveCamera() {
        let topOffset = document.body.getBoundingClientRect().top;

        topOffset += -1;

        camera.position.z = topOffset * -0.1;
        camera.position.x = topOffset * -0.1;
        camera.rotation.y = topOffset * -0.1;
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;

        controls.update();

        renderer.render(scene, camera);
    }

    animate();
}


