import React, { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import wpstyles from "./NoticeWrite.module.css";

function NoticeWrite() {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null); // 로컬 이미지 상태
  const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태

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

  // 이미지를 로컬에서만 처리하고 서버 호출을 하지 않음
  const handleAddImage = (blob, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // 미리보기 이미지 상태 업데이트
    };
    reader.readAsDataURL(blob); // Blob을 데이터 URL로 변환

    setImageFile(blob); // 이미지 파일 상태 업데이트
    callback(""); // 이미지 URL을 빈 문자열로 호출해서 에디터에 이미지를 삽입하지 않음
  };

  // 이미지 삭제
  const handleRemoveImage = () => {
    setImageFile(null); // 이미지 파일 상태 초기화
    setPreviewImage(null); // 미리보기 이미지 상태 초기화
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
    // 이미지 파일이 있을 경우만 포함
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await axios.post("http://localhost:80/notice", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("등록 완료!");
      navigate("/nb");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 사라집니다. 취소하시겠습니까?")) {
      navigate("/nb");
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
            addImageBlobHook: handleAddImage, // 이미지 업로드 시 처리 함수
          }}
        />

        {/* 이미지 미리보기 */}
        {previewImage && (
          <div className={wpstyles.previewImages}>
            <div className={wpstyles.previewImageWrapper}>
              <img
                src={previewImage}
                alt="미리보기"
                className={wpstyles.previewImage}
              />
              <button
                className={wpstyles.removeImageButton}
                onClick={handleRemoveImage}
              >
                x
              </button>
            </div>
          </div>
        )}

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

export default NoticeWrite;
