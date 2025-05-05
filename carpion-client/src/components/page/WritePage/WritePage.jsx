import React, { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import wpstyles from "./WritePage.module.css";

function WritePage() {
  const editorRef = useRef();
  const imageMapRef = useRef([]);
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (!loading && !auth.isAuthenticated) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/start");
    }
  }, [auth, loading, navigate]);

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

    imageMapRef.current.forEach(({ blob, localUrl, placeholder }) => {
      formData.append("images", blob);
      content = content.replaceAll(localUrl, placeholder);
    });

    formData.append("content", content);

    try {
      const response = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("등록 완료!");
      navigate(-1);
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 사라집니다. 취소하시겠습니까?")) {
      navigate(-1);
    }
  };

  return (
    <div className={wpstyles.writePageOuter}>
      <div className={wpstyles.writePageContainer}>
        <h2 className={wpstyles.writePageTitle}>글쓰기</h2>
        <input
          id="post-title"
          type="text"
          placeholder="제목을 입력하세요"
          className={wpstyles.postTitleInput}
        />
        <Editor
          ref={editorRef}
          placeholder="내용을 입력하세요"
          previewStyle="vertical"
          height="500px"
          initialEditType="wysiwyg"
          language="ko"
          useCommandShortcut={false}
          hideModeSwitch={true}
          hooks={{
            addImageBlobHook: handleAddImage,
          }}
        />

        <div className={wpstyles.submitButtonWrapper}>
          <button className={wpstyles.submitButton} onClick={handleSubmit}>
            등록
          </button>
          <button className={wpstyles.cancelButton} onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default WritePage;
