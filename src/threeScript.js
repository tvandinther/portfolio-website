import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelUrl from './assets/abstract_ball/scene.gltf?url'
// import modelUrl from './assets/tropical_island/scene.glb?url'

// import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect } from "postprocessing";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

export function init() {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(255, 255, 255);
    scene.fog = new THREE.FogExp2(0xf3f3f3, 0.025);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new ShaderPass(CopyShader))

    camera.position.set(0, 3, 0);

    renderer.render(scene, camera);

    const loader = new GLTFLoader();
    let model = new THREE.Group();

    loader.load( modelUrl, function ( gltf ) {
        model.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    } );

    scene.add(model);

    const spotLight = new THREE.SpotLight(0xFDF4FF , 1, 50, Math.PI / 8, 1);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    spotLight.position.set(0, -1, 1);
    spotLight.target = model;
    camera.add(spotLight);
    scene.add(camera);

    // const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    function moveCamera() {
        let topOffset = document.body.getBoundingClientRect().top;

        topOffset += -1;

        model.setRotationFromAxisAngle(new THREE.Vector3(0.54, 0.31, 0.84), topOffset * -0.001);

        // camera.position.z = topOffset * -0.1;
        // camera.position.x = topOffset * -0.1;
        // camera.rotation.y = topOffset * -0.1;
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        controls.update();

        composer.render(clock.getDelta());
    }

    animate();
}


