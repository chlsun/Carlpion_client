import styled from "styled-components";

const BoardContainer = styled.div`
  max-width: 1500px; /* 고정된 너비 */
  margin: 0 auto;
  padding: 24px;
  padding-top: 100px;
  overflow-x: hidden; /* 화면 크기 줄어들 때 가로 스크롤 숨기기 */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 24px;
`;

const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? "#3498db" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#2980b9" : "#f0f0f0")};
  }
`;

const GridContainer = styled.div`
  width: 1300px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const GridCard = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const GridImage = styled.img`
  width: 300px; /* 고정된 이미지 크기 */
  height: 250px; /* 고정된 이미지 크기 */
  object-fit: cover;
  border-radius: 0.75rem;
`;

const GridTitle = styled.div`
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostTable = styled.table`
  width: 1400px; /* 고정된 너비 사용 */
  border-collapse: collapse;
  border: 1px solid #ccc;
  table-layout: fixed; /* 고정된 테이블 레이아웃 */
  margin-top: 16px;
`;

const PostRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const PostCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:nth-child(1) {
    width: 5%;
    font-size: 12px;
  }
  &:nth-child(2) {
    width: 70%;
    text-align: left;
  }
  &:nth-child(3) {
    width: 8%;
  }
  &:nth-child(4) {
    width: 7%;
  }
  &:nth-child(5) {
    width: 5%;
    font-size: 12px;
  }
  &:nth-child(6) {
    width: 5%;
    font-size: 12px;
  }
`;
const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 32px;
`;
const ThumbnailWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const ThumbnailImg = styled.img`
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.75rem;
`;

const TextInfo = styled.div`
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .thumbnail-meta {
    display: flex;
    gap: 10px;
    font-size: 0.9rem;
    color: #777;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 24px 0;

  button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    cursor: pointer;

    &.active {
      background-color: #3498db;
      color: white;
    }

    &:disabled {
      background-color: #f0f0f0;
      cursor: not-allowed;
    }
  }
`;
const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
`;
const WriteButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;
const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;
const SelectBox = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SearchInput = styled.input`
  flex: 0 1 300px;
  max-width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
`;
export const yul = {
  BoardContainer,
  ButtonGroup,
  ViewButton,
  GridContainer,
  GridCard,
  GridImage,
  GridTitle,
  PostTable,
  PostRow,
  PostCell,
  PaginationWrapper,
  ActionWrapper,
  WriteButton,
  SearchWrapper,
  SelectBox,
  SearchInput,
  SearchButton,
  ThumbnailContainer,
  ThumbnailWrapper,
  ThumbnailImg,
  TextInfo,
};
