import Carlpion_Logo_TextOnly from "/src/assets/carlpion_logo_textonly.png";
import Light_Mode_Icon from "/src/assets/lightmode.png";
import Dark_Mode_Icon from "/src/assets/darkmode.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navi = useNavigate();

    const [theme, setTheme] = useState(null);

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setTheme(localStorage.getItem("theme"));
    }, []);

    useEffect(() => {
        if (theme) {
            if (theme === "dark") {
                document.querySelector("#root").classList.add("dark");
                localStorage.setItem("theme", "dark");
                setIsDarkMode(true);
            } else {
                localStorage.setItem("theme", "light");
                setIsDarkMode(false);
            }
        }
    }, [theme]);

    const handleDarkMode = () => {
        if (isDarkMode) {
            document.querySelector("#root").classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.querySelector("#root").classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return (
        <>
            <footer className="w-full h-16 z-50 bg-white dark:bg-gray-800 border-t-2 border-maincolor flex justify-center select-none">
                <div className="w-7xl h-full flex">
                    <section className="w-1/6 h-full">
                        <div onClick={() => navi("/")} className="h-full flex justify-center items-center cursor-pointer">
                            <img src={Carlpion_Logo_TextOnly} alt="Carlpion_logo" className="w-5/6" />
                        </div>
                    </section>
                    <section className="w-4/6 pl-8 h-full flex items-center gap-8">
                        <div className="font-maintheme text-gray-500 text-lg tracking-widest cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3">개인 정보 보호</div>
                        <div className="font-maintheme text-gray-500 text-lg tracking-widest cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3">약관</div>
                        <div className="font-maintheme text-gray-500 text-lg tracking-widest cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3">서비스 소개</div>
                        <div className="font-maintheme text-gray-500 text-lg tracking-widest cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3">고객 지원</div>
                    </section>
                    <section className="w-1/6 h-full flex justify-end items-center">
                        <button onClick={handleDarkMode} type="button" className="size-12 border-2 border-gray-400 rounded-full cursor-pointer">
                            {isDarkMode ? <img src={Dark_Mode_Icon} alt="Mode_Icon" /> : <img src={Light_Mode_Icon} alt="Mode_Icon" />}
                        </button>
                    </section>
                </div>
            </footer>
        </>
    );
};

export default Footer;
