import { useState } from "react";
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

const MainMyPage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [modifyName, setModifyName] = useState("");
  const [modifyEmail, setModifyEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [modifyPw, setModifyPw] = useState("");
  const [modifyCheckPw, setmodifyCheckPw] = useState("");
  const [tempName, setTempName] = useState("");
  const [checked, setChecked] = useState(false);
  const navi = useNavigate();

  const handleName = (e) => {
    const inputName = e.target.value;
    setTempName(inputName);
  };

  const handelEmail = (e) => {
    const inputEmail = e.target.value;
    setModifyEmail(inputEmail);
  };

  const handelPassword = (e) => {
    const inputPassword = e.target.value;
    setPasswordCheck(inputPassword);
  };

  const submitName = (e) => {
    e.preventDefault();
    const regexName = /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/;
    if (!regexName.test(tempName)) {
      alert("한글 이름 2~5자, 영어 이름 2~30자 입력해주세요.");
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(modifyEmail)) {
      alert("영어 이메일 형식만 가능합니다.");
      return;
    }
    if (!passwordCheck) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    //console.log("이름 : ", modifyName);
    //console.log("이메일 : ", modifyEmail);
    //console.log("비밀번호 : ", passwordCheck);
    setModifyName(tempName);
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
    //console.log(" 변경 비밀번호 : ", modifyPw);
    //console.log("변경 비밀번호 확인 : ", modifyCheckPw);
    //console.log("비밀번호 확인 : ", passwordCheck);
  };
  const handleCheckBox = (e) => {
    const checkBox = e.target.checked;
    setChecked(checkBox);
  };

  const submitCheckPw = (e) => {
    e.preventDefault();
    if (!passwordCheck) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    //console.log("확인 : ", passwordCheck);
    setActiveForm(null);
  };

  return (
    <>
      <Container>
        <Header>내정보 수정</Header>
        <Box>
          <LeftBox>내정보</LeftBox>
          <RightBox>
            <div>
              <Font>이름 : {modifyName}</Font>
              <Font>아이디 :</Font>
              <Font>연락처 : </Font>
              <Font>이메일 : {modifyEmail}</Font>
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
                    value={tempName}
                    onChange={handleName}
                    placeholder="변경 할 이름 입력"
                  />
                  <Input
                    type="email"
                    value={modifyEmail}
                    onChange={handelEmail}
                    placeholder="변경 할 이메일 입력"
                  />
                  <Input
                    type="password"
                    value={passwordCheck}
                    onChange={handelPassword}
                    placeholder="비밀번호 확인"
                  />
                </div>
                <div>
                  <Button type="submit">변경</Button>
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
                    placeholder="변경할 비밀번호 "
                  />
                  <Input
                    type="password"
                    onChange={handleModifyCheckPw}
                    placeholder="변경할 비밀번호 확인"
                  />
                  <Input
                    type="password"
                    onChange={handelPassword}
                    placeholder="비밀번호 확인"
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
                <DeleteText> 탈퇴할 계정</DeleteText>
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
              <DeleteBox>
                <div>
                  탈퇴사유
                  <Area placeholder="내용을 입력해주세요."></Area>
                </div>
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
                  <DeleteText>탈퇴 할 계정</DeleteText>
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
