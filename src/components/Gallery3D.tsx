'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { corridors, Painting, Corridor } from '@/lib/gallery-data';

// ─── Types ───────────────────────────────────────────────────────────
interface PaintingMeshData {
  mesh: THREE.Mesh;
  painting: Painting;
  corridor: Corridor;
  originalMaterial: THREE.Material;
  blurredMaterial: THREE.Material;
  clearMaterial: THREE.Material;
}

// ─── Constants ───────────────────────────────────────────────────────
const CORRIDOR_WIDTH = 12;
const CORRIDOR_HEIGHT = 8;
const CORRIDOR_LENGTH = 40;
const PAINTING_WIDTH = 3;
const PAINTING_HEIGHT = 4;
const CORRIDOR_SPACING = CORRIDOR_LENGTH + 10;
const MOVE_SPEED = 0.15;
const LOOK_SPEED = 0.002;

export default function Gallery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEra, setCurrentEra] = useState('Renaissance');
  const [showInstructions, setShowInstructions] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const paintingMeshesRef = useRef<PaintingMeshData[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const frameIdRef = useRef<number>(0);
  const hoveredPaintingRef = useRef<PaintingMeshData | null>(null);

  // ─── Build Corridor ─────────────────────────────────────────────
  const buildCorridor = useCallback((
    scene: THREE.Scene,
    corridor: Corridor,
    offsetZ: number
  ) => {
    const group = new THREE.Group();
    group.position.set(0, 0, offsetZ);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(CORRIDOR_WIDTH, CORRIDOR_LENGTH);
    const floorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.floorColor),
      roughness: 0.3,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    group.add(floor);

    // Floor pattern - decorative rug runner
    const rugGeo = new THREE.PlaneGeometry(4, CORRIDOR_LENGTH - 4);
    const rugMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.accentColor),
      roughness: 0.8,
      metalness: 0.0,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, 0);
    group.add(rug);

    // Ceiling
    const ceilGeo = new THREE.PlaneGeometry(CORRIDOR_WIDTH, CORRIDOR_LENGTH);
    const ceilMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.ceilingColor),
      roughness: 0.9,
    });
    const ceil = new THREE.Mesh(ceilGeo, ceilMat);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, CORRIDOR_HEIGHT, 0);
    group.add(ceil);

    // Walls
    const wallGeo = new THREE.PlaneGeometry(CORRIDOR_LENGTH, CORRIDOR_HEIGHT);
    const wallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.wallColor),
      roughness: 0.85,
      metalness: 0.0,
    });

    // Left wall
    const leftWall = new THREE.Mesh(wallGeo, wallMat.clone());
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, 0);
    group.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(wallGeo, wallMat.clone());
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, 0);
    group.add(rightWall);

    // Back wall
    const backWallGeo = new THREE.PlaneGeometry(CORRIDOR_WIDTH, CORRIDOR_HEIGHT);
    const backWall = new THREE.Mesh(backWallGeo, wallMat.clone());
    backWall.position.set(0, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2);
    group.add(backWall);

    // Front wall (with archway opening)
    const frontWall = new THREE.Mesh(backWallGeo, wallMat.clone());
    frontWall.position.set(0, CORRIDOR_HEIGHT / 2, CORRIDOR_LENGTH / 2);
    frontWall.rotation.y = Math.PI;
    group.add(frontWall);

    // Crown molding (decorative strip at top of walls)
    const moldingGeo = new THREE.BoxGeometry(CORRIDOR_LENGTH, 0.15, 0.1);
    const moldingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.accentColor),
      roughness: 0.4,
      metalness: 0.3,
    });

    const leftMolding = new THREE.Mesh(moldingGeo, moldingMat);
    leftMolding.position.set(-CORRIDOR_WIDTH / 2 + 0.05, CORRIDOR_HEIGHT - 0.3, 0);
    group.add(leftMolding);

    const rightMolding = new THREE.Mesh(moldingGeo, moldingMat);
    rightMolding.position.set(CORRIDOR_WIDTH / 2 - 0.05, CORRIDOR_HEIGHT - 0.3, 0);
    group.add(rightMolding);

    // Baseboard
    const baseGeo = new THREE.BoxGeometry(CORRIDOR_LENGTH, 0.3, 0.08);
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.accentColor),
      roughness: 0.5,
      metalness: 0.2,
    });

    const leftBase = new THREE.Mesh(baseGeo, baseMat);
    leftBase.position.set(-CORRIDOR_WIDTH / 2 + 0.04, 0.15, 0);
    group.add(leftBase);

    const rightBase = new THREE.Mesh(baseGeo, baseMat);
    rightBase.position.set(CORRIDOR_WIDTH / 2 - 0.04, 0.15, 0);
    group.add(rightBase);

    // Era sign at entrance
    const signGeo = new THREE.BoxGeometry(4, 1.2, 0.05);
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const signCtx = signCanvas.getContext('2d')!;
    signCtx.fillStyle = corridor.accentColor;
    signCtx.fillRect(0, 0, 512, 128);
    signCtx.fillStyle = '#FFFFFF';
    signCtx.font = 'bold 48px Georgia, serif';
    signCtx.textAlign = 'center';
    signCtx.textBaseline = 'middle';
    signCtx.fillText(`${corridor.era}  ${corridor.eraPeriod}`, 256, 64);
    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMat = new THREE.MeshStandardMaterial({ map: signTex });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, CORRIDOR_HEIGHT - 1.5, -CORRIDOR_LENGTH / 2 + 0.1);
    group.add(sign);

    // Benches in the middle
    const benchGeo = new THREE.BoxGeometry(1.5, 0.5, 0.6);
    const benchMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(corridor.accentColor),
      roughness: 0.7,
    });
    for (let b = 0; b < 2; b++) {
      const bench = new THREE.Mesh(benchGeo, benchMat);
      bench.position.set(0, 0.25, b === 0 ? -5 : 5);
      group.add(bench);
    }

    // Ceiling lights
    const lightGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffeedd,
      emissiveIntensity: 2,
    });

    const numLights = 4;
    for (let i = 0; i < numLights; i++) {
      const z = -CORRIDOR_LENGTH / 2 + (CORRIDOR_LENGTH / (numLights + 1)) * (i + 1);
      const lightFixture = new THREE.Mesh(lightGeo, lightMat);
      lightFixture.position.set(0, CORRIDOR_HEIGHT - 0.03, z);
      group.add(lightFixture);

      // Spot light from ceiling
      const spotLight = new THREE.SpotLight(0xffeedd, 3, 15, Math.PI / 4, 0.5, 1);
      spotLight.position.set(0, CORRIDOR_HEIGHT - 0.1, z);
      spotLight.target.position.set(0, 0, z);
      group.add(spotLight);
      group.add(spotLight.target);
    }

    // Ambient light for corridor
    const ambientLight = new THREE.PointLight(
      new THREE.Color(corridor.wallColor).multiplyScalar(2),
      0.5,
      CORRIDOR_LENGTH
    );
    ambientLight.position.set(0, CORRIDOR_HEIGHT - 1, 0);
    group.add(ambientLight);

    scene.add(group);
    return group;
  }, []);

  // ─── Create Painting with blur ──────────────────────────────────
  const createPaintingMesh = useCallback(async (
    scene: THREE.Scene,
    painting: Painting,
    corridor: Corridor,
    wallSide: 'left' | 'right',
    positionZ: number,
    corridorOffsetZ: number
  ): Promise<PaintingMeshData | null> => {
    const loader = new THREE.TextureLoader();

    try {
      const [blurredTex, clearTex] = await Promise.all([
        new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(painting.image, resolve, undefined, reject);
        }),
        new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(painting.image, resolve, undefined, reject);
        }),
      ]);

      // Blurred texture
      blurredTex.minFilter = THREE.LinearFilter;
      blurredTex.magFilter = THREE.LinearFilter;

      // Clear texture
      clearTex.minFilter = THREE.LinearMipmapLinearFilter;
      clearTex.magFilter = THREE.LinearFilter;
      clearTex.anisotropy = 16;

      // Create frame
      const frameGroup = new THREE.Group();

      // Gold frame
      const frameThickness = 0.12;
      const frameDepth = 0.08;
      const frameMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(corridor.accentColor),
        roughness: 0.3,
        metalness: 0.7,
      });

      // Frame pieces
      const topFrame = new THREE.Mesh(
        new THREE.BoxGeometry(PAINTING_WIDTH + frameThickness * 2, frameThickness, frameDepth),
        frameMat
      );
      topFrame.position.set(0, PAINTING_HEIGHT / 2 + frameThickness / 2, 0);
      frameGroup.add(topFrame);

      const bottomFrame = new THREE.Mesh(
        new THREE.BoxGeometry(PAINTING_WIDTH + frameThickness * 2, frameThickness, frameDepth),
        frameMat
      );
      bottomFrame.position.set(0, -PAINTING_HEIGHT / 2 - frameThickness / 2, 0);
      frameGroup.add(bottomFrame);

      const leftFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, PAINTING_HEIGHT, frameDepth),
        frameMat
      );
      leftFrame.position.set(-PAINTING_WIDTH / 2 - frameThickness / 2, 0, 0);
      frameGroup.add(leftFrame);

      const rightFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, PAINTING_HEIGHT, frameDepth),
        frameMat
      );
      rightFrame.position.set(PAINTING_WIDTH / 2 + frameThickness / 2, 0, 0);
      frameGroup.add(rightFrame);

      // Backing
      const backingGeo = new THREE.BoxGeometry(PAINTING_WIDTH + frameThickness * 2, PAINTING_HEIGHT + frameThickness * 2, 0.02);
      const backingMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const backing = new THREE.Mesh(backingGeo, backingMat);
      backing.position.z = -frameDepth / 2;
      frameGroup.add(backing);

      // Blurred painting material (slightly transparent + CSS-style blur effect via alpha)
      const blurredMat = new THREE.MeshStandardMaterial({
        map: blurredTex,
        transparent: true,
        opacity: 0.75,
        roughness: 1.0,
        metalness: 0.0,
      });

      // Clear painting material
      const clearMat = new THREE.MeshStandardMaterial({
        map: clearTex,
        roughness: 0.4,
        metalness: 0.0,
      });

      // The painting plane (starts blurred)
      const paintGeo = new THREE.PlaneGeometry(PAINTING_WIDTH, PAINTING_HEIGHT);
      const paintMesh = new THREE.Mesh(paintGeo, blurredMat);

      // Position the painting
      const xPos = wallSide === 'left'
        ? -CORRIDOR_WIDTH / 2 + 0.2
        : CORRIDOR_WIDTH / 2 - 0.2;
      const yPos = CORRIDOR_HEIGHT / 2 + 0.5;

      frameGroup.position.set(xPos, yPos, positionZ + corridorOffsetZ);

      if (wallSide === 'left') {
        frameGroup.rotation.y = Math.PI / 2;
      } else {
        frameGroup.rotation.y = -Math.PI / 2;
      }

      // Add spotlight for painting
      const paintLight = new THREE.SpotLight(0xfff8e7, 2, 8, Math.PI / 6, 0.6, 1);
      paintLight.position.set(
        wallSide === 'left' ? xPos + 2 : xPos - 2,
        CORRIDOR_HEIGHT - 0.5,
        positionZ + corridorOffsetZ
      );
      paintLight.target = paintMesh;
      scene.add(paintLight);
      scene.add(paintLight.target);

      frameGroup.add(paintMesh);
      scene.add(frameGroup);

      return {
        mesh: paintMesh,
        painting,
        corridor,
        originalMaterial: blurredMat,
        blurredMaterial: blurredMat,
        clearMaterial: clearMat,
      };
    } catch (err) {
      console.error('Failed to load painting:', painting.title, err);
      return null;
    }
  }, []);

  // ─── Initialize Scene ───────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 20, 60);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 2.5, CORRIDOR_SPACING - CORRIDOR_LENGTH / 2 + 3);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient light
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambient);

    // Build all corridors
    const allPaintingPromises: Promise<PaintingMeshData | null>[] = [];

    corridors.forEach((corridor, cIdx) => {
      const offsetZ = -cIdx * CORRIDOR_SPACING;
      buildCorridor(scene, corridor, offsetZ);

      // Place paintings on alternating walls
      const numPaintings = corridor.paintings.length;
      const spacing = CORRIDOR_LENGTH / (numPaintings + 1);

      corridor.paintings.forEach((painting, pIdx) => {
        const wallSide: 'left' | 'right' = pIdx % 2 === 0 ? 'left' : 'right';
        const zPos = -CORRIDOR_LENGTH / 2 + spacing * (pIdx + 1);
        allPaintingPromises.push(
          createPaintingMesh(scene, painting, corridor, wallSide, zPos, offsetZ)
        );
      });

      // Connecting passage lights between corridors
      if (cIdx < corridors.length - 1) {
        const passageZ = offsetZ - CORRIDOR_LENGTH / 2 - 5;
        const passageLight = new THREE.PointLight(0xffeedd, 1, 10);
        passageLight.position.set(0, CORRIDOR_HEIGHT / 2, passageZ);
        scene.add(passageLight);
      }
    });

    // Wait for all paintings to load
    Promise.all(allPaintingPromises).then((results) => {
      paintingMeshesRef.current = results.filter((r): r is PaintingMeshData => r !== null);
      setIsLoading(false);
    });

    // ─── Pointer Lock Controls ────────────────────────────────────
    const canvas = renderer.domElement;

    const onClickLock = () => {
      if (!selectedPainting) {
        canvas.requestPointerLock();
      }
    };

    const onPointerLockChange = () => {
      setIsLocked(document.pointerLockElement === canvas);
    };

    canvas.addEventListener('click', onClickLock);
    document.addEventListener('pointerlockchange', onPointerLockChange);

    // ─── Keyboard ─────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.code);
      if (e.code === 'Escape' && selectedPainting) {
        setSelectedPainting(null);
        setSelectedCorridor(null);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // ─── Mouse Move (when locked) ────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return;
      yawRef.current -= e.movementX * LOOK_SPEED;
      pitchRef.current -= e.movementY * LOOK_SPEED;
      pitchRef.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pitchRef.current));
    };
    document.addEventListener('mousemove', onMouseMove);

    // ─── Click on paintings ───────────────────────────────────────
    const onCanvasClick = (e: MouseEvent) => {
      if (selectedPainting) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const meshes = paintingMeshesRef.current.map(p => p.mesh);
      const intersects = raycasterRef.current.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const paintingData = paintingMeshesRef.current.find(p => p.mesh === hitMesh);
        if (paintingData) {
          setSelectedPainting(paintingData.painting);
          setSelectedCorridor(paintingData.corridor);
          document.exitPointerLock();
        }
      }
    };
    canvas.addEventListener('click', onCanvasClick);

    // ─── Resize ───────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── Animation Loop ──────────────────────────────────────────
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (!selectedPainting && document.pointerLockElement === canvas) {
        // Movement
        const direction = new THREE.Vector3();
        const forward = new THREE.Vector3(
          -Math.sin(yawRef.current),
          0,
          -Math.cos(yawRef.current)
        ).normalize();
        const right = new THREE.Vector3(
          Math.cos(yawRef.current),
          0,
          -Math.sin(yawRef.current)
        ).normalize();

        if (keysRef.current.has('KeyW') || keysRef.current.has('ArrowUp')) direction.add(forward);
        if (keysRef.current.has('KeyS') || keysRef.current.has('ArrowDown')) direction.sub(forward);
        if (keysRef.current.has('KeyD') || keysRef.current.has('ArrowRight')) direction.add(right);
        if (keysRef.current.has('KeyA') || keysRef.current.has('ArrowLeft')) direction.sub(right);

        if (direction.length() > 0) {
          direction.normalize().multiplyScalar(MOVE_SPEED);
          camera.position.add(direction);

          // Determine current era based on Z position
          const z = camera.position.z;
          const corridorIdx = Math.round((-z) / CORRIDOR_SPACING);
          const clampedIdx = Math.max(0, Math.min(corridors.length - 1, corridorIdx));
          setCurrentEra(corridors[clampedIdx].era);
        }

        // Camera rotation
        const euler = new THREE.Euler(pitchRef.current, yawRef.current, 0, 'YXZ');
        camera.quaternion.setFromEuler(euler);
      }

      // Hover effect - glow when aiming at painting
      if (document.pointerLockElement === canvas && !selectedPainting) {
        const center = new THREE.Vector2(0, 0);
        raycasterRef.current.setFromCamera(center, camera);
        const meshes = paintingMeshesRef.current.map(p => p.mesh);
        const intersects = raycasterRef.current.intersectObjects(meshes, false);

        // Reset previous hover
        if (hoveredPaintingRef.current) {
          hoveredPaintingRef.current.mesh.material = hoveredPaintingRef.current.blurredMaterial;
          hoveredPaintingRef.current = null;
        }

        if (intersects.length > 0 && intersects[0].distance < 8) {
          const hitMesh = intersects[0].object as THREE.Mesh;
          const paintingData = paintingMeshesRef.current.find(p => p.mesh === hitMesh);
          if (paintingData) {
            // Show slightly less blurred when aimed at
            paintingData.mesh.material = paintingData.clearMaterial;
            paintingData.clearMaterial.opacity = 0.92;
            paintingData.clearMaterial.transparent = true;
            hoveredPaintingRef.current = paintingData;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      canvas.removeEventListener('click', onClickLock);
      canvas.removeEventListener('click', onCanvasClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [buildCorridor, createPaintingMesh]);

  // ─── Close Preview ────────────────────────────────────────────────
  const closePreview = useCallback(() => {
    setSelectedPainting(null);
    setSelectedCorridor(null);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-amber-600/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
          </div>
          <h2 className="text-amber-100 text-2xl font-serif mb-2">Entering the Gallery...</h2>
          <p className="text-amber-200/60 text-sm">Loading masterpieces across five centuries</p>
        </div>
      )}

      {/* Instructions Overlay */}
      {showInstructions && !isLoading && !isLocked && !selectedPainting && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-700/40 rounded-2xl p-10 max-w-lg text-center shadow-2xl shadow-amber-900/20">
            <div className="text-5xl mb-4">🏛️</div>
            <h1 className="text-amber-100 text-3xl font-serif mb-2">The Grand Gallery</h1>
            <p className="text-amber-200/70 text-sm mb-6 italic">Five Centuries of Masterpieces</p>
            <div className="space-y-3 text-amber-100/80 text-sm text-left mb-8">
              <div className="flex items-center gap-3">
                <kbd className="bg-amber-900/50 border border-amber-700/40 px-2 py-1 rounded text-xs font-mono">W A S D</kbd>
                <span>Walk through the gallery</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-amber-900/50 border border-amber-700/40 px-2 py-1 rounded text-xs font-mono">Mouse</kbd>
                <span>Look around</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-amber-900/50 border border-amber-700/40 px-2 py-1 rounded text-xs font-mono">Click</kbd>
                <span>Lock cursor / View painting</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-amber-900/50 border border-amber-700/40 px-2 py-1 rounded text-xs font-mono">ESC</kbd>
                <span>Release cursor / Close preview</span>
              </div>
            </div>
            <p className="text-amber-300/50 text-xs mb-6">Paintings appear blurred from afar. Aim at them to see clearly, or click to view full detail.</p>
            <button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-amber-100 px-8 py-3 rounded-lg font-serif text-lg transition-all duration-300 shadow-lg shadow-amber-900/40 cursor-pointer"
            >
              Enter Gallery
            </button>
          </div>
        </div>
      )}

      {/* Current Era Indicator */}
      {isLocked && !selectedPainting && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-amber-700/30 rounded-full px-6 py-2">
            <span className="text-amber-200 font-serif text-sm tracking-wider">{currentEra}</span>
          </div>
        </div>
      )}

      {/* Crosshair */}
      {isLocked && !selectedPainting && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="w-1 h-1 bg-amber-200/60 rounded-full shadow-lg shadow-amber-200/30" />
        </div>
      )}

      {/* Click to lock prompt */}
      {!isLocked && !selectedPainting && !showInstructions && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 mt-80">
            <p className="text-amber-200/80 text-sm font-serif">Click anywhere to look around</p>
          </div>
        </div>
      )}

      {/* Painting Preview Modal */}
      {selectedPainting && selectedCorridor && (
        <div
          className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={closePreview}
        >
          <div
            className="max-w-6xl w-full flex flex-col md:flex-row gap-6 md:gap-10 items-center max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Painting */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {/* Ornate frame effect */}
              <div className="relative p-2 md:p-3 bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-800 rounded-sm shadow-2xl shadow-amber-900/60">
                <div className="relative p-1 bg-gradient-to-br from-amber-800 via-yellow-900 to-amber-950 rounded-sm">
                  <img
                    src={selectedPainting.image}
                    alt={selectedPainting.title}
                    className="max-h-[55vh] md:max-h-[60vh] w-auto object-contain rounded-sm"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
              </div>
              {/* Painting title below */}
              <div className="mt-4 text-center">
                <p className="text-amber-100/50 text-xs italic tracking-wider uppercase">{selectedCorridor.era} Era</p>
              </div>
            </div>

            {/* Info Panel */}
            <div className="flex-1 min-w-0 overflow-y-auto max-h-[70vh] pr-2">
              <div className="space-y-4">
                <div>
                  <h2 className="text-amber-100 text-2xl md:text-3xl font-serif leading-tight">
                    {selectedPainting.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-amber-300/80 text-base font-serif">{selectedPainting.artist}</span>
                    <span className="text-amber-500/40">|</span>
                    <span className="text-amber-300/60 text-sm">{selectedPainting.year}</span>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-amber-700/40 via-amber-500/20 to-transparent" />

                <div>
                  <h3 className="text-amber-200/60 text-xs uppercase tracking-widest mb-3">History & Context</h3>
                  <p className="text-amber-100/75 text-sm md:text-base leading-relaxed font-serif">
                    {selectedPainting.history}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-amber-700/40 via-amber-500/20 to-transparent" />

                <div className="flex items-center gap-4">
                  <div className="bg-amber-900/30 border border-amber-700/20 rounded-lg px-4 py-2">
                    <p className="text-amber-200/50 text-xs">Period</p>
                    <p className="text-amber-100 text-sm font-serif">{selectedCorridor.eraPeriod}</p>
                  </div>
                  <div className="bg-amber-900/30 border border-amber-700/20 rounded-lg px-4 py-2">
                    <p className="text-amber-200/50 text-xs">Corridor</p>
                    <p className="text-amber-100 text-sm font-serif">{selectedCorridor.era}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/60 hover:bg-black/80 border border-amber-700/30 hover:border-amber-500/50 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5 text-amber-200/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ESC hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <p className="text-amber-200/40 text-xs">Press ESC or click outside to return to gallery</p>
          </div>
        </div>
      )}

      {/* Minimap / Corridor nav */}
      {!selectedPainting && !showInstructions && !isLoading && (
        <div className="absolute bottom-4 left-4 z-30">
          <div className="bg-black/50 backdrop-blur-md border border-amber-700/20 rounded-xl p-3 space-y-1.5">
            <p className="text-amber-200/40 text-[10px] uppercase tracking-widest mb-1">Corridors</p>
            {corridors.map((c, i) => (
              <div
                key={c.id}
                className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
                  currentEra === c.era ? 'bg-amber-700/30' : ''
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: c.accentColor }}
                />
                <span className={`text-xs font-serif ${
                  currentEra === c.era ? 'text-amber-100' : 'text-amber-200/40'
                }`}>
                  {c.era}
                </span>
                <span className="text-amber-200/25 text-[10px]">{c.eraPeriod}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
