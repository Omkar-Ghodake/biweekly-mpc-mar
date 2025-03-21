import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import glb from "../glb/cricket_stadium.glb";

const StadiumModel = ({ mouse }) => {
  const { scene } = useGLTF(glb);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0005;
    }
  });

  return <primitive object={scene} scale={0.5} ref={modelRef} />;
};

const StadiumBack = () => {
  return (
    <div className="w-screen h-screen backdrop-opacity-0 blur-xs ">
      <Canvas
        camera={{ position: [5, 10, 10], fov: 40 }}
        style={{ width: "100vw", height: "100vh", background: "black" }}
      >
        <color attach="background" args={["#98D2C0"]} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <StadiumModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          mouseButtons={false}
        />
      </Canvas>
    </div>
  );
};

export default StadiumBack;
