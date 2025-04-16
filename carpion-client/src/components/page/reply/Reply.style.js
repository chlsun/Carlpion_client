import styled from "styled-components";
export const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin-top: 126px;
`;

export const Box = styled.div`
  width: 100%;
  padding: 25px;
  margin: 20px auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;

  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  text-align: center; /
  
`;

export const ReplyTitle = styled.div`
  width: 100%;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ReplyTime = styled.div`
  width: 100%;
  font-size: 14px;
  color: gray;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 15px;
`;

export const ReplyContent = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
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
