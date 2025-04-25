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
  const imageMapRef = useRef([]); // 이미지 데이터 추적용
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth; // accessToken 가져오기
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && auth.isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (!loading && !accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/start"); // 로그인 페이지로 리디렉션
    }
  }, [auth, loading, navigate]);

  // 이미지 업로드 처리 함수
  const handleAddImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob); // 이미지 파일을 FormData에 추가

    // 서버로 이미지 업로드
    try {
      const response = await axios.post(
        "http://localhost:80/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.imageUrl; // 서버에서 반환된 이미지 URL
      const markdownImageTag = `![이미지](${imageUrl})`; // 마크다운 형식으로 변환
      callback(markdownImageTag, "이미지"); // 에디터에 이미지 URL 삽입
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  // 글 작성 및 이미지 업로드 후 데이터 전송
  const handleSubmit = async () => {
    const title = document.querySelector("#post-title").value;

    // 여기서 마크다운 형식으로 내용을 가져옵니다
    let content = editorRef.current.getInstance().getMarkdown(); // getMarkdown() 사용

    // 제목과 내용만 FormData로 전송
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (!accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:80/reports",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("등록 완료!");
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // 취소 버튼 클릭 시
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
            addImageBlobHook: handleAddImage, // 이미지 업로드 처리
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

export default ReportWrite;
