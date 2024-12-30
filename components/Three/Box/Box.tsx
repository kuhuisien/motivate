import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { BoxProps } from "./Box.types";

const Box = ({ position }: BoxProps) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>();

  // Set up state for the hovered and active state
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current!.rotation.x = mesh.current!.rotation.y += 0.01;
  });

  const texture = useMemo(
    () => new THREE.TextureLoader().load("/easy.png"),
    []
  );

  return (
    <mesh
      position={position}
      ref={mesh as any}
      scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
      onClick={(e) => setActive(!active)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        attach="material"
        side={THREE.DoubleSide}
        color="hotpink"
      >
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default Box;
