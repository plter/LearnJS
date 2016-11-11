///<reference path="Photo.ts"/>
/**
 * Created by plter on 1/31/16.
 */
/// <reference path="../lib/three.d.ts"/>

const WIDTH = 550, HEIGHT = 400;
let scene, camera, renderer, objs = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    addLight();
    render();
    loadImg();
}


function addLight() {
    let light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 5, 5);
    scene.add(light);
}


function addObj(obj:THREE.Object3D){
    scene.add(obj);
    objs.push(obj);
}

function loadImg(){
    let tl = new THREE.TextureLoader();
    tl.load("img.jpg", function (texture:THREE.Texture) {
        addObj(new Photo(texture));
    });
}


function render() {
    requestAnimationFrame(render);

    for (let k in objs) {
        objs[k].onRender();
    }

    renderer.render(scene, camera);
}

init();