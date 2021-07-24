import React from "react";
import { Canvas } from "react-three-fiber";
import Box from "../Box/Box";

const BoxContainer = () => {
  return (
    <Canvas>
      {/* <ambientLight />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} /> */}
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
};

export default BoxContainer;
