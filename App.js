import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { useRef, Suspense } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function LowerJaw(props) {
  const obj = useLoader(
    OBJLoader,
    require('./assets/special_lower.obj'),
  );

  const mesh = useRef();
  return (
    <mesh ref={mesh} position={[0,0.8,0]}>
      <primitive object={obj} scale={0.045} />
    </mesh>
  );
}

function UpperJaw(props) {
  const obj = useLoader(
    OBJLoader,
    require('./assets/special_upper.obj'),
  );

  const mesh = useRef();
  return (
    <mesh ref={mesh} position={[0,4.75,0]} 
    rotation={[Math.PI, Math.PI, 0]}
    >
      <primitive object={obj} scale={0.045} />
    </mesh>
  );
}

function Toothbrush(props) {
  const materials = useLoader(MTLLoader, require("./assets/toothbrush.mtl"))
  const obj = useLoader(
    OBJLoader,
    require('./assets/toothbrush.obj'),
    (loader) => {
      materials.preload();
      loader.setMaterials(materials)
    }
  );

  const mesh = useRef();

  useFrame(({ clock }) => {
    if (mesh.current) {
      const speedFactor = 2.5;
      const distanceFactor = 0.10; // Adjust this value to change the distance of the motion
      const motion = Math.sin(clock.getElapsedTime() * speedFactor) * distanceFactor;
      mesh.current.position.x = (-motion * 0.4) + 0.85;
      mesh.current.position.y = motion + 1.0;
      mesh.current.position.z = (motion * 1.1) + 1
    }
  });

  return (
    <mesh ref={mesh} position={[0,-2,0]} rotation={[0.12,-1.4,0.41]} >
      <primitive object={obj} scale={0.13} />
    </mesh>
  );
}

function Arrow(props) {
  const obj = useLoader(
    OBJLoader,
    require('./assets/arrow.obj'),
  );

  const mesh = useRef();

  useFrame(({ clock }) => {
    if (mesh.current) {
      const speedFactor = 3.5;
    const distanceFactor = 0.05; // Adjust this value to change the distance of the motion
    const motion = Math.sin(clock.getElapsedTime() * speedFactor) * distanceFactor;
    mesh.current.position.x = -motion + 1.25;
    // Keep the y position constant
    mesh.current.position.y = 2.15;
    }
  });

  return (
    <mesh ref={mesh} rotation={[1.5,0,0]}>
      <primitive object={obj} scale={0.015} />
    </mesh>
  );
}

export default function App() {
  const camera = useRef();

  return (
    <Canvas style={{ backgroundColor: 'gray' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <UpperJaw />
        <LowerJaw />
        <Toothbrush />
        {/* <Arrow /> */}
      </Suspense>
    </Canvas>
  );
}
