import { useContext, useState } from "react";
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
import { data, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import MainMyPage from "../MyPage/MainMyPage";
import ReservationComponent from "./module/ReservationComponent";
import RentHistoryComponent from "./module/RentHistoryComponent";

const Body = () => {
  const { auth, updateNickName } = useContext(AuthContext);
  const [activeForm, setActiveForm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [tempImage, setTempImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [modifyNickName, setModifyNickName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const navi = useNavigate();

  /*  useEffect(() => {
    setSelectedImage("/img/mypage/profile.logo.png");
  }, []); */
  useEffect(() => {
    if (activeForm === "profile") {
      setTempImage(null);
    }
  }, [activeForm]);

  const submitProfile = (e) => {
    e.preventDefault();
    setActiveForm(null);
  };

  const handelNameEdit = (e) => {
    const inputValue = e.target.value;
    setModifyNickName(inputValue);
  };
  const submitNickname = (e) => {
    e.preventDefault();

    const regex = /^[\uAC00-\uD7A3a-zA-Z0-9]{2,10}$/;
    if (!regex.test(modifyNickName)) {
      alert(" 2 ~ 10자, 한글과 영어 알파벳, 숫자로 이루어져야 합니다");
      return;
    }
    setNickName(modifyNickName);
    setActiveForm(null);
  };
  /*  const handleProfileSubmit = () => {
    if (tempImage) {
      setSelectedImage(tempImage);
    }
    setTempImage(null);
    setActiveForm(null);
  }; */
  const handleCancel = () => {
    setActiveForm(null);
  };

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get("http://localhost/mypage/use", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          //console.log("DB에서 받아온 예약 내역 ", response.data);
          setReservations(response.data);
        })
        .catch((error) => {
          console.error("예약조회 실패 : ", error);
        });
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (isUpdate && auth.accessToken) {
      console.log(" 닉네임요청 보냅니다");
      axios
        .get("http://localhost/mypage/selectNickname", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((result) => {
          console.log("selectNickname 응답 :", result.data);
          updateNickName(result.data.nickName);
        });
      setIsUpdate(false);
    }
  }, [isUpdate, auth.accessToken]);

  useEffect(() => {
    if (auth.nickname) {
      setNickName(auth.nickname);
    }
  }, [auth.nickname]);

  const handleNickname = () => {
    if (auth.accessToken) {
      axios
        .put(
          "http://localhost/users/update-nickname",
          {
            nickName: modifyNickName,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("받아온 데이터:", response.data);
          setIsUpdate(true);
        })
        .catch((error) => {
          console.error("닉네임 변경 실패 : ", error);
        });
    }
  };

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get("http://localhost/users/getUserInfo", {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          const url = res.data.fileUrl;
          setSelectedImage(url || "/img/mypage/profile.logo.png");
        })
        .catch(() => {
          setSelectedImage("/img/mypage/profile.logo.png");
        });
    }
  }, [auth.accessToken]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleProfileSubmit = () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    console.log("토큰 확인:", auth.accessToken);
    if (auth.accessToken) {
      axios
        .put("http://localhost/users/update-profile", formData, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log("사진업데이트", response.data.fileUrl);
          console.log("사진업데이트", response.data);
          const newUrl = response.data.fileUrl;
          setSelectedImage(newUrl);
          localStorage.setItem("profileImg", newUrl);
          setActiveForm(null);
        })
        .catch((error) => {
          console.log("업로드 에러", error);
        });
    }
  };

  return (
    <Container>
      <div>
        <GradeText>{auth.realname}님 안녕하세요</GradeText>
      </div>

      <Box>
        <FirstBox>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="프로필 이미지"
              style={{ width: "250px", height: "250px", borderRadius: "10px" }}
            />
          ) : (
            <img
              src="/img/mypage/profile.logo.png"
              alt="기본 이미지"
              style={{ width: "250px", height: "250px", borderRadius: "10px" }}
            />
          )}
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
          <GradeText>{auth.realname}님 등급은 브론즈 입니다.</GradeText>
        </InfoSection>

        {activeForm === "nickName" && (
          <ModalContainer>
            <ModalBox>
              <form onSubmit={submitNickname}>
                <GradeText>변경할 닉네임을 입력해주세요</GradeText>
                <Input
                  onChange={handelNameEdit}
                  placeholder="변경할 닉네임을 입력해주세요"
                  value={modifyNickName}
                />

                <ButtonWrapper>
                  <Button onClick={handleNickname} type="submit">
                    확인
                  </Button>
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
                    <img src={selectedImage} alt="프로필 이미지" />
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
      <GradeText>예약 정보</GradeText>

      <ReservationComponent />

      <GradeText>이용 내역</GradeText>

      <RentHistoryComponent rentHistory={reservations} />

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
