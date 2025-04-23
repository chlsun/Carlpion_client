import {
  Wrapper,
  Title,
  InquiryBox,
  InquiryContent,
  InquiryDate,
  InquiryTitle,
  PageButton,
  PaginationWrapper,
} from "./ReviewChcek.styles";

const ReviewCheck = () => {
  const handleSwitch = () => {};
  const reviewList = [
    {
      reivewNo: "1",
      title: "렌트 요금 문의",
      content: "주말 요금도 동일한가요?",
      createDate: "2025-04-20",
    },
    {
      reivewNo: "2",
      title: "회원가입 관련 문의",
      content: "비밀번호 변경은 어디서 하나요?",
      createDate: "2025-04-18",
    },
    {
      reivewNo: "3",
      title: "회원가입 관련 문의",
      content: "비밀번호 변경은 어디서 하나요?",
      createDate: "2025-04-18",
    },
  ];

  return (
    <>
      <Wrapper>
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
          리뷰 게시판
        </h2>
        <Title>리뷰 게시글 조회</Title>
        {reviewList.map((item, index) => (
          <InquiryBox key={index}>
            <InquiryTitle>타이틀</InquiryTitle>
            <InquiryDate>작성일</InquiryDate>
            <InquiryContent>내용</InquiryContent>
          </InquiryBox>
        ))}
        <PaginationWrapper>
          <PageButton onClick={handleSwitch}>{"<"}</PageButton>
          {[1, 2, 3, 4, 5].map((num) => (
            <PageButton key={num}>{num}</PageButton>
          ))}
        </PaginationWrapper>
      </Wrapper>
    </>
  );
};

export default ReviewCheck;
