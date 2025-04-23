import {
  Container,
  ReviewBox,
  Field,
  PageButton,
  PaginationWrapper,
} from "./ReviewChcek.styles";
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewCheck = () => {
  const handleSwitch = () => {};
  return (
    <>
      <Container>
        <h2
          style={{ textAlign: "center", marginTop: "80px", fontWeight: "bold" }}
        >
          리뷰 게시글 조회
        </h2>

        <ReviewBox>
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
        </ReviewBox>
        <ReviewBox>
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
        </ReviewBox>
        <ReviewBox>
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
        </ReviewBox>
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
