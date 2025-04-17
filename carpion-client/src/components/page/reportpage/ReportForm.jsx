import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./ReportPage.css";

const ReportForm = () => {
  const navi = useNavigate();
  const editorRef = useRef();
  const [accessToken, setAccessToken] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const fileInputRef = useRef(null); 
  const [filePreviews, setFilePreviews] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     alert("로그인이 필요합니다.");
  //     navi("/login");
  //   } else {
  //     setAccessToken(token);
  //     console.log("ReportForm: Access Token 로드 완료");
  //   }
  // }, [navi]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    const newPreviews = files.map((file) => {
      return new Promise((resolve) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({ 
              name: file.name, 
              type: file.type, 
              previewUrl: e.target.result
            });
          };
          reader.readAsDataURL(file);
        } else {
          resolve({ 
            name: file.name, 
            type: file.type, 
            previewUrl: null 
          });
        }
      });
    });

    Promise.all(newPreviews).then((results) => { 
      setFilePreviews(results); 
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleSubmit = () => {
    const titleInput = document.querySelector("#post-title");
    const title = titleInput ? titleInput.value : "";
    const content = editorRef.current?.getInstance().getMarkdown() || "";

    if ( !title.trim()) {
      alert("제목을 입력해주세요.");
      titleInput?.focus();
      return;
    }
    if ( !content.trim()) {
      alert("내용을 입력해주세요.");
      editorRef.current?.getInstance().focus();
      return;
    }

    const reportData = {
      title: title,
      content: content,
      
    };

    const formData = new FormData();
    formData.append("report", JSON.stringify(reportData)); 
    selectedFiles.forEach((file) => {
      formData.append("files", file); 
    });

    axios
      .post(`http://localhost/reports`, formData, { 
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("게시글 등록 및 파일 업로드 서버 응답:", result);
        if (result.status === 201 || result.status === 200) {
          alert("게시글이 성공적으로 등록되었고 파일이 저장되었습니다!");
          navi("/reports");
        }
      })
      .catch((err) => {
        console.error("게시글 등록 및 파일 업로드 실패:", err);
      });
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
    setFilePreviews([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="write-page-container">
      <h2 className="write-page-title">글쓰기</h2>
      <input
        id="post-title"
        type="text"
        placeholder="제목을 입력하세요"
        className="post-title-input"
      />
      <Editor
        ref={editorRef}
        placeholder="내용을 입력하세요"
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr'],
          ['ul', 'ol', 'task'],
          ['indent', 'outdent'],
          ['table', 'link'],
          // ['image'], // 이미지 아이콘 제거
          // ['code', 'codeblock'], // 코드 작성 구문 제거
          ['scrollSync'],
        ]}
      />
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
            파일
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
        <button 
          className="submit-button" 
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      {filePreviews.length > 0 && (
        <div className="file-preview-section">
          <h4>파일 미리보기:</h4>
          <div className="preview-container">
            {filePreviews.map((preview, index) => (
              <div key={index} className="preview-item">
                {preview.previewUrl ? (
                  <img
                    src={preview.previewUrl}
                    alt={preview.name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                ) : (
                  <span>{preview.name} (이미지 아님)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
