import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

function Drone() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Box ref={meshRef} args={[1, 0.2, 1]}>
      <meshStandardMaterial color="gray" />
    </Box>
  );
}

function DroneSimulator() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Drone />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default DroneSimulator;