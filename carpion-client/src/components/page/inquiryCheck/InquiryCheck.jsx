import {
  Container,
  Field,
  InquiryBox,
  PaginationWrapper,
  PageButton,
} from "./InquiryCheck.styles";
const InquiryCheck = () => {
  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          문의 게시글 조회
        </h2>

        <InquiryBox>
          <Field> 게시글번호: </Field>
          <Field> 제목: </Field>
          <Field> 작성일: </Field>
          <Field> 조회수: </Field>
          <Field>
            파일 URL:{" "}
            <a href target="_blank" rel="noreferrer">
              파일 보기
            </a>
          </Field>
        </InquiryBox>
        <InquiryBox>
          <Field> 게시글번호: </Field>
          <Field> 제목: </Field>
          <Field> 작성일: </Field>
          <Field> 조회수: </Field>
          <Field>
            파일 URL:{" "}
            <a href target="_blank" rel="noreferrer">
              파일 보기
            </a>
          </Field>
        </InquiryBox>
        <InquiryBox>
          <Field> 게시글번호: </Field>
          <Field> 제목: </Field>
          <Field> 작성일: </Field>
          <Field> 조회수: </Field>
          <Field>
            파일 URL:{" "}
            <a href target="_blank" rel="noreferrer">
              파일 보기
            </a>
          </Field>
        </InquiryBox>
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
