import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./DetailPage.css";

function DetailPage() {
  const editorRef = useRef();

  const handleSubmit = () => {
    const title = document.querySelector("#post-title").value;
    const content = editorRef.current.getInstance().getMarkdown();

    console.log("제목:", title);
    console.log("내용:", content);
    // TODO: POST 요청
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
          addImageBlobHook: async (blob, callback) => {
            try {
              const dummyImageUrl = "https://via.placeholder.com/500";
              console.log("업로드된 이미지 URL:", dummyImageUrl);
              callback(dummyImageUrl, "업로드된 이미지");
            } catch (err) {
              console.error("이미지 업로드 실패", err);
            }
          },
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

export default DetailPage;
