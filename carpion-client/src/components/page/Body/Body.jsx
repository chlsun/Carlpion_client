import { useState } from "react";
import {
  Container,
  Box,
  Button,
  ModalContainer,
  ModalBox,
  Input,
  ButtonWrapper,
  FirstBox,
  ThirdBox,
  ProfileTextBox,
  InfoSection,
  GradeText,
  InfoButton,
  ReservationMoreButton,
  ReservationValue,
  ReservationLabel,
  ReservationRow,
  ReservationTitle,
  ReservationBox,
  ReservationContainer,
} from "./Body.styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Body = () => {
  const [activeForm, setActiveForm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempImage, setTempImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [tempNick, setTempNick] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("profileImage", selectedImage);
    }
    if (nickName) {
      localStorage.setItem("nickName", nickName);
    }
  }, [nickName, selectedImage]);

  useEffect(() => {
    setSelectedImage("/img/mypage/profile.logo.png");
  }, []);
  useEffect(() => {
    if (activeForm === "profile") {
      setTempImage(null);
    }
  }, [activeForm]);
  const handleReport = () => {
    console.log("문의게시판 수정 클릭됨");
  };
  const handleReview = () => {
    console.log("리뷰게시판 수정 클릭됨");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage("/img/mypage/profile.logo.png");
    }
  };

  const submitProfile = (e) => {
    e.preventDefault();
    setActiveForm(null);
  };

  const handelNameEdit = (e) => {
    const inputValue = e.target.value;
    setTempNick(inputValue);
  };
  const submitNickname = (e) => {
    e.preventDefault();

    const regex = /^[\uAC00-\uD7A3a-zA-Z0-9]{2,10}$/;
    if (!regex.test(tempNick)) {
      alert(" 2 ~ 10자, 한글과 영어 알파벳, 숫자로 이루어져야 합니다");
      return;
    }
    setNickName(tempNick);
    setActiveForm(null);
  };
  const handleProfileSubmit = () => {
    if (tempImage) {
      setSelectedImage(tempImage);
    }
    setTempImage(null);
    setActiveForm(null);
  };
  const handleCancel = () => {
    setActiveForm(null);
  };

  /*   axios
    .put("http:/localhost:80/users/update-nickname", {
      userNo: 1,
      currentNickname: "가나다",
      newCurrentNickname: "가나다라",
    })
    .then((response) => {
      console.log("성공: ", response.data);
      alert("닉네임 변경 성공!");
    })
    .catch((err) => {
      console.error("실패", err);
      alert("에러발생");
    });

  axios.put("http://localhost:80/users/update-pw", {
    userNo: 1,
    currentPassword: 1234,
    newPassword: 1234,
  });
  .then(()=>{})

  axios.put("http:/localhost:80/users/update-email", {
    userNo: 1,
    email: "kh@123.com",
    newEmail: "kh@12345.com",
  });

  const formData = new FormData();
  formData.append("file", selectedImage);
  formData.append("userNo", 1); */

  return (
    <Container>
      <div>
        <GradeText>XXX님 안녕하세요</GradeText>
      </div>

      <Box>
        <FirstBox>
          <img
            src={selectedImage}
            style={{ width: "250px", height: "250px", borderRadius: "10px" }}
          />
          <ProfileTextBox>
            <div>닉네임 : {nickName}</div>
            <Button
              onClick={() => {
                setActiveForm("nickName");
              }}
            >
              닉네임 수정
            </Button>
            <Button
              onClick={() => {
                setActiveForm("profile");
              }}
            >
              프로필수정
            </Button>
          </ProfileTextBox>
        </FirstBox>

        <InfoSection>
          <GradeText>XXX 님 등급은 브론즈입니다</GradeText>
        </InfoSection>

        {activeForm === "nickName" && (
          <ModalContainer>
            <ModalBox>
              <form onSubmit={submitNickname}>
                <GradeText>변경할 닉네임을 입력해주세요</GradeText>
                <Input
                  onChange={handelNameEdit}
                  placeholder="변경할 닉네임을 입력해주세요"
                  value={tempNick}
                />

                <ButtonWrapper>
                  <Button type="submit">확인</Button>
                  <Button onClick={() => setActiveForm(null)}>취소</Button>
                </ButtonWrapper>
              </form>
            </ModalBox>
          </ModalContainer>
        )}

        {activeForm === "profile" && (
          <ModalContainer>
            <ModalBox>
              <form onSubmit={submitProfile}>
                <GradeText>첨부파일</GradeText>
                <Input type="file" onChange={handleFileChange} />
                {selectedImage && (
                  <div>
                    <img src={tempImage || selectedImage} alt="나오나" />
                  </div>
                )}
                <ButtonWrapper>
                  <Button type="button" onClick={handleProfileSubmit}>
                    수정하기
                  </Button>
                  <Button type="button" onClick={handleCancel}>
                    취소
                  </Button>
                </ButtonWrapper>
              </form>
            </ModalBox>
          </ModalContainer>
        )}

        <ThirdBox>
          <InfoButton onClick={() => navi("/modify")}>내정보</InfoButton>
        </ThirdBox>
        <ThirdBox>
          <InfoButton onClick={() => navi("/point")}>포인트</InfoButton>
        </ThirdBox>
      </Box>
      <GradeText>예약 현황</GradeText>

      <ReservationContainer>
        <ReservationBox>
          <ReservationTitle>예약 현황</ReservationTitle>

          <ReservationRow>
            <ReservationLabel>예약 ID</ReservationLabel>
            <ReservationValue>RV123456</ReservationValue>
          </ReservationRow>
          <ReservationRow>
            <ReservationLabel>차량번호 / 모델</ReservationLabel>
            <ReservationValue>23허1234 / K5</ReservationValue>
          </ReservationRow>
          <ReservationRow>
            <ReservationLabel>대여일 ~ 반납일</ReservationLabel>
            <ReservationValue>2025-04-01 ~ 2025-04-03</ReservationValue>
          </ReservationRow>
          <ReservationRow>
            <ReservationLabel>결제금액</ReservationLabel>
            <ReservationValue>150,000원</ReservationValue>
          </ReservationRow>
          <ReservationRow>
            <ReservationLabel>결제완료</ReservationLabel>
            <ReservationValue>2025-04-01 13:00</ReservationValue>
          </ReservationRow>
          <ReservationRow>
            <ReservationLabel>주차장</ReservationLabel>
            <ReservationValue>강남주차장 (서울 강남구)</ReservationValue>
          </ReservationRow>

          <ReservationMoreButton>더보기</ReservationMoreButton>
        </ReservationBox>
      </ReservationContainer>
      <GradeText>사용 내역</GradeText>

      <ReservationBox>
        <ReservationTitle>사용 내역</ReservationTitle>

        <ReservationRow>
          <ReservationLabel>차량번호 / 모델</ReservationLabel>
          <ReservationValue>23허4567 / K3</ReservationValue>
        </ReservationRow>

        <ReservationRow>
          <ReservationLabel>대여일 ~ 반납일</ReservationLabel>
          <ReservationValue>2025-03-20 ~ 2025-03-22</ReservationValue>
        </ReservationRow>

        <ReservationRow>
          <ReservationLabel>결제금액</ReservationLabel>
          <ReservationValue>80,000원</ReservationValue>
        </ReservationRow>

        <ReservationRow>
          <ReservationLabel>결제완료시각</ReservationLabel>
          <ReservationValue>2025-03-20 11:23</ReservationValue>
        </ReservationRow>

        <ReservationRow>
          <ReservationLabel>주차장</ReservationLabel>
          <ReservationValue>PI044 / 부산역주차장 / 부산 동구</ReservationValue>
        </ReservationRow>

        <ReservationMoreButton>더보기</ReservationMoreButton>
      </ReservationBox>
      <GradeText>내 활동</GradeText>
      <Box>
        <Button onClick={() => navi("/reply")}>작성한 댓글 조회</Button>
        <Button onClick={() => navi("/inquiryCheck")}>
          작성한 문의 게시글 조회
        </Button>
        <Button onClick={() => navi("/reviewCheck")}>
          {" "}
          작성한 리뷰 게시글 조회
        </Button>
      </Box>
    </Container>
  );
};

export default Body;
