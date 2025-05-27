import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomizationStore } from '../../store/customizationStore';

const GloveModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const glove = useCustomizationStore((state) => state.glove);
  const { scene } = useGLTF('/models/glove.glb');

  useFrame((state) => {
    if (group.current) {
      const targetRotation = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1; 
      group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.05;
    }
  });

  useEffect(() => {
    const applyColor = (name: string, color: string) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh && mesh.material && 'color' in mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).color.set(color);
        console.log(`🎨 ${name} colored with ${color}`);
      } else {
        console.warn(`❌ Mesh not found or invalid material: ${name}`);
      }
    };

    applyColor('Fingers', glove.mainColor.hex);
    applyColor('Inner Palm', glove.palmColor.hex);
    applyColor('Outer Palm', glove.palmColor.hex);
    applyColor('Inner Thumb', glove.thumbColor.hex);
    applyColor('Outer Thumb', glove.thumbColor.hex);
    applyColor('Strap', glove.wristColor.hex);
    applyColor('Wrist', glove.wristColor.hex);
    applyColor('Wrist Outline', glove.trimColor.hex);
    applyColor('Outline', glove.trimColor.hex);
  }, [glove, scene]);

  return (
    <group ref={group} position={[0, -1, 0]} scale={[0.8, 0.8, 0.8]}>
      <primitive object={scene} />
    </group>
  );
};

export default GloveModel;

useGLTF.preload('/models/glove.glb');



