import React, { useRef } from "react";
import axios from "axios";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./WritePage.css";

function WritePage() {
  const editorRef = useRef();
  const imageMapRef = useRef([]);

  const handleAddImage = async (blob, callback) => {
    const localUrl = URL.createObjectURL(blob);
    const placeholder = `image_placeholder_${imageMapRef.current.length}`;
    imageMapRef.current.push({ blob, placeholder, localUrl });
    callback(localUrl, "임시 이미지");
  };

  const handleSubmit = async () => {
    const title = document.querySelector("#post-title").value;
    let content = editorRef.current.getInstance().getHTML();

    const formData = new FormData();
    formData.append("title", title);

    imageMapRef.current.forEach(({ blob, localUrl, placeholder }, index) => {
      formData.append(`images`, blob);
      content = content.replaceAll(localUrl, placeholder);
    });

    formData.append("content", content);

    try {
      const response = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("글 등록 성공:", response.data);
      alert("등록 완료!");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
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
        language="ko"
        useCommandShortcut={false}
        hooks={{
          addImageBlobHook: handleAddImage,
        }}
      />
      <div className="submit-button-wrapper">
        <button className="submit-button" onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
}

export default WritePage;
