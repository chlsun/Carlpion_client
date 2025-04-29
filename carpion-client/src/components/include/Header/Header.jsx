import { useCallback, useContext, useEffect, useState } from "react";
import Carlpion_Logo from "/src/assets/carlpion_logo.png";
import Carlpion_Logo_TextOnly from "/src/assets/carlpion_logo_textonly.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../page/Context/AuthContext";
import { AuthSocialContext } from "../../page/Context/AuthSocialContext";

const Header = () => {
    const navi = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(0);

    const { auth, logout } = useContext(AuthContext);
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

    return (
        <header
            className={`w-full z-50 flex justify-center bg-white shadow-sm border-b-2 border-maincolor fixed top-0 left-0 right-0 select-none transition-all duration-300 ${
                isScrolled ? "h-12" : "h-24"
            }`}
        >
            <div className="w-7xl h-full flex justify-center">
                <section className="w-2/6 h-full">
                    <div onClick={() => navi("/")} className="h-full flex justify-start items-center cursor-pointer">
                        <img
                            className={`cursor-pointer transition-all duration-300 ${isScrolled ? "w-1/2 ml-8" : "w-full"}`}
                            src={isScrolled ? Carlpion_Logo_TextOnly : Carlpion_Logo}
                            alt="Carlpion_Logo"
                        />
                    </div>
                </section>
                <section className="w-3/6 h-full flex justify-end items-center">
                    <ul className="w-144 h-full flex justify-evenly items-center">
                        <li onMouseEnter={() => setOpenMenu(1)} onMouseLeave={() => setOpenMenu(0)} className="h-full flex items-center">
                            <label
                                htmlFor=""
                                className={`h-full flex items-center font-maintheme text-maincolor cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3 transition-all duration-300 ${
                                    isScrolled ? "text-xl" : "text-3xl"
                                }`}
                            >
                                메뉴1
                            </label>
                            {openMenu === 1 && (
                                <div className={`w-full flex justify-center bg-white border-b-2 border-maincolor shadow-sm absolute top-full left-0`}>
                                    <ul className="w-7xl py-2 flex justify-center flex-wrap">
                                        <li className="w-full p-2 font-maintheme text-lg text-maincolor hover:bg-gray-100">서브메뉴1 메인</li>
                                        <li className="w-full p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100">서브메뉴1 서브1</li>
                                        <li className="w-full p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100">서브메뉴1 서브2</li>
                                        <li className="w-full p-2 font-maintheme text-md text-gray-500 hover:bg-gray-100">서브메뉴1 서브3</li>
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
                            className={`flex items-center font-maintheme text-maincolor border-2 cursor-pointer hover:bg-maincolor hover:text-white transition-all duration-300 ${
                                isScrolled ? "px-1 text-lg rounded-lg" : "px-2 py-1 text-2xl rounded-xl"
                            }`}
                        >
                            시작하기
                        </div>
                    ) : (
                        <>
                            <div
                                onClick={() => navi("/mypage")}
                                className={`flex items-center font-maintheme text-maincolor border-2 cursor-pointer hover:bg-maincolor hover:text-white transition-all duration-300 ${
                                    isScrolled ? "px-1 text-lg rounded-lg" : "px-2 py-1 text-xl rounded-xl"
                                }`}
                            >
                                {sessionStorage.getItem("nickname")}
                            </div>
                            <div
                                onClick={auth.isAuthenticated ? logout : socialLogout}
                                className={`flex items-center font-maintheme text-maincolor border-2 cursor-pointer hover:bg-maincolor hover:text-white transition-all duration-300 ${
                                    isScrolled ? "px-1 text-lg rounded-lg" : "px-2 py-1 text-xl rounded-xl"
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
