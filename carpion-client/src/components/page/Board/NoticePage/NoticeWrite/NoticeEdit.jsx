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
  const { noticeNo } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/notice/${noticeNo}`);
        console.log("Fetched Post Data:", res.data);
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
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

  const handleAddImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob);

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

      const imageUrl = response.data.imageUrl;
      callback(imageUrl);
    } catch (error) {
      console.error(
        "이미지 업로드 실패:",
        error.response ? error.response.data : error
      );
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    const editorInstance = editorRef.current.getInstance();
    const updatedContent = editorInstance.getMarkdown();

    console.log("Posting updated data:", {
      title: post.title,
      content: updatedContent,
    });

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", updatedContent);

    try {
      await axios.put(`http://localhost:80/notice/${noticeNo}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("수정 완료!");
      navigate(`/nd/${noticeNo}`);
    } catch (error) {
      console.error("수정 실패:", error.response ? error.response.data : error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
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
