import styled from "styled-components";
export const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

export const ReviewBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

export const Field = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const InquiryTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const InquiryDate = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
`;

export const InquiryContent = styled.div`
  font-size: 1rem;
  color: #333;
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
