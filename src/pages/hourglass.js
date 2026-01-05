import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Layout from '../components/layout'; 
import { Canvas } from '@react-three/fiber'; 
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { HourglassModel } from '../components/HourglassModel'; // Import the R3F component

const INITIAL_TIME_SECONDS = 5 * 60; // 5 minutes

function HourglassPage() {
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = useCallback((totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Timer useEffect hook
  useEffect(() => {
    let intervalId;
    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      clearInterval(intervalId);
      console.log("Time's up! The sand has run out.");
      setIsRunning(false);
    }
    // Cleanup function is essential to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining]);

  const handleStartStop = () => {
    // Only allow starting if time is > 0
    if (timeRemaining > 0) {
        setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(INITIAL_TIME_SECONDS);
  };

  return (
    <Layout>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        background: '#1a1a1a', 
        color: 'white',
        padding: '20px'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>The Hourglass Room</h2>
        
        {/* 1. The 3D Canvas Container */}
        <div style={{ 
          width: 'min(90vw, 600px)', 
          height: 'min(70vh, 400px)', 
          background: '#222', 
          borderRadius: '10px', 
          margin: '20px 0',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
        }}>
          {/* 2. The Canvas Component (R3F Context Provider) */}
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            {/* Lighting and Scene Setup */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <directionalLight position={[0, 5, 0]} intensity={0.5} castShadow />
            
            {/* Background color and Environment for reflections */}
            <color attach="background" args={['#111111']} /> 
            <Environment preset="lobby" background={false} /> 

            {/* 3. Suspense wrapper handles loading state */}
            <Suspense fallback={
                // FIX: Reverted to a simple mesh primitive. Using complex components 
                // like <Text> in the fallback can cause initialization issues with Three.js properties.
                <mesh position={[0, 0, 0]} castShadow={false} receiveShadow={false}> 
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="gray" wireframe={true} />
                </mesh>
            }>
                {/* 4. The 3D Component goes inside Canvas/Suspense */}
                <HourglassModel 
                    timeRemaining={timeRemaining} 
                    totalTime={INITIAL_TIME_SECONDS} 
                    isRunning={isRunning}
                />
            </Suspense>

            {/* OrbitControls allows the user to rotate the model with the mouse */}
            <OrbitControls enablePan={false} enableZoom={true} /> 
          </Canvas>
        </div>

        {/* Timer text and controls (standard React/HTML outside the Canvas) */}
        <div style={{ fontSize: '3rem', margin: '10px 0', fontWeight: 'bold', fontFamily: 'monospace' }}>
          {formatTime(timeRemaining)}
        </div>
        
        <p style={{ marginTop: '5px', color: '#ccc' }}>
          {timeRemaining > 0 
            ? isRunning ? "Sand is dripping..." : "Ready to start the 5-minute timer."
            : "The time has run out. Flip the glass (Reset)!"}
        </p>
        
        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button 
            onClick={handleStartStop} 
            disabled={timeRemaining === 0}
            style={{ 
              padding: '12px 25px', 
              cursor: 'pointer',
              backgroundColor: isRunning ? '#d9534f' : '#5cb85c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              boxShadow: '0 4px #999',
              transition: 'all 0.1s ease-out'
            }}
          >
            {isRunning ? 'STOP' : 'START'}
          </button>
          
          <button 
            onClick={handleReset}
            style={{ 
              padding: '12px 25px', 
              cursor: 'pointer',
              backgroundColor: '#0275d8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              boxShadow: '0 4px #0056b3',
              transition: 'all 0.1s ease-out'
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default HourglassPage;