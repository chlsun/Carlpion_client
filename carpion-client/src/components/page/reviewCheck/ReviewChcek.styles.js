import styled from "styled-components";
export const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

export const InquiryBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: left;
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
