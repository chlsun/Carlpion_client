import React, { useState, useRef } from 'react';
import './FileUpload.css'; 

const FileUpload = ({ onFilesSelected, onFilesCleared, initialFiles = [] }) => {
  const [selectedFiles, setSelectedFiles] = useState(initialFiles);
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const maxFileSize = 1024 * 1024 * 20; //20MB

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = [];
    const previews = [];
  
    for (const file of files) {
      if (file.size > maxFileSize) {
        alert(`${file.name} 파일의 크기가 제한(20MB)을 초과합니다.`);
        continue;
      }
  
      if (file.type.startsWith("image/")) {
        imageFiles.push(file);
  
        const reader = new FileReader();
        const previewPromise = new Promise((resolve) => {
          reader.onload = (e) => {
            resolve({
              name: file.name,
              type: file.type,
              previewUrl: e.target.result
            });
          };
        });
        reader.readAsDataURL(file);
        previews.push(previewPromise);
      }
    }

    setSelectedFiles(imageFiles);   

    Promise.all(previews).then((results) => {
      setFilePreviews(results);
    });

    onFilesSelected(imageFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
    setFilePreviews([]);

    if (fileInputRef.current) {
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
          accept="image/*"
        />
        <button
          className="file-upload-button"
          onClick={handleButtonClick}
        >
          파일 업로드
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
              선택된 파일: {" "}
              {selectedFiles.map((file, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {file.name}
                </React.Fragment>
              ))}
            </span>
          </>
        )}
      </div>
      {filePreviews.length > 0 && (
        <div className="file-preview-section">
          <h4>파일 미리보기:</h4>
          <div className="preview-container">
            {filePreviews.map((preview, index) => (
              <div 
                key={index} 
                className="preview-item"
              >
                {preview.previewUrl ? (
                  <img
                    src={preview.previewUrl}
                    alt={preview.name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                ) : (
                  <span>{preview.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
