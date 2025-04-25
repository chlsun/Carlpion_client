import styled from "styled-components";
import { useState } from "react";
import {
  Table,
  Th,
  TableContainer,
  Td,
  MoreButton,
  ButtonWrapper,
} from "../Point/Point.styles";
import { useNavigate } from "react-router-dom";

const Point = () => {
  const navi = useNavigate();

  return (
    <>
      <TableContainer>
        <h3>포인트정보</h3>
        <Table>
          <thead>
            <tr>
              <Th>회원번호</Th>
              <Th>게시글번호</Th>
              <Th>아이디</Th>
              <Th>이름</Th>
              <Th>등급</Th>
              <Th>변동사유</Th>
              <Th>변동내역</Th>
              <Th>포인트</Th>
              <Th>일시</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>1</Td>
              <Td>34</Td>
              <Td>ABC1234</Td>
              <Td>짱구</Td>
              <Td>등급</Td>
              <Td>게시글 작성</Td>
              <Td>욕설</Td>
              <Td>200</Td>
              <Td>2025.04.14</Td>
            </tr>
          </tbody>
        </Table>
        <ButtonWrapper>
          <MoreButton onClick={() => navi("/mypage")}>뒤로가기</MoreButton>
          <MoreButton>더보기</MoreButton>
        </ButtonWrapper>
      </TableContainer>
    </>
  );
};
export default Point;
