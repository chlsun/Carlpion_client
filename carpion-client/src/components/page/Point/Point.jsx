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
import "./point.css";

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
    <div id="point-table">
      <TableContainer>
        <div className="header">포인트정보</div>
        <Table>
          <thead className="thead">
            <tr className="th">
              <th className="th-num">이력번호</th>
              <th className="th-change-point">변동내역</th>
              <th className="th-reason">변동사유</th>
              <th className="th-date">일시</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {pointListWithTotal.map((item, index) => (
              <tr key={item.historyNo} className="td">
                <td className="td-num">{index + 1}</td>
                <td className="td-change-point">{item.pointChange}</td>
                <td className="td-reason">{item.reason}</td>
                <td className="td-date">{item.createDate}</td>
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
                style={{
                  fontWeight: currentPage === num ? "bold" : "normal",
                }}
              >
                {num}
              </PageButton>
            ))}
        </PaginationWrapper>
      </TableContainer>
    </div>
  );
};
export default Point;
