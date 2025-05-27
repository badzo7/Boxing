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
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        const material = node.material as THREE.MeshStandardMaterial;
        
        // Apply colors based on mesh name
        switch (node.name) {
          case 'Fingers':
            material.color.set(glove.fingersColor.hex);
            break;
          case 'Inner_Palm':
            material.color.set(glove.innerPalmColor.hex);
            break;
          case 'Outer_Palm':
            material.color.set(glove.outerPalmColor.hex);
            break;
          case 'Inner_Thumb':
            material.color.set(glove.innerThumbColor.hex);
            break;
          case 'Outer_Thumb':
            material.color.set(glove.outerThumbColor.hex);
            break;
          case 'Strap':
            material.color.set(glove.strapColor.hex);
            break;
          case 'Wrist':
            material.color.set(glove.wristColor.hex);
            break;
          case 'Wrist_Outline':
            material.color.set(glove.wristOutlineColor.hex);
            break;
          case 'Outline':
            material.color.set(glove.outlineColor.hex);
            break;
        }

        // Update material
        material.needsUpdate = true;
      }
    });
  }, [glove, scene]);

  return (
    <group ref={group} position={[0, -1, 0]} scale={[0.8, 0.8, 0.8]}>
      <primitive object={scene} />
    </group>
  );
};

export default GloveModel;

useGLTF.preload('/models/glove.glb');