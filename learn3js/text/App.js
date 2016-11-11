/**
 * Created by plter on 3/15/16.
 */

var camera, renderer, scene, textMesh, textMeshParent;

function main() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(550, 400);

    camera = new THREE.PerspectiveCamera(90, 550 / 400, 0.01, 1000);
    camera.position.z = 1;

    scene = new THREE.Scene();

    document.body.appendChild(renderer.domElement);

    createParent();
    addLight();
    render();

    loadFont();
}

function createParent() {
    textMeshParent = new THREE.Object3D();
    textMeshParent.position.z = -5;
    scene.add(textMeshParent);
}

function addLight() {
    var light = new THREE.PointLight(0x00ffff, 1, 1000);
    light.position.set(0, 1, 1);
    scene.add(light);
}


function render() {
    textMeshParent.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function loadFont() {
    var fl = new THREE.FontLoader();
    fl.load("helvetiker_regular.typeface.js", function (font) {
        addText(font);
    });
}

function addText(font) {
    var geom = new THREE.TextGeometry("Hello World", {
        size: 1,
        height: 0.3,
        font: font
    });

    var mater = new THREE.MeshLambertMaterial({color: 0xffffff});
    textMesh = new THREE.Mesh(geom, mater);
    textMeshParent.add(textMesh);

    var box = new THREE.Box3().setFromObject(textMesh);
    var halfWidth = (box.max.x - box.min.x) / 2;
    textMesh.position.x = -halfWidth;
}


main();

