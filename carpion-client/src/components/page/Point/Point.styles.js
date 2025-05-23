import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  padding: 150px 0 100px;
  align-items: center;
  flex-direction: column;
`;

export const Table = styled.table`
  width: 1000px;
`;

export const Th = styled.th`
  border: 1px solid #ccc;
  text-align: center;
  padding: 30px;
`;

export const Td = styled.td`
  border: 1px solid #ccc;
  text-align: center;
  padding: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const MoreButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;
export const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #aaa;
  background: white;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #f0f0f0;
  }

  &.active {
    background: #007bff;
    color: white;
  }
`;
