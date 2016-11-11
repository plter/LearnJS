///<reference path="Photo.ts"/>
/**
 * Created by plter on 1/31/16.
 */
/// <reference path="../lib/three.d.ts"/>
var WIDTH = 550, HEIGHT = 400;
var scene, camera, renderer, objs = [];
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
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 5, 5);
    scene.add(light);
}
function addObj(obj) {
    scene.add(obj);
    objs.push(obj);
}
function loadImg() {
    var tl = new THREE.TextureLoader();
    tl.load("img.jpg", function (texture) {
        addObj(new Photo(texture));
    });
}
function render() {
    requestAnimationFrame(render);
    for (var k in objs) {
        objs[k].onRender();
    }
    renderer.render(scene, camera);
}
init();
//# sourceMappingURL=app.js.map