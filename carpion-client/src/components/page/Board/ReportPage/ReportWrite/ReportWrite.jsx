import React, { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import wpstyles from "./ReportWrite.module.css";

function ReportWrite() {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState(null); // 단일 이미지 상태
  const [previewImage, setPreviewImage] = useState(null); // 미리보기 상태

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

  // 이미지 업로드 함수
  const handleAddImage = async (blob, callback) => {
    if (imageFile) {
      alert("이미지는 한 개만 업로드할 수 있습니다.");
      callback(""); // 기존 이미지 블롭을 지우기
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // 미리보기 설정
    };
    reader.readAsDataURL(blob);

    setImageFile(blob); // 이미지 파일 상태 설정
    callback(""); // 기존 이미지 블롭을 지우기
  };

  // 글 등록 함수
  const handleSubmit = async () => {
    const title = document.querySelector("#post-title").value;
    const content = editorRef.current.getInstance().getMarkdown();

    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력하세요");
      return;
    }

    if (!accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 이미지가 있을 경우에만 파일을 폼 데이터에 추가
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:80/reports",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("등록 완료!");
      navigate(-1);
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // 취소 버튼 클릭 시
  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 사라집니다. 취소하시겠습니까?")) {
      navigate("/rb");
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

        {/* 미리보기 이미지가 있을 경우에만 표시 */}
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
                onClick={() => {
                  setPreviewImage(null);
                  setImageFile(null); // 이미지 상태 초기화
                }}
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

export default ReportWrite;
