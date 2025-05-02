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

  // 게시글 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:80/notice/${noticeNo}`);
        setPost({
          title: res.data.title,
          content: res.data.content,
        });
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

  // 이미지 URL 추출 함수
  const extractImageUrls = (markdown) => {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const urls = [];
    let match;
    while ((match = regex.exec(markdown)) !== null) {
      urls.push(match[1]);
    }
    return urls;
  };

  // 글 제출 처리
  const handleSubmit = async () => {
    const editorInstance = editorRef.current.getInstance();
    const updatedContent = editorInstance.getMarkdown();
    const imageUrls = extractImageUrls(updatedContent);

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", updatedContent);
    formData.append("fileUrls", JSON.stringify(imageUrls)); // 여러 이미지 전송

    // 콘솔 출력용
    console.log("수정 요청 데이터 확인:");
    for (let pair of formData.entries()) {
      console.log(`content:`, pair[1]);
    }

    alert("※ 실제 요청은 전송되지 않았고 콘솔에 데이터만 출력되었습니다.");

    // 실제 PUT 요청은 주석 처리
    // try {
    //   await axios.put(`http://localhost:80/notice/${noticeNo}`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   alert("수정 완료!");
    //   navigate(`/nd/${noticeNo}`);
    // } catch (error) {
    //   console.error("수정 실패:", error.response?.data || error);
    //   alert("수정 중 오류가 발생했습니다.");
    // }
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
          />
        )}

        {post.content && extractImageUrls(post.content).length > 0 && (
          <div className={wpstyles.previewImageWrapper}>
            {extractImageUrls(post.content).map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`미리보기 이미지 ${idx + 1}`}
                className={wpstyles.previewImage}
              />
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

export default NoticeEdit;
