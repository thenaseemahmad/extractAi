import React, { useState } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  function handleDrop(event: React.DragEvent<HTMLDivElement>){
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  function clearFile() {
    setSelectedFile(null);
    onFileSelect(null)
  };

  return (
    <div
      className={`${styles.file_upload_dropzone} ${isDragging ? styles.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className={styles.file_input}
      />
      <p>{selectedFile ? 'Change file' : 'Drag & drop or click to upload'}</p>
      {selectedFile ? (
        <div className={styles.file_info}>
          <span>{selectedFile.name}</span>
          <button onClick={clearFile} className={styles.clear_button}>Remove</button>
        </div>
      ) : <div className={styles.file_info}>
        <span>No file selected</span>
      </div>}
    </div>
  );
};

export default FileUpload;

