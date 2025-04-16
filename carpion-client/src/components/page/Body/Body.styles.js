import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
`;

export const Box = styled.div`
  display: flex;
  border: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 12px;
  margin: 40px;
  min-width: 1000px;
  max-width: 1000px;
`;

export const NicknameBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;
export const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ThirdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: column;
  text-align: center;
`;

export const FormWrapper = styled.form`
  border: 1px solid #eee;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background: white;
`;

export const Input = styled.input`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
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
  width: 150px;
  &:hover {
    background: #eee;
  }
`;
export const MoreButton = styled.button`
 display: block;
  margin: 20px auto;
  padding: 10px;
  width: 120px;
  cursor: pointer;
  background: #f9f9f9;
  border: 1px solid #aaa;
  text-align: center;
  border-radius:6px;

  &:hover {
    background: #eee;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
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
  width: 400px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`;
export const Section = styled.div`
  display: flex;
  justify-content: space-between; 
  gap: 40px; 
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
`;
export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; 
  margin-top: 20px;
`;

export const GradeText = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin :20px;
`;

export const InfoButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;