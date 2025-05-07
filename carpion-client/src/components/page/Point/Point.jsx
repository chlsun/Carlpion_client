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
import { useMemo } from "react";
import axios from "axios";

const Point = () => {
  const navi = useNavigate();
  const [pointList, setPointList] = useState([]);
  const { auth } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(7);

  const pointListWithTotal = useMemo(() => {
    return pointList.reduce((acc, item) => {
      const prevTotal = acc.length > 0 ? acc[acc.length - 1].totalPoint : 0;
      const currentChange = Number(item.pointChange || 0);
      acc.push({
        ...item,
        totalPoint: prevTotal + currentChange,
      });
      return acc;
    }, []);
  }, [pointList]);

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
          const { pointList, totalCount } = response.data;
          setPointList(pointList);
          setTotalPages(Math.ceil(totalCount / limit));

          console.log("포인트 : ", response.data);
        })
        .catch((error) => {
          console.log("포인트 실패 : ", error);
        });
    }
  }, [auth.accessToken, currentPage, limit]);

  return (
    <>
      <TableContainer>
        <h3>포인트정보</h3>
        <Table>
          <thead>
            <tr>
              <Th>이력번호</Th>
              <Th>게시물 번호</Th>
              <Th>등급</Th>
              <Th>변동내역</Th>
              <Th>변동사유</Th>
              <Th>포인트</Th>
              <Th>일시</Th>
            </tr>
          </thead>
          <tbody>
            {pointListWithTotal.map((item) => (
              <tr key={item.historyNo}>
                <Td>{item.historyNo}</Td>
                <Td>{item.reviewNo}</Td>
                <Td>{item.userLevel}</Td>
                <Td>{item.pointChange}</Td>
                <Td>{item.reason}</Td>
                <Td>{item.totalPoint}</Td>
                <Td>{item.createDate}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationWrapper>
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <PageButton
                key={num}
                onClick={() => {
                  if (currentPage !== num) setCurrentPage(num);
                }}
                style={{ fontWeight: currentPage === num ? "bold" : "normal" }}
              >
                {num}
              </PageButton>
            ))}
        </PaginationWrapper>
      </TableContainer>
    </>
  );
};
export default Point;
