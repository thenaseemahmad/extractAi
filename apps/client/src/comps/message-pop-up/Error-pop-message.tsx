import React, { useEffect, useState } from "react";
import styles from "./Error-pop-message.module.css";

interface ErrorPopMessageProps {
  message: string;
  onClose?: () => void;
  duration?: number; // Duration in milliseconds (default: 3000ms)
}

const ErrorPopMessage: React.FC<ErrorPopMessageProps> = ({ message, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [duration, onClose]);

  if (!isVisible) {
    return null; // Hide component when not visible
  }

  return (
    <div className={styles.errorPopMessage}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={() => {
        setIsVisible(false);
        onClose && onClose();
      }}>
        ✖
      </button>
    </div>
  );
};

export default ErrorPopMessage;
