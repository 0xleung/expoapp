

import React from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import * as THREE from 'three';
import * as ExpoTHREE from 'expo-three';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function ThreejsDemo() {

    let gl: ExpoWebGLRenderingContext;
  let renderer: ExpoTHREE.Renderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  

  const render = () => {
    renderer.render(scene, camera);
    gl.endFrameEXP();
  }

  let rotateObj: (x: number, y: number) => void;
  const panGesture = Gesture.Pan()
  .onUpdate((e) => {
    rotateObj && rotateObj(e.translationX, e.translationY);
  });

  const contextCreateHandler = (ctx: ExpoWebGLRenderingContext) => {
    gl = ctx;
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(width, height);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(0, 1, 4);

    const boxGeo = new THREE.BoxGeometry(2, 2, 2,);
    const boxMat = new THREE.MeshLambertMaterial({ color: 'gray' });
    const boxMsh = new THREE.Mesh(boxGeo, boxMat);
    boxMsh.position.set(0, 1, 0);
    boxMsh.rotation.set(0, 0.5, 0);
    scene.add(boxMsh);

    const light = new THREE.DirectionalLight();
    light.position.set(0, 3, 4);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    render();
    rotateObj = (x: number, y: number)=>{
      render()
      boxMsh
        .rotation.x += y * 0.0005
        ;
      boxMsh
        .rotation.y += x * 0.0005
        ;
    }
  }





  

  return (
    <GestureDetector gesture={panGesture}>
    <GLView style={{ flex: 1 }} onContextCreate={ contextCreateHandler } />
    </GestureDetector>
  );
}