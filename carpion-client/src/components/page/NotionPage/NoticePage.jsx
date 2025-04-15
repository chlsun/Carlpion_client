import React, { useState } from "react";
import * as S from "./NoticePage.styles";
import CustomerBanner from "/img/notice/안내.jpg";

const notices = [
  {
    id: 1,
    title: "📌 서버 점검 안내",
    date: "2025-04-10",
    content: "4월 12일 오전 2시부터 4시까지 서버 점검이 있습니다.",
  },
  {
    id: 2,
    title: "🎉 신규 기능 업데이트",
    date: "2025-04-09",
    content: "공지사항에 아코디언 UI가 추가되었습니다!",
  },
];

const NoticePage = () => {
  const [openId, setOpenId] = useState(null);
  const isAdmin = true; // or false
  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <S.FullBanner>
        <img src="/img/notice/안내.jpg" alt="고객센터 배너" />
        <S.BannerText>고객센터</S.BannerText>
      </S.FullBanner>

      <S.Container>
        <S.TitleRow>
          <S.TitleIcon src="/img/notice/사이렌.png" alt="공지 아이콘" />
          <S.Title>공지사항</S.Title>
          {isAdmin && <S.WriteButton>작성</S.WriteButton>}
        </S.TitleRow>

        <S.List>
          {notices.map((notice) => (
            <S.Item key={notice.id} onClick={() => toggleItem(notice.id)}>
              <S.ItemHeader>
                <S.ItemTitle>{notice.title}</S.ItemTitle>
                <S.RightBox>
                  <S.ItemDate>{notice.date}</S.ItemDate>
                  <S.ToggleIcon>
                    {openId === notice.id ? "−" : "+"}
                  </S.ToggleIcon>
                </S.RightBox>
              </S.ItemHeader>
              {openId === notice.id && (
                <S.ItemContent>{notice.content}</S.ItemContent>
              )}
            </S.Item>
          ))}
        </S.List>
      </S.Container>
    </>
  );
};

export default NoticePage;
