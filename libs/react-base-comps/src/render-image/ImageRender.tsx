import React, { useState } from 'react';
import styles from "./ImageRender.module.css";

interface ImageZoomProps {
  src: string;
  alt: string;
  maxZoom?: number; // Maximum zoom scale (e.g., 3 for 300%)
  minZoom?: number; // Minimum zoom scale (e.g., 0.5 for 50%)
  step?: number;    // Zoom increment step
}

export const ImageRender: React.FC<ImageZoomProps> = ({
  src,
  alt,
  maxZoom = 3,
  minZoom = 0.5,
  step = 0.1,
}) => {
  const [scale, setScale] = useState<number>(1); // Initial zoom scale
  const [offsetX, setOffsetX] = useState<number>(0); // Offset for panning horizontally
  const [offsetY, setOffsetY] = useState<number>(0); // Offset for panning vertically

  // Zoom in function
  const handleZoomIn = () => {
    if (scale < maxZoom) {
      setScale((prevScale) => Math.min(prevScale + step, maxZoom));
    }
  };

  // Zoom out function
  const handleZoomOut = () => {
    if (scale > minZoom) {
      setScale((prevScale) => Math.max(prevScale - step, minZoom));
    }
  };

  // Reset zoom and position
  const handleReset = () => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  // Handle drag for panning the image
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX - offsetX;
    const startY = e.clientY - offsetY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setOffsetX(moveEvent.clientX - startX);
      setOffsetY(moveEvent.clientY - startY);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.img_controller}>
        <button className={styles.img_control} onClick={handleZoomIn} >Zoom In</button>
        <button className={styles.img_control} onClick={handleZoomOut} >Zoom Out</button>
        <button className={styles.img_control} onClick={handleReset} >Reset</button>
      </div>
      <div className={styles.img_container} onMouseDown={handleMouseDown}>
        <img src={src} alt={alt} style={{
            transform: `scale(${scale}) translate(${offsetX / scale}px, ${offsetY / scale}px)`,
            transition: 'transform 0.1s ease-out',
            transformOrigin: 'center',
          }}
          draggable="false"
        />
      </div>
      
    </div>
  );
};

