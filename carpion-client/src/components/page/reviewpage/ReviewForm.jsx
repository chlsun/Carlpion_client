import axios from "axios";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";

const reviewForm = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userNo, setUserNo] = useState("");
  const [file , setFile] = useState(null);

  useEffect(() => {
    
  });

  axios
    .post(`http://localhost/reviews`,  {

    })
    .then((result) => {
      if(result.status === 201){
        alert("게시글 작성 성공!");
        navi("/reviews");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <>
      <form>
      <title>게시글 작성</title>
        <label>제목</label>
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>내용</label>
        <input 
          type="text" 
          placeholder="내용을 입력하세요" 
          onChange={(e) => setContent(e.target.value)}
        />
        <label>작성자</label>
        <input 
          type="text" 
          value={userNo}
          readOnly
        />
        <label htmlFor="file">파일첨부</label>
        <input 
          type="file" 
          id="file"
          accept="image/*"
          onChange={""}
        />
        <button onClick={""}>작성하기</button>
      </form>
    </>
  );
}

export default reviewForm;
