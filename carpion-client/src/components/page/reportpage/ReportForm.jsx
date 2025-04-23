import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./ReportForm.css";
import FileUpload from "../FileUpload/FileUpload";

const ReportForm = () => {
  const navi = useNavigate();
  const editorRef = useRef();
  const [accessToken, setAccessToken] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if ( !token) {
  //     alert("로그인이 필요합니다.");
  //     navi("/login");
  //   } else {
  //     setAccessToken(token);
  //   }
  // }, []);

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleFilesCleared = () => {
    setSelectedFiles([]);
  };

  const handleSubmit = () => {
    const titleInput = document.querySelector("#post-title");
    const title = titleInput ? titleInput.value : "";
    const content = editorRef.current?.getInstance().getMarkdown() || "";

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      titleInput?.focus();
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      editorRef.current?.getInstance().focus();
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
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
        console.log(result);
        if (result.status === 201 || result.status === 200) {
          alert("게시글이 성공적으로 등록되었고 파일이 저장되었습니다!");
          navi("/reports");
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
          ["heading", "bold", "italic", "strike"],
          ["hr"],
          ["ul", "ol", "task"],
          ["indent", "outdent"],
          ["link"],
          ["image"],
          ["scrollSync"],
        ]}
      />
      <FileUpload
        onFilesSelected={handleFilesSelected}
        onFilesCleared={handleFilesCleared}
      />
      <button className="submit-button" onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};

export default ReportForm;
