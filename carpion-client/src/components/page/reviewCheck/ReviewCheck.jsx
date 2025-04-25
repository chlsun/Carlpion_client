import {
  Container,
  ReviewBox,
  Field,
  PageButton,
  PaginationWrapper,
} from "./ReviewChcek.styles";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const ReviewCheck = () => {
  const { auth } = useContext(AuthContext);
  const [review, setReview] = useState([]);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/reviews", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log("받아온 데이터:", response.data);
          setReview(response.data);
        })
        .catch((error) => {
          console.error("리뷰게시판조회 실패 : ", error);
        });
    }
  }, [auth.accessToken]);

  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          리뷰 게시글 조회
        </h2>
        {review.map((item) => (
          <ReviewBox key={item.reviewNo}>
            <Field> 게시글번호: {item.reviewNo} </Field>
            <Field> 제목: {item.title}</Field>
            <Field> 작성일: {item.createDate} </Field>
            <Field> 조회수: {item.count}</Field>
            <Field>
              파일 URL: {item.fileUrl}
              <a></a>
            </Field>
          </ReviewBox>
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

export default ReviewCheck;
