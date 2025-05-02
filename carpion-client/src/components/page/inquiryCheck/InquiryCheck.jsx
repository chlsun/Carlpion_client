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
const InquiryCheck = () => {
  const { auth } = useContext(AuthContext);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/reports", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log("받아온 데이터:", response.data);
          setInquiries(response.data);
        })
        .catch((error) => {
          console.error("문의글 조회 실패: ", error);
        });
    }
  }, [auth.accessToken]);

  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          문의 게시글 조회
        </h2>
        {inquiries.map((item) => (
          <InquiryBox key={item}>
            <Field> 게시글번호: {item.reportNo} </Field>
            <Field> 제목: {item.title} </Field>
            <Field> 작성일: {item.createDate} </Field>
            <Field> 조회수: {item.count} </Field>
            <Field>
              파일 URL:{item.fileUrl}
              <a></a>
            </Field>
          </InquiryBox>
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
export default InquiryCheck;
