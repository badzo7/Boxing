import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useCustomizationStore } from '../store/customizationStore';
import { generateTextTexture } from '../utils/GenerateTextTexture';

function GloveViewer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const { glove, textZones, customImages } = useCustomizationStore();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111');

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 10, 7);
    scene.add(ambient, directional);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.update();

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    loader.load('/Boxing_Gloves_13_Demo_0114.glb', async (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(0, 0.1, 0);
      modelRef.current = model;
      scene.add(model);
      await applyTextures();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const applyTextures = async () => {
    if (!modelRef.current) return;

    const zoneMap: Record<string, keyof typeof textZones> = {
      Fingers: 'Fingers',
      InnerPalm: 'InnerPalm',
      OutterPalm: 'OutterPalm',
      InnerThumb: 'InnerThumb',
      OutterThumb: 'OutterThumb',
      Strap: 'Strap',
      Wrist: 'Wrist',
      WristOutline: 'WristOutline',
      Outline: 'Outline',
    };

    modelRef.current.traverse(async (child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        const material = child.material;
        const name = child.name;
        const zone = zoneMap[name];

        // Set color
        switch (name) {
          case 'Fingers': material.color.set(glove.fingersColor.hex); break;
          case 'InnerPalm': material.color.set(glove.innerPalmColor.hex); break;
          case 'OutterPalm': material.color.set(glove.outerPalmColor.hex); break;
          case 'InnerThumb': material.color.set(glove.innerThumbColor.hex); break;
          case 'OutterThumb': material.color.set(glove.outerThumbColor.hex); break;
          case 'Strap': material.color.set(glove.strapColor.hex); break;
          case 'Wrist': material.color.set(glove.wristColor.hex); break;
          case 'WristOutline': material.color.set(glove.wristOutlineColor.hex); break;
          case 'Outline': material.color.set(glove.outlineColor.hex); break;
        }

        // Text + Images
        if (zone) {
          const text = textZones[zone];
          const imageData = customImages[zone];
          const hasText = text && text.text;
          const hasImage = imageData?.url;

          if (hasText || hasImage) {
            const texture = await generateTextTexture({
              text: text.text,
              font: text.font,
              size: text.size,
              textColor: text.color,
              bgColor: hasImage ? 'transparent' : material.color.getStyle(),
              x: text.x,
              y: text.y,
              rotation: text.rotation,
              images: hasImage ? [imageData] : [],
            });

            material.map = texture;
          } else {
            material.map = null;
          }

          material.needsUpdate = true;
        }
      }
    });
  };

  useEffect(() => {
    applyTextures();
  }, [glove, textZones, customImages]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', backgroundColor: '#111' }}
    />
  );
}

export default GloveViewer;
