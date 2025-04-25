import { useState, useEffect, useContext } from "react";
import {
  Container,
  ReplyBox,
  Field,
  PaginationWrapper,
  PageButton,
} from "./Reply.style";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
const Reply = () => {
  const { auth } = useContext(AuthContext);
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/comments", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log("받아온 데이터:", response.data);
          setReplyList(response.data);
        })
        .catch((error) => {
          console.error("댓글게시판조회 실패 : ", error);
        });
    }
  }, [auth.accessToken]);

  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          댓글 조회
        </h2>
        {replyList.map((item) => (
          <ReplyBox key={item}>
            <Field> 게시판 제목 : {item.title} </Field>
            <Field> 댓글 : {item.content}</Field>
            <Field> 작성일: {item.createDate}</Field>
            <Field> 조회수: {item.count}</Field>
          </ReplyBox>
        ))}

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
