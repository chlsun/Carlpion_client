import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  padding: 40px;
  align-items: center;
  flex-direction: column;
`;

export const Table = styled.table`
  witdh: 100%px;
  margin: 20px;
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
