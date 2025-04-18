import React, { useState, useRef, useEffect } from 'react';
import './FileUpload.css'; // CSS 파일은 그대로 사용

const FileUpload = ({ onFilesSelected, onFilesCleared, initialFiles = [] }) => {
  const [selectedFiles, setSelectedFiles] = useState(initialFiles);
  const fileInputRef = useRef(null);
  const maxFileSize = 1024 * 1024 * 20; // 20MB
  const allowedDocExtensions = [
    '.pdf', 
    '.doc', 
    '.docx', 
    '.hwp', 
    '.txt', 
    '.xls', 
    '.xlsx', 
    '.ppt', 
    '.pptx'
  ];

  useEffect(() => {
    setSelectedFiles(initialFiles);
  }, [initialFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const documentFiles = [];

    for (const file of files) {
      if(file.size > maxFileSize) {
        alert(`${file.name} 파일의 크기가 제한(20MB)을 초과합니다.`);
        continue;
      }

      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      if(allowedDocExtensions.includes(fileExtension)) {
        documentFiles.push(file);
      }
    }

    setSelectedFiles(documentFiles);
    onFilesSelected(documentFiles); 

    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
    
    if(fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
    onFilesCleared(); 
  };

  return (
    <div className="file-upload-section">
      <div className="file-selector-group">
        <input
          type="file"
          multiple 
          onChange={handleFileChange}
          className="file-input-hidden"
          ref={fileInputRef}
          accept={allowedDocExtensions.join(', ')} 
        />
        <button
          className="file-upload-button"
          onClick={handleButtonClick}
        >
          문서 파일
        </button>

        {selectedFiles.length > 0 && (
          <>
            <button
              className="file-delete-button"
              onClick={handleClearFiles}
            >
              삭제
            </button>
            <span className="selected-file-info">
              선택된 파일: {selectedFiles.length}개
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
