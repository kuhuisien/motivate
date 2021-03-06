/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Ch03: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ["Ch03_Body.005"]: THREE.MeshStandardMaterial;
  };
};

//type ActionName = 'dance'
//type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Character(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF("/dance.glb") as GLTFResult;

  const { actions } = useAnimations<THREE.AnimationClip>(animations, group);

  useEffect(() => {
    actions.dance?.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.02} position={[0, -1, 0]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.Ch03.geometry}
          material={materials["Ch03_Body.005"]}
          skeleton={nodes.Ch03.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/dance.glb");
