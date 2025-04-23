import { useState, useEffect } from "react";
import {
  Container,
  ReplyBox,
  Field,
  ReplyTitle,
  ReplyContent,
  ReplyTime,
  PaginationWrapper,
  PageButton,
} from "./Reply.style";
import axios from "axios";
const Reply = () => {
  const handleSwitch = () => {};
  /*  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios.get("http://localhost:80/mypage/comments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  })
    .then((response) => {
      setReplyList(response.data);
    })
    .catch((error) => {
      console.log("댓글가져오기실패 : ", error);
    }); */
  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          댓글 조회
        </h2>

        <ReplyBox>
          <Field> 게시글타입: </Field>
          <Field> 게시글번호: </Field>
          <Field> 제목: </Field>
          <Field> 댓글 : </Field>
          <Field> 작성일: </Field>
          <Field> 조회수: </Field>
        </ReplyBox>
        <ReplyBox>
          <Field> 게시글타입: </Field>
          <Field> 게시글번호: </Field>
          <Field> 제목: </Field>
          <Field> 댓글 : </Field>
          <Field> 작성일: </Field>
          <Field> 조회수: </Field>
        </ReplyBox>
        <ReplyBox>
          <Field> 게시글타입: </Field>
          <Field> 게시글번호: </Field>
          <Field> 제목: </Field>
          <Field> 댓글 : </Field>
          <Field> 작성일: </Field>
          <Field> 조회수: </Field>
        </ReplyBox>
        <PaginationWrapper>
          <PageButton>{"<"}</PageButton>
          {[1, 2, 3, 4, 5].map((num) => (
            <PageButton key={num}>{num}</PageButton>
          ))}
        </PaginationWrapper>
      </Container>
    </>
  );
};
export default Reply;
