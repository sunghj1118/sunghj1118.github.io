import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// This is the R3F component that renders the 3D model
export function HourglassModel({ timeRemaining, totalTime, isRunning }) {
  // Use useGLTF for dedicated, robust GLTF loading
  const { scene, nodes, animations } = useGLTF('/models/hourglass.glb'); 
  
  const modelRef = useRef();
  const mixer = useRef(null);
  const actionRef = useRef(null); // Reference to hold the animation action

  // Identify the sand meshes by the names found in the GLTF JSON
  // Mesh '0' (top sand) and Mesh '1' (bottom sand)
  const topSandMesh = nodes['0']; 
  const bottomSandMesh = nodes['1'];
  
  // Calculate the ratio: 1.0 (Full) down to 0.0 (Empty)
  const sandFillRatio = timeRemaining / totalTime; 

  // Setup Animation Mixer (Runs only once on mount)
  useEffect(() => {
    // 1. Initialize Mixer and Action
    if (animations.length) {
        mixer.current = new THREE.AnimationMixer(scene);
        
        // Assume 'Take 001' (index 0) controls the dripping animation
        const clip = animations[0];
        const action = mixer.current.clipAction(clip);
        action.loop = THREE.LoopRepeat; // Ensure it loops forever
        actionRef.current = action;
        
        // Start the action but keep it paused initially
        action.play(); 
        action.paused = true; // Initially pause until the user hits START
    }
    
    // 2. Traverse scene to fix materials and casting shadows
    scene.traverse((child) => {
        if (child.isMesh) {
            // Ensure the hourglass glass material uses transmission (if supported)
            if (child.material && child.material.name === 'glass') {
                child.material.transparent = true;
                // KHR_materials_transmission needs to be configured, 
                // but setting opacity and depthwrite is a basic fallback for glass look
                child.material.opacity = 0.5;
                child.material.depthWrite = false;
            }
            // Allow all meshes to cast and receive shadows for better realism
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

  }, [animations, scene]); // Dependencies ensure this runs only once when the model is ready

  // NEW FIX: Control Animation Play/Pause state based on isRunning
  // This is a dedicated effect to respond precisely to the START/STOP button.
  useEffect(() => {
    if (actionRef.current) {
        actionRef.current.paused = !isRunning;
    }
  }, [isRunning]); // Run whenever the timer state changes

  // Update Animation and Sand Level every frame
  useFrame((state, delta) => {
    // 1. Update Mixer for Dripping Particles (only advances if action is not paused)
    if (mixer.current) {
        mixer.current.update(delta);
    }
    
    // 2. Control Sand Fill via Morph Targets
    if (topSandMesh && bottomSandMesh) {
        // Morph Target Index 0 controls the blend shape (fill/drain)
        
        // Top sand: Should be FULL (1.0) at start (ratio 1.0), and EMPTY (0.0) at end (ratio 0.0)
        const topWeight = sandFillRatio; 
        
        // Bottom sand: Should be EMPTY (0.0) at start (ratio 1.0), and FULL (1.0) at end (ratio 0.0)
        const bottomWeight = 1.0 - sandFillRatio;
        
        // Apply the weights (clamped between 0 and 1)
        topSandMesh.morphTargetInfluences[0] = Math.max(0, Math.min(1, topWeight)); 
        bottomSandMesh.morphTargetInfluences[0] = Math.max(0, Math.min(1, bottomWeight));
    }

    // 3. Gentle Rotation of the whole model (optional)
    if (modelRef.current) {
        modelRef.current.rotation.y += 0.005 * delta * 60; // Frame-rate independent rotation
    }
  });

  // Render the scene wrapped in a group for scaling and positioning
  return (
    <group 
        ref={modelRef} 
        // We assume scale 50 makes it visible. Adjust this if needed.
        scale={[20, 20, 20]} 
        position={[0, -2, 0]} 
    >
      <primitive object={scene} />
    </group>
  );
}

// Since useGLTF caches the model, we call it here to preload the asset for Suspense
useGLTF.preload('/models/hourglass.glb')