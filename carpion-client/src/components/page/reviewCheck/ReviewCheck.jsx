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
import { useNavigate } from "react-router-dom";

const ReviewCheck = () => {
  const { auth } = useContext(AuthContext);
  const [reviewList, setReviewList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);

  const navigate = useNavigate();
  const goToDetail = (reviewNo) => {
    navigate(`/cd/${reviewNo}`);
  };

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/reviews", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
        })
        .then((response) => {
          const { reviewList, totalCount } = response.data;
          console.log("받아온 데이터:", response.data);

          setReviewList(reviewList);
          setTotalPages(Math.ceil(totalCount / limit));
          console.log("토탈", totalCount);
        })
        .catch((error) => {
          console.error("리뷰게시판조회 실패 : ", error);
        });
    }
  }, [auth.accessToken, currentPage, limit]);

  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          리뷰 게시글 조회
        </h2>
        {reviewList.map((item, index) => (
          <ReviewBox
            key={item.reviewNo}
            onClick={() => goToDetail(item.reviewNo)}
          >
            <Field> 게시글번호: {index + 1} </Field>
            <Field> 제목: {item.title}</Field>
            <Field> 작성일: {item.createDate} </Field>
            <Field> 조회수: {item.count}</Field>
          </ReviewBox>
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

export default ReviewCheck;
