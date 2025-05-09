import React, { useRef, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import wpstyles from "./Community.module.css";

function ReviewEdit() {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const { reviewNo } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
    fileUrls: [],
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/reviews/${reviewNo}`);
        setPost(res.data);
        const urls = res.data.fileUrls.map(
          (url) => `http://localhost:80/uploads/${url}`
        );
        setPreviewImages(urls);
        const blobs = await Promise.all(
          urls.map(async (url, i) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], `existing_${i}.jpg`, { type: blob.type });
          })
        );
        setImageFiles(blobs);
        console.log("Initial imageFiles:", blobs);
      } catch (err) {
        console.error("fetchPost error:", err);
      }
    };
    fetchPost();
  }, [reviewNo]);

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
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages((prev) => {
        const updated = [...prev, reader.result];
        return updated;
      });
    };
    reader.readAsDataURL(blob);
    setImageFiles((prev) => {
      const updated = [...prev, blob];
      console.log("Updated imageFiles:", updated);
      return updated;
    });
    callback("");
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      console.log("Updated imageFiles after removal:", updated);
      return updated;
    });
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

    imageFiles.forEach((file) => {
      console.log("Appending file to formData:", file);
      formData.append("file", file);
    });

    try {
      await axios.put(`http://localhost:80/reviews/${reviewNo}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("수정 완료!");
      navigate(`/cd/${reviewNo}`);
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

        {previewImages.length > 0 && (
          <div className={wpstyles.previewImages}>
            {previewImages.map((image, index) => (
              <div key={index} className={wpstyles.previewImageWrapper}>
                <img
                  src={image}
                  alt={`미리보기 ${index}`}
                  className={wpstyles.previewImage}
                />
                <button
                  className={wpstyles.removeImageButton}
                  onClick={() => handleRemoveImage(index)}
                >
                  x
                </button>
              </div>
            ))}
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

export default ReviewEdit;
