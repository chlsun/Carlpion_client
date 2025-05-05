import { useContext, useEffect, useState } from "react";
import {
  Table,
  Th,
  TableContainer,
  Td,
  MoreButton,
  PaginationWrapper,
  PageButton,
} from "../Point/Point.styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Point = () => {
  const navi = useNavigate();
  const [username, setUserName] = useState("");
  const [nickname, setNickName] = useState("");
  const [realname, setRealName] = useState("");
  const [point, setPoint] = useState([]);
  const { auth } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(3);

  useEffect(() => {
    if (auth.username) {
      setUserName(auth.username);
      setNickName(auth.nickname);
      setRealName(auth.realname);
    }
  }, [auth.username, auth.nickname, auth.realname]);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/points", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
        })
        .then((response) => {
          setPoint(response.data);
          setTotalPages(response.data);

          console.log("포인트 : ", response.data);
        })
        .catch((error) => {
          console.log("포인트 실패 : ", error);
        });
    }
  }, [currentPage, limit]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <TableContainer>
        <h3>포인트정보</h3>
        <Table>
          <thead>
            <tr>
              <Th>이력번호</Th>
              <Th>게시물 번호</Th>
              <Th>이름</Th>
              <Th>아이디</Th>
              <Th>닉네임</Th>
              <Th>등급</Th>
              <Th>변동내역</Th>
              <Th>변동사유</Th>
              <Th>포인트</Th>
              <Th>일시</Th>
            </tr>
          </thead>
          <tbody>
            {point.map((item) => (
              <tr key={item.historyNo}>
                <Td>{item.historyNo}</Td>
                <Td>{item.reviewNo}</Td>
                <Td>{realname}</Td>
                <Td>{username}</Td>
                <Td>{nickname}</Td>
                <Td>{item.userLevel}</Td>
                <Td>{item.pointChange}</Td>
                <Td>{item.reason}</Td>
                <Td>{item.point}</Td>
                <Td>{item.createDate}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationWrapper>
          <PageButton>{"<"}</PageButton>
          {[1, 2, 3, 4, 5].map((num) => (
            <PageButton key={num}>{num}</PageButton>
          ))}
        </PaginationWrapper>
      </TableContainer>
    </>
  );
};
export default Point;
