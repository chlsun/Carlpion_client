import styled from "styled-components";
export const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

export const ReplyBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const Field = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const BoardType = styled.h4`
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
`;

export const ReplyTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
`;

export const ReplyContent = styled.p`
  font-size: 16px;
  color: #333;
`;

export const ReplyTime = styled.p`
  font-size: 14px;
  color: #777;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
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
