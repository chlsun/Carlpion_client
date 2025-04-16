import styled from "styled-components";

export const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
`;

export const Box = styled.div`
  display: flex;
   width: 100%;
  border: 1px solid #ddd;
  padding: 50px;
  border-radius: 12px;
  margin: 20px;

`;
export const LeftBox = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 40px;
`;
export const RightBox = styled.div`
  flex: 3;
  padding: 10px;
`;
export const DeleteWrapper = styled.div`
   display: flex;
  justify-content: flex-end; 
  padding: 20px;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  max-height: 80vh;
  overflow-y: auto;
  width: 400px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`;
export const ModalDeleteBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  width: 600px;
  max-height: 100vh;
  overflow-y: auto;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`;

export const Font = styled.div`
  padding: 20px;
  font-size: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 12px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
export const Area = styled.textarea`
  width: 100%; 
  padding: 20px;
  margin: 12px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
export const DeleteInput = styled.input`
  width: 100%;
  height: 100px;
  padding: 50px;
  margin: 12px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 6px;
  cursor: pointer;
  background: #f9f9f9;

  &:hover {
    background: #eee;
  }
`;
export const CheckBox = styled.div`
  display: flex;
  padding: 10px;
`;
export const FixedDeleteButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 999;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);

  &:hover {
    background-color: #e60000;
  }
`;
export const GradeText = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin :20px;
`;