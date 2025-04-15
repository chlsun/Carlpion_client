import styled from "styled-components";

export const FullBanner = styled.div`
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  padding-top: 150px;
  position: relative;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
  }
`;

export const BannerText = styled.div`
  position: absolute;
  bottom: 32px;
  left: 40px;
  color: white;
  font-size: 36px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 24px 24px;
  background-color: #fff;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;
export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 24px;
`;

export const TitleIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
  margin-bottom: 24px;
`;
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.li`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ItemDate = styled.span`
  font-size: 14px;
  color: #888;
`;

export const ToggleIcon = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #666;
  width: 20px;
  display: inline-block;
`;

export const ItemContent = styled.div`
  margin-top: 12px;
  font-size: 15px;
  color: #444;
  line-height: 1.5;
`;
export const WriteButton = styled.button`
  margin-left: auto;
  padding: 6px 14px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0062cc;
  }
`;
