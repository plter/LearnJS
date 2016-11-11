///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 1/31/16.
 */

class Photo extends THREE.Sprite {


    constructor(texture:THREE.Texture) {

        this.frames = 0;

        var material = new THREE.SpriteMaterial();
        material.map = texture;
        material.color = new THREE.Color(0xffffff);

        super(material);
    }


    private frames:number;

    public onRender() {
        this.frames += 0.1;
        this.position.z = 0.5 * Math.sin(this.frames);
    }
}