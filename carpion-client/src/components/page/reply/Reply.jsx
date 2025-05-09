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
import { useNavigate } from "react-router-dom";
const Reply = () => {
  const { auth } = useContext(AuthContext);
  const [replyList, setReplyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(3);

  const navigate = useNavigate();
  const goToDetail = (reviewNo) => {
    navigate(`/cd/${reviewNo}`);
  };

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/comments", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
        })
        .then((response) => {
          const { replyList, totalCount } = response.data;
          console.log("받아온 데이터:", response.data);
          setReplyList(replyList);
          setTotalPages(Math.ceil(totalCount / limit));
        })
        .catch((error) => {
          console.error("댓글게시판조회 실패 : ", error);
        });
    }
  }, [auth.accessToken, currentPage, limit]);

  return (
    <>
      <Container>
        <h2
          style={{
            textAlign: "center",
            marginTop: "80px",
            fontWeight: "bold",
          }}
        >
          댓글 조회
        </h2>
        {replyList.map((item, index) => (
          <ReplyBox
            key={item.commentNo}
            onClick={() => goToDetail(item.reviewNo)}
          >
            <Field> 게시판 번호 : {index + 1} </Field>
            <Field> 게시판 제목 : {item.title} </Field>
            <Field> 댓글 : {item.content}</Field>
            <Field> 작성일: {item.createDate}</Field>
            <Field> 조회수: {item.count}</Field>
          </ReplyBox>
        ))}

        <PaginationWrapper>
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <PageButton
                key={num}
                onClick={() => {
                  if (currentPage !== num) setCurrentPage(num);
                }}
                style={{
                  fontWeight: currentPage === num ? "bold" : "normal",
                }}
              >
                {num}
              </PageButton>
            ))}
        </PaginationWrapper>
      </Container>
    </>
  );
};
export default Reply;
