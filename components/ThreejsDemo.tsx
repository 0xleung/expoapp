
import React from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import * as THREE from 'three';
import * as ExpoTHREE from 'expo-three';
import { View } from 'react-native';

export default function ThreejsDemo() {

    let gl: ExpoWebGLRenderingContext;
  let renderer: ExpoTHREE.Renderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  

  const render = () => {
    renderer.render(scene, camera);
    gl.endFrameEXP();
  }

  const contextCreateHandler = (ctx: ExpoWebGLRenderingContext) => {
    gl = ctx;
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(width, height);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(0, 1, 4);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxMat = new THREE.MeshLambertMaterial({ color: 'gray' });
    const boxMsh = new THREE.Mesh(boxGeo, boxMat);
    boxMsh.position.set(0, 0, 0);
    boxMsh.rotation.set(0, 0.5, 0);
    scene.add(boxMsh);

    const light = new THREE.DirectionalLight();
    light.position.set(0, 3, 4);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    // function rotateObject(object:THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>, degreeX=0, degreeY=0, degreeZ=0) {
    //     object.rotateX(ExpoTHREE.Math.degToRad(degreeX));
    //     object.rotateY(THREE.Math.degToRad(degreeY));
    //     object.rotateZ(THREE.Math.degToRad(degreeZ));
    //  }
    function loop(){

        // render the scene
        render();
        // boxMsh.rotation.set(0, boxMsh.rotation.x + 0.1, 0);
        boxMsh
        .rotation.y -= 0.005;
        // Check the object's X position
        // if (boxMsh.position.x <= targetPositionX) {
            // boxMsh.rotateX(( Math.PI / 2 )); // You decide on the increment, higher value will mean the objects moves faster
        // }
    
        // call the loop function again
        requestAnimationFrame(loop);
    }
    // render();
    loop()
  }

  return (
    <GLView style={{ flex: 1 }} onContextCreate={ contextCreateHandler } />
  );
}