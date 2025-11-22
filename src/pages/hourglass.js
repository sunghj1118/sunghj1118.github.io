import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout'; // Ensure this path is correct

// Define the initial time in seconds (5 minutes)
const INITIAL_TIME_SECONDS = 5 * 60; 

function HourglassPage() {
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  // Function to format seconds into MM:SS
  const formatTime = useCallback((totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Timer logic using useEffect
  useEffect(() => {
    let intervalId;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Logic when the timer runs out
      clearInterval(intervalId);
      console.log("Time's up! The sand has run out.");
      setIsRunning(false);
    }

    // Cleanup function to clear the interval when the component unmounts
    // or when dependencies change
    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining]); // Dependencies

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(INITIAL_TIME_SECONDS);
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>The Hourglass Room</h2>
        
        {/* Placeholder for 3D/Animated Hourglass Model */}
        <div style={{ 
          fontSize: '3rem', 
          margin: '20px 0', 
          padding: '20px', 
          border: '2px solid gold', 
          display: 'inline-block',
          minWidth: '200px',
          backgroundColor: '#333',
          color: 'white'
        }}>
          {formatTime(timeRemaining)}
        </div>
        
        <p>
          {timeRemaining > 0 
            ? isRunning ? "Sand is dripping..." : "Ready to start the 5-minute timer."
            : "The time has run out. Reset the glass."}
        </p>
        
        <button 
          onClick={handleStartStop} 
          disabled={timeRemaining === 0}
          style={{ 
            margin: '10px', 
            padding: '10px 20px', 
            cursor: 'pointer',
            backgroundColor: isRunning ? '#d9534f' : '#5cb85c',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          {isRunning ? 'STOP' : 'START'}
        </button>
        
        <button 
          onClick={handleReset}
          style={{ 
            margin: '10px', 
            padding: '10px 20px', 
            cursor: 'pointer',
            backgroundColor: '#0275d8',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          RESET
        </button>
      </div>
    </Layout>
  );
}

export default HourglassPage;