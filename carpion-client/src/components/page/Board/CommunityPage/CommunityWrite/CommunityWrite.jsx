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
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일 관리 상태 추가

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

  const handleAddImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob);

    try {
      const response = await axios.post(
        "http://localhost:80/upload", // 이미지 업로드 엔드포인트
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.imageUrl;
      setImageFiles((prevFiles) => [...prevFiles, imageUrl]); // 이미지 URL을 상태에 추가

      const markdownImageTag = `![이미지](${imageUrl})`;
      callback(markdownImageTag); // 이미지 URL을 에디터에 삽입
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    const title = document.querySelector("#post-title").value;
    const content = editorRef.current.getInstance().getMarkdown();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 이미지 파일 추가
    if (imageFiles.length > 0) {
      imageFiles.forEach((imageUrl, index) => {
        formData.append(`images[${index}]`, imageUrl); // 각 이미지 URL을 FormData에 추가
      });
    }

    if (!accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:80/reviews", // 리뷰 등록 엔드포인트
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
            addImageBlobHook: handleAddImage, // 이미지 업로드 후 에디터에 삽입
          }}
        />

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
