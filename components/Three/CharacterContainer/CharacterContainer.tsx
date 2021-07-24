import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Character from "components/Three/Character/Character";
import { Canvas } from "react-three-fiber";
import THREE from "three";

const CharacterContainer = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <Character />
      </Suspense>
    </Canvas>
  );
};

export default CharacterContainer;
