import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from '../BabylonScene'; // import the component above linking to file we just created.

export default class Viewer extends Component<{}, {}> {

    constructor(props) {
        super(props)
        this.theScene = undefined;
        this.cursor = undefined;
        this.blockList = undefined;
    }

    renderCursor = (x, y, z) => {
        this.cursor.position.x = x;
        this.cursor.position.y = y;
        this.cursor.position.z = z;
    }
    

    renderBlock = (loc, col) => {
        const block = BABYLON.Mesh.CreateBox(loc,1, this.theScene);
        block.position.x = parseInt("0x"+loc.substring(0,1));
        block.position.y = parseInt("0x"+loc.substring(1,2));
        block.position.z = parseInt("0x"+loc.substring(2,3));

        var r = parseInt("0x"+col.substring(0,2)) / 255;
        var g = parseInt("0x"+col.substring(2,4)) / 255;
        var b = parseInt("0x"+col.substring(4,6)) / 255;

        var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.theScene);
        myMaterial.diffuseColor = new BABYLON.Color3(r, g, b);
        block.material = myMaterial;

        try {
            this.blockList.push(block);
        } catch (TypeError) {
            this.blockList = [block];   
        }
    }

    renderChunk = (loc, col) => {
        for(var i=0;i<loc.length;i++){
            this.renderBlock(loc[i],col[i]);
        }
    }

    removeBlock = (i) => {
        if(this.blockList[i] !== undefined){
            this.blockList[i].dispose();
            this.blockList.splice(i,1);
        }
    }

    createChunkFrame = () => {
        BABYLON.Mesh.CreateLines("x0-1",[new BABYLON.Vector3(-0.5, -0.5, -0.5),new BABYLON.Vector3(15.5, -0.5, -0.5),],this.theScene);
        BABYLON.Mesh.CreateLines("x0-2",[new BABYLON.Vector3(-0.5, 15.5, -0.5),new BABYLON.Vector3(15.5, 15.5, -0.5),],this.theScene);
        BABYLON.Mesh.CreateLines("x0-2",[new BABYLON.Vector3(-0.5, -0.5, 15.5),new BABYLON.Vector3(15.5, -0.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("x0-3",[new BABYLON.Vector3(-0.5, 15.5, 15.5),new BABYLON.Vector3(15.5, 15.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("y0-1",[new BABYLON.Vector3(-0.5, -0.5, -0.5),new BABYLON.Vector3(-0.5, -0.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("y0-2",[new BABYLON.Vector3(15.5, -0.5, -0.5),new BABYLON.Vector3(15.5, -0.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("y0-3",[new BABYLON.Vector3(15.5, 15.5, -0.5),new BABYLON.Vector3(15.5, 15.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("y0-4",[new BABYLON.Vector3(-0.5, 15.5, -0.5),new BABYLON.Vector3(-0.5, 15.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("z0-1",[new BABYLON.Vector3(-0.5, -0.5, -0.5),new BABYLON.Vector3(-0.5, 15.5, -0.5),],this.theScene);
        BABYLON.Mesh.CreateLines("z0-2",[new BABYLON.Vector3(15.5, -0.5, -0.5),new BABYLON.Vector3(15.5, 15.5, -0.5),],this.theScene);
        BABYLON.Mesh.CreateLines("z0-3",[new BABYLON.Vector3(15.5, -0.5, 15.5),new BABYLON.Vector3(15.5, 15.5, 15.5),],this.theScene);
        BABYLON.Mesh.CreateLines("z0-4",[new BABYLON.Vector3(-0.5, -0.5, 15.5),new BABYLON.Vector3(-0.5, 15.5, 15.5),],this.theScene);
    }
    
    onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;
        this.theScene = scene;

        const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(8, 30, -30), scene);
        camera.angularSensibility = 3000;
        camera.setTarget(new BABYLON.Vector3(8,8,8));
        camera.attachControl(canvas, true);
        new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        
        let chunkLoc = this.props.chunkLoc;
        let chunkCol = this.props.chunkCol;

        this.cursor = BABYLON.Mesh.CreateBox('cursor', 1, this.theScene);
        var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.theScene);
        this.cursor.material = myMaterial;
        this.cursor.material.wireframe = true;
        this.renderCursor(1,0,0);

        this.createChunkFrame();

        this.renderChunk(chunkLoc, chunkCol);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    render() {            
        return (
            <BabylonScene onSceneMount={this.onSceneMount} />
        )
    }
}