import React, { useRef, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import wpstyles from "./NoticeWrite.module.css";

function NoticeEdit() {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const { noticeNo } = useParams();
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    fileUrl: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/notice/${noticeNo}`);
        setPost(res.data);

        if (res.data.fileUrl) {
          const imageUrl = `http://localhost:80/uploads/${res.data.fileUrl}`;
          setPreviewImage(imageUrl);

          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], "existing_image.jpg", {
            type: blob.type,
          });
          setImageFile(file);
        }
      } catch (err) {
        console.error("fetchPost error:", err);
      }
    };
    fetchPost();
  }, [noticeNo]);

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
  }, [auth, loading, navigate, accessToken]);

  const handleAddImage = (blob, callback) => {
    if (imageFile) {
      alert("이미지는 한 개만 업로드할 수 있습니다.");
      callback("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(blob);
    setImageFile(blob);
    callback("");
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const editorInstance = editorRef.current.getInstance();
    const updatedContent = editorInstance.getMarkdown();

    if (!post.title.trim()) {
      alert("제목을 입력하세요");
      return;
    }

    if (!updatedContent.trim()) {
      alert("내용을 입력하세요");
      return;
    }

    if (!accessToken) {
      alert("로그인 후 글쓰기가 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", updatedContent);

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await axios.put(`http://localhost:80/notice/${noticeNo}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("수정 완료!");
      navigate(`/nd/${noticeNo}`);
    } catch (error) {
      console.error("submit error:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={wpstyles.writePageOuter}>
      <div className={wpstyles.writePageContainer}>
        <h2 className={wpstyles.writePageTitle}>공지사항 수정</h2>

        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          className={wpstyles.postTitleInput}
        />

        {post.content && (
          <Editor
            ref={editorRef}
            initialValue={post.content}
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
        )}

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
            수정
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeEdit;
