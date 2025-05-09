import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Header,
  ModalBox,
  ModalContainer,
  ModalDeleteBox,
  CheckBox,
  Area,
  FixedDeleteButton,
  DeleteWrapper,
  GradeText,
  DeleteBox,
  DeleteText,
} from "./MainMypage.style";
import { LeftBox, RightBox, Font, Input } from "./MainMypage.style";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useTheme } from "styled-components";

const MainMyPage = () => {
  const { auth, updateUser, logout } = useContext(AuthContext);
  const [activeForm, setActiveForm] = useState(null);
  const [modifyName, setModifyName] = useState("");
  const [modifyFile, setModifyFile] = useState("");

  const [modifyEmail, setModifyEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [modifyPw, setModifyPw] = useState("");
  const [modifyCheckPw, setmodifyCheckPw] = useState("");
  const [checked, setChecked] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [realName, setRealName] = useState("");

  const navi = useNavigate();

  const handleName = (e) => {
    const inputName = e.target.value;
    setModifyName(inputName);
  };

  const handelEmail = (e) => {
    const inputEmail = e.target.value;
    setModifyEmail(inputEmail);
  };

  const submitName = (e) => {
    e.preventDefault();
    const regexName = /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/;
    if (modifyName && !regexName.test(modifyName)) {
      alert("한글 이름 2~5자, 영어 이름 2~30자 입력해주세요.");
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (modifyEmail && !regexEmail.test(modifyEmail)) {
      alert("영어 이메일 형식만 가능합니다.");
      return;
    }

    setModifyName(modifyName);
    setActiveForm(null);
  };

  const handleModifyPw = (e) => {
    const inputPw = e.target.value;
    setModifyPw(inputPw);
  };
  const handleModifyCheckPw = (e) => {
    const inputCheckPw = e.target.value;
    setmodifyCheckPw(inputCheckPw);
  };
  const handelPassword = (e) => {
    const inputPassword = e.target.value;
    setPasswordCheck(inputPassword);
  };

  const handleCheckBox = (e) => {
    const checkBox = e.target.checked;
    setChecked(checkBox);
  };

  /*  const submitCheckPw = (e) => {
    e.preventDefault();
    if (!passwordCheck) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    setActiveForm(null);
  }; */

  useEffect(() => {
    if (auth.realname) {
      setRealName(auth.realname);
      setUserName(auth.username);
    }
  }, [auth.realname]);

  useEffect(() => {
    // console.log("isUpdate:", isUpdate);
    //console.log("accessToken:", auth.accessToken);
    if (isUpdate && auth.accessToken) {
      //console.log(" 요청 보냅니다");
      axios
        .get("http://localhost/users/getUserInfo", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((result) => {
          //console.log("getUserInfo 응답 :", result.data);
          updateUser(result.data.realName, result.data.email);
          setIsUpdate(false);
        });
    }
  }, [isUpdate, auth.accessToken]);

  /*   updateUser({
    realname: result.data.realName,
    email: result.data.email,
  }); */

  useEffect(() => {
    if (auth.email) {
      setEmail(auth.email);
    }
  }, [auth.email]);
  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    }
  }, [email]);

  const handleModify = () => {
    if (auth.accessToken) {
      axios
        .put(
          "http://localhost/users/update-realname",
          {
            realName: modifyName || auth.realname,
            email: modifyEmail || auth.email,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          alert("변경에 성공하셨습니다.");
          setIsUpdate(true);
        })
        .catch((error) => {
          console.log("이름 변경 실패 : ", error);
        });
    }
  };
  const submitModfyPw = (e) => {
    e.preventDefault();

    const regexModifyPw =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,30}$/;
    if (!regexModifyPw.test(modifyPw)) {
      alert("8 ~ 30자, 영어 알파벳과 숫자, 특수문자가 포함되어야 합니다.");
      return;
    }
    if (modifyPw !== modifyCheckPw) {
      alert("변경할 비밀번호가 서로 다릅니다.");
      return;
    }
    if (!passwordCheck) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    if (auth.accessToken) {
      axios
        .put(
          "http://localhost/users/update-pw",
          {
            password: passwordCheck,
            modifyPw: modifyPw,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("비밀번호 변경 성공: ", response.data);
          alert("비밀번호가 변경되었습니다.");
          setModifyPw("");
          setPasswordCheck("");
          setActiveForm(null);
        })
        .catch((error) => {
          console.log("비밀번호 변경 실패 :", error);
          if (error.response && error.response.data) {
            alert(`변경실패 : ${error.response.data}`);
          } else {
            alert("알 수 없는 오류가 발생했습니다.");
          }
        });
    }
  };
  const submitCheckPw = (e) => {
    e.preventDefault();
    if (!passwordCheck) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    if (auth.accessToken) {
      axios
        .delete("http://localhost/users", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          data: {
            password: passwordCheck,
          },
        })
        .then((response) => {
          console.log("탈퇴 성공", response.data);
          alert("탈퇴에 성공하셨습니다.");
          logout();
        })
        .catch((error) => {
          console.log("탈퇴에러", error);
          if (error.response && error.response.data) {
            alert(`변경실패 : ${error.response.data}`);
          } else {
            console.log("탈퇴에러", error);
          }
        });
    }
  };

  return (
    <>
      <Container>
        <Header>내정보 수정</Header>
        <Box>
          <LeftBox>내정보</LeftBox>
          <RightBox>
            <div>
              <Font>이름 : {realName} </Font>
              <Font>아이디 : {userName} </Font>
              <Font>이메일 : {email}</Font>
              <div>
                <Button onClick={() => setActiveForm("info")}>
                  내정보 변경하기
                </Button>
              </div>
            </div>
          </RightBox>
        </Box>
        {activeForm === "info" && (
          <ModalContainer>
            <ModalBox>
              <form onSubmit={submitName}>
                <GradeText>변경하기</GradeText>
                <div>
                  <Input
                    type="text"
                    value={modifyName}
                    onChange={handleName}
                    placeholder="변경 할 이름 입력"
                  />
                  <Input
                    type="email"
                    value={modifyEmail}
                    onChange={handelEmail}
                    placeholder="변경 할 이메일 입력"
                  />
                </div>
                <div>
                  <Button onClick={handleModify} type="submit">
                    변경
                  </Button>
                  <Button onClick={() => setActiveForm(null)}>취소</Button>
                </div>
              </form>
            </ModalBox>
          </ModalContainer>
        )}

        <hr></hr>

        <Box>
          <LeftBox>비밀번호</LeftBox>
          <RightBox>
            <div>
              <p>문서 보안을 위해 비밀번호를 주기적으로 변경해주세요</p>
            </div>
            <div>
              <Button onClick={() => setActiveForm("password")}>
                비밀번호 변경
              </Button>
            </div>
          </RightBox>
        </Box>
        {activeForm === "password" && (
          <ModalContainer>
            <ModalBox>
              <form onSubmit={submitModfyPw}>
                <GradeText>변경하기</GradeText>
                <div>
                  <Input
                    type="password"
                    onChange={handleModifyPw}
                    placeholder="변경할 비밀번호"
                    value={modifyPw}
                  />
                  <Input
                    type="password"
                    onChange={handleModifyCheckPw}
                    placeholder="변경할 비밀번호 확인"
                    value={modifyCheckPw}
                  />
                  <Input
                    type="password"
                    onChange={handelPassword}
                    placeholder="비밀번호 확인"
                    value={passwordCheck}
                  />
                </div>
                <div>
                  <Button type="submit">비밀번호 변경</Button>

                  <Button type="button" onClick={() => setActiveForm(null)}>
                    취소
                  </Button>
                </div>
              </form>
            </ModalBox>
          </ModalContainer>
        )}

        <DeleteWrapper>
          <FixedDeleteButton onClick={() => setActiveForm("delete")}>
            회원탈퇴
          </FixedDeleteButton>
        </DeleteWrapper>
        {activeForm === "delete" && (
          <ModalContainer>
            <ModalDeleteBox>
              <Header>회원탈퇴</Header>
              <div>서비스 탈퇴전 주의사항을 확인해주세요</div>
              <DeleteBox>
                <DeleteText> 탈퇴할 계정 : {userName}</DeleteText>
              </DeleteBox>
              <hr />
              <div>
                <DeleteBox>
                  <DeleteText>계정 파기</DeleteText>

                  <p>탈퇴 시 개인정보와 데이터가 보존될 수 없습니다.</p>
                  <p>
                    탈퇴 시 개인정보오 템플릿, 문서등 모든 데이터가 삭제됩니다
                    삭제된 데이터는 복구되지 않으니 필요한 데이터는 미리 백업해
                    주세요.
                  </p>
                </DeleteBox>
              </div>
              <DeleteBox>
                <DeleteText>탈퇴 후 재 가입</DeleteText>
                <p>
                  탈퇴 시 계정파기가 완료되면, 해당 계정의 이메일 주소로 새로
                  가입할 수 있습니다.
                </p>
                <p>단, 기존 정보는 파기되어 복구할 수 없습니다.</p>
              </DeleteBox>

              <CheckBox>
                <input
                  onChange={handleCheckBox}
                  checked={checked}
                  type="checkbox"
                />
                <div>탈퇴 주의 사항을 모두 확인했으며, 이에 동의 합니다.</div>
              </CheckBox>

              <div>
                <Button onClick={() => setActiveForm("null")}>취소</Button>
                <Button
                  onClick={() => {
                    if (!checked) {
                      alert("동의에 체크해주세요.");
                      return;
                    }
                    setActiveForm("next");
                  }}
                >
                  다음으로
                </Button>
              </div>
            </ModalDeleteBox>
          </ModalContainer>
        )}
        {activeForm === "next" && (
          <ModalContainer>
            <ModalDeleteBox>
              <form onSubmit={submitCheckPw}>
                <Header>회원탈퇴</Header>
                <div>
                  안전한 탈퇴 진행을 위해 비밀번호를 한번더 입력해 주세요.
                </div>
                <DeleteBox>
                  <DeleteText>탈퇴 할 계정 : {userName}</DeleteText>
                </DeleteBox>
                <div>
                  <DeleteText>비밀번호 재 확인 </DeleteText>
                  <Input
                    type="password"
                    onChange={handelPassword}
                    placeholder="비밀번호 입력"
                  />
                </div>
                <Button onClick={() => setActiveForm("delete")}>
                  이전으로
                </Button>
                <Button type="sumbit">탈퇴하기</Button>
              </form>
            </ModalDeleteBox>
          </ModalContainer>
        )}
      </Container>
    </>
  );
};

export default MainMyPage;
