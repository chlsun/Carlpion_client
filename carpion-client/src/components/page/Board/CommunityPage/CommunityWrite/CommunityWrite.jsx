import React, { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import cwstyles from "./Community.module.css";

function ReviewWrite() {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (!loading && !accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/start");
    }
  }, [auth, loading, navigate]);

  const handleAddImage = (blob, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages((prev) => [...prev, reader.result]);
    };
    reader.readAsDataURL(blob);

    setImageFiles((prev) => [...prev, blob]);
    callback("");
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const title = document.querySelector("#post-title").value;
    const content = editorRef.current.getInstance().getMarkdown();

    if (!title.trim()) {
      alert("제목을 입력하세요");
      document.querySelector("#post-title").focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력하세요");
      editorRef.current.getInstance().focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    imageFiles.forEach((file) => formData.append("file", file));

    try {
      await axios.post("http://localhost:80/reviews", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("등록 완료!");
      navigate("/cb");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 사라집니다. 취소하시겠습니까?")) {
      navigate("/cb");
    }
  };

  return (
    <div className={cwstyles.writePageOuter}>
      <div className={cwstyles.writePageContainer}>
        <h2 className={cwstyles.writePageTitle}>글쓰기</h2>
        <input
          id="post-title"
          type="text"
          placeholder="제목을 입력하세요"
          className={cwstyles.postTitleInput}
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

        {previewImages.length > 0 && (
          <div className={cwstyles.previewImages}>
            {previewImages.map((image, index) => (
              <div key={index} className={cwstyles.previewImageWrapper}>
                <img
                  src={image}
                  alt={`미리보기 ${index}`}
                  className={cwstyles.previewImage}
                />
                <button
                  className={cwstyles.removeImageButton}
                  onClick={() => handleRemoveImage(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={cwstyles.submitButtonWrapper}>
          <button className={cwstyles.submitButton} onClick={handleSubmit}>
            등록
          </button>
          <button className={cwstyles.cancelButton} onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewWrite;
