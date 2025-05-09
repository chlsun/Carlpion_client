import axios from "axios";
import {
  Container,
  Field,
  InquiryBox,
  PaginationWrapper,
  PageButton,
} from "./InquiryCheck.styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const InquiryCheck = () => {
  const { auth } = useContext(AuthContext);
  const [inquiryList, setInquiryList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);

  const navigate = useNavigate();
  const goToDetail = (reportNo) => {
    navigate(`/rd/${reportNo}`);
  };

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/reports", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
        })
        .then((response) => {
          console.log("받아온 데이터:", response.data);
          const { inquiryList, totalCount } = response.data;
          setInquiryList(inquiryList);
          setTotalPages(Math.ceil(totalCount / limit));
          console.log("토탈", totalCount);
        })
        .catch((error) => {
          console.error("문의글 조회 실패: ", error);
        });
    }
  }, [auth.accessToken, currentPage, limit]);

  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          문의 게시글 조회
        </h2>
        {inquiryList.map((item, index) => (
          <InquiryBox
            key={item.reportNo}
            onClick={() => goToDetail(item.reportNo)}
          >
            <Field> 게시글번호: {index + 1} </Field>
            <Field> 제목: {item.title} </Field>
            <Field> 작성일: {item.createDate} </Field>
            <Field> 조회수: {item.count} </Field>
          </InquiryBox>
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
export default InquiryCheck;
