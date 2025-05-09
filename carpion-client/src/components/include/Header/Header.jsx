import { useCallback, useContext, useEffect, useState } from "react";
import Carlpion_Logo from "/src/assets/carlpion_logo.png";
import Carlpion_Logo_TextOnly from "/src/assets/carlpion_logo_textonly.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../page/Context/AuthContext";
import { AuthSocialContext } from "../../page/Context/AuthSocialContext";

const Header = () => {
  const navi = useNavigate();

  const [nickname, setNickname] = useState(null);

  const [longNickname, setLongNickname] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const [openMenu, setOpenMenu] = useState(0);

  const { auth, isAdmin, logout } = useContext(AuthContext);

  const { authSocial, socialLogout } = useContext(AuthSocialContext);

  const handleScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 0);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!auth.nickname) {
      setNickname(null);
      setLongNickname(null);
      return;
    }

    if (auth.nickname.length < 6) {
      setNickname(auth.nickname);
      setLongNickname(null);
      return;
    }

    setLongNickname(auth.nickname.substring(0, 4) + "...");
  }, [auth]);

  useEffect(() => {
    if (!authSocial.nickname) {
      setNickname(null);
      setLongNickname(null);
      return;
    }

    if (authSocial.nickname.length < 6) {
      setNickname(authSocial.nickname);
      setLongNickname(null);
      return;
    }

    setLongNickname(authSocial.nickname.substring(0, 4) + "...");
  }, [authSocial]);

  return (
    <header
      className={`w-full z-50 flex justify-center bg-white dark:bg-gray-800 shadow-sm border-b-2 border-maincolor fixed top-0 left-0 right-0 select-none ${
        isScrolled ? "h-12" : "h-24"
      }`}
    >
      <div className="w-7xl h-full flex justify-center">
        <section className="w-2/6 h-full">
          <div
            onClick={() => navi("/")}
            className="h-full flex justify-start items-center cursor-pointer"
          >
            <img
              className={`cursor-pointer ${
                isScrolled ? "w-1/2 ml-8" : "w-full"
              }`}
              src={isScrolled ? Carlpion_Logo_TextOnly : Carlpion_Logo}
              alt="Carlpion_Logo"
            />
          </div>
        </section>
        <section className="w-3/6 h-full flex justify-end items-center">
          <ul className="w-144 h-full flex justify-evenly items-center">
            <li
              onMouseEnter={() => setOpenMenu(1)}
              onMouseLeave={() => setOpenMenu(0)}
              className="h-full flex items-center"
            >
              <label
                htmlFor=""
                className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3 ${
                  isScrolled ? "text-xl" : "text-3xl"
                }`}
              >
                칼피온
              </label>
              {openMenu === 1 && (
                <div
                  className={`w-full flex justify-center bg-white dark:bg-gray-800 border-b-2 border-maincolor shadow-sm absolute top-full left-0`}
                >
                  <ul className="w-7xl py-2 flex justify-center flex-wrap">
                    <li className="w-full mx-8 p-2 font-maintheme text-lg text-maincolor hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      ??
                    </li>
                    <li
                      onClick={() => {
                        navi("/nb");
                      }}
                      className="w-full mx-8 p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                    >
                      공지사항
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li
              onMouseEnter={() => setOpenMenu(2)}
              onMouseLeave={() => setOpenMenu(0)}
              className="h-full flex items-center"
            >
              <label
                onClick={() => {
                  navi("/rent");
                }}
                htmlFor=""
                className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3 ${
                  isScrolled ? "text-xl" : "text-3xl"
                }`}
              >
                서비스
              </label>
              {openMenu === 2 && (
                <div
                  className={`w-full flex justify-center bg-white dark:bg-gray-800 border-b-2 border-maincolor shadow-sm absolute top-full left-0`}
                >
                  <ul className="w-7xl py-2 flex justify-center flex-wrap">
                    <li
                      onClick={() => {
                        navi("/rent");
                      }}
                      className="w-full mx-8 p-2 font-maintheme text-lg text-maincolor hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                    >
                      차량 렌트
                    </li>
                    <li
                      onClick={() => {
                        navi("/station-info");
                      }}
                      className="w-full mx-8 p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                    >
                      충전소 위치 정보
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li
              onMouseEnter={() => setOpenMenu(3)}
              onMouseLeave={() => setOpenMenu(0)}
              className="h-full flex items-center"
            >
              <label
                htmlFor=""
                className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3 ${
                  isScrolled ? "text-xl" : "text-3xl"
                }`}
              >
                커뮤니티
              </label>
              {openMenu === 3 && (
                <div
                  className={`w-full flex justify-center bg-white dark:bg-gray-800 border-b-2 border-maincolor shadow-sm absolute top-full left-0`}
                >
                  <ul className="w-7xl py-2 flex justify-center flex-wrap">
                    <li className="w-full mx-8 p-2 font-maintheme text-lg text-maincolor hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      ??
                    </li>
                    <li className="w-full mx-8 p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      ??
                    </li>
                    <li className="w-full mx-8 p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      ??
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </section>
        <section className="w-1/6 h-full flex justify-end items-center gap-2">
          {!auth.isAuthenticated && !authSocial.isAuthenticated ? (
            <div
              onClick={() => navi("/start")}
              className={`flex items-center font-maintheme text-maincolor border-2 cursor-pointer hover:bg-maincolor hover:text-white dark:hover:text-gray-800 ${
                isScrolled
                  ? "px-1 text-lg rounded-lg"
                  : "px-2 py-1 text-2xl rounded-xl"
              }`}
            >
              시작하기
            </div>
          ) : (
            <>
              <div
                onClick={() => navi(isAdmin ? "/admin" : "/mypage")}
                className={`flex items-center font-maintheme text-maincolor border-2 cursor-pointer hover:bg-maincolor hover:text-white dark:hover:text-gray-800 ${
                  isScrolled
                    ? "px-1 text-lg rounded-lg"
                    : "px-2 py-1 text-xl rounded-xl"
                }`}
              >
                {longNickname ? longNickname : nickname}
              </div>
              <div
                onClick={auth.isAuthenticated ? logout : socialLogout}
                className={`flex items-center font-maintheme text-maincolor border-2 cursor-pointer hover:bg-maincolor hover:text-white dark:hover:text-gray-800 ${
                  isScrolled
                    ? "px-1 text-lg rounded-lg"
                    : "px-2 py-1 text-xl rounded-xl"
                }`}
              >
                로그아웃
              </div>
            </>
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;
