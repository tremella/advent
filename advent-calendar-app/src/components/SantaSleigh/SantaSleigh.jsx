import React, { useRef, useEffect, useState } from 'react';

const SantaSleighCanvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [animationRunning, setAnimationRunning] = useState(true);
  const audioRef = useRef(new Audio('/advent/sounds/sleigh_bells.mp3')); // Initialize audio in ref


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const santaImage = new Image();
    santaImage.src = '/advent/santa_sleigh.png'; // Path to your Santa image

    let y = -100; // Start above the canvas
    const verticalSpeed = 1; // Vertical descent speed    
    const waveAmplitude = canvas.width / 2; // Use half the canvas width for amplitude
    const waveFrequency = 0.02; // Adjust for more or fewer arcs

    santaImage.onload = () => {
        // Scale the image size based on canvas size while maintaining aspect ratio
        const aspectRatio = santaImage.naturalWidth / santaImage.naturalHeight;
        const imageWidth = canvas.width * 0.1; // For example, 10% of the canvas width
        const imageHeight = imageWidth / aspectRatio;

        const draw = () => {
            if (!animationRunning) {  
                audioRef.current.pause();
                return; // Stop the animation
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          
            // Horizontal wave movement across the full width
            const waveX = waveAmplitude * Math.sin(y * waveFrequency);
            const x = (canvas.width / 2) + waveX;            
            // Determine direction of movement (right or left)
            const movingRight = Math.cos(y * waveFrequency) >= 0;

            // Flip the image if moving left
            if (!movingRight) {
                ctx.save(); // Save the current state
                ctx.scale(-1, 1); // Flip context horizontally
                ctx.drawImage(santaImage, -(x + imageWidth), y, imageWidth, imageHeight); // Draw flipped image
                ctx.restore(); // Restore the original state
            } else {
                ctx.drawImage(santaImage, x, y, imageWidth, imageHeight);
            }

            // Steady vertical movement
            y += verticalSpeed;
            if (y > canvas.height - imageHeight) {
                canvas.style.display = 'none'; // Hide the canvas
                setAnimationRunning(false); // Stop the animation when Santa reaches the bottom                
            } else {
                requestAnimationFrame(draw);
            }                 
        };
        audioRef.current.play(); // Start playing the audio
        draw();
    };

    // Cleanup function
    return () => {
        if (santaImage.complete) {
            audioRef.current.pause();  
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
  }, [width, height, animationRunning]);

  return (
    <canvas
      ref={canvasRef}
      className="santaCanvas"
      width={width}
      height={height}
      style={{ display: animationRunning ? 'block' : 'none' ,
              top: window.scrollY + 'px'}} // Control visibility based on animationRunning
    />
  );
};

export default SantaSleighCanvas;
