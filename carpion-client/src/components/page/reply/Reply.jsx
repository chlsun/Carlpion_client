import { useState } from "react";
import {
  Container,
  Header,
  Box,
  ReplyTitle,
  ReplyTime,
  ReplyContent,
  PaginationWrapper,
  PageButton,
} from "./Reply.style";

const Reply = () => {
  const handleSwitch = () => {};
  return (
    <>
      <Container>
        <Header>댓글 조회</Header>
        <Box>
          <div>공지사항</div>
          <ReplyTitle>게시물제목</ReplyTitle>
          <ReplyTime>시간</ReplyTime>
          <ReplyContent>댓글</ReplyContent>
        </Box>
        <Box>
          <div>문의 게시판</div>
          <ReplyTitle>게시물제목</ReplyTitle>
          <ReplyTime>시간</ReplyTime>
          <ReplyContent>댓글</ReplyContent>
        </Box>
        <Box>
          <div>리뷰 게시판</div>
          <ReplyTitle>게시물제목</ReplyTitle>
          <ReplyTime>시간</ReplyTime>
          <ReplyContent>댓글</ReplyContent>
        </Box>

        <PaginationWrapper>
          <PageButton onClick={handleSwitch}>{"<"}</PageButton>
          {[1, 2, 3, 4, 5].map((num) => (
            <PageButton key={num}>{num}</PageButton>
          ))}
        </PaginationWrapper>
      </Container>
    </>
  );
};
export default Reply;
