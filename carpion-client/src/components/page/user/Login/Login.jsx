import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Icon_Google from "/src/assets/Icon_Google.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
    const inputFields = [
        {
            id: "username",
            label: "아이디",
            type: "text",
            placeholder: "아이디를 입력해 주세요.",
        },
        {
            id: "password",
            label: "비밀번호",
            type: "password",
            placeholder: "비밀번호를 입력해 주세요.",
        },
    ];

    const validationRules = {
        username: {
            regExp: /^[a-z][a-z0-9]{6,18}[0-9]$/,
            errorMessage: "잘못된 아이디 입니다.",
        },
        password: {
            regExp: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).\S{8,30}$/,
            errorMessage: "잘못된 비밀번호 입니다.",
        },
    };

    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
        keep: false,
    });

    const [isEmptyMessage, setIsEmptyMessage] = useState({
        username: "",
        password: "",
    });

    const [fieldMessages, setFieldMessages] = useState({
        username: "",
        password: "",
    });

    const [isValid, setIsValid] = useState({
        username: null,
        password: null,
    });

    const [keep, isKeep] = useState(false);

    const [exceptionMessage, setExceptionMessage] = useState(null);

    const { login } = useContext(AuthContext);

    const navi = useNavigate();

    const keepBtnRef = useRef(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputValues({ ...inputValues, [id]: value });
        setIsEmptyMessage({ ...isEmptyMessage, [id]: "" });

        const field = inputFields.find((f) => f.id === id);
        const validation = validationRules[field.id];

        if (!validation) return;

        if (!value) {
            setIsValid({ ...isValid, [id]: null });
            setFieldMessages({ ...fieldMessages, [id]: "" });
            return;
        }

        if (!validation.regExp.test(value)) {
            setIsValid({ ...isValid, [id]: false });
            setFieldMessages({ ...fieldMessages, [id]: validation.errorMessage });
        } else {
            setIsValid({ ...isValid, [id]: true });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let focusedElement = null;

        inputFields.forEach((field) => {
            const key = field.id;

            if (!inputValues[key]) {
                let particle = "를";

                const labelMap = {
                    username: "아이디",
                    password: "비밀번호",
                };

                setIsEmptyMessage((prev) => ({
                    ...prev,
                    [key]: `${labelMap[key]}${particle} 입력해주세요.`,
                }));

                if (!focusedElement) {
                    focusedElement = document.getElementById(key);
                }
                isValid = false;
            }

            if (inputValues[key] && !validationRules[field.id].regExp.test(inputValues[key])) {
                setFieldMessages((prev) => ({
                    ...prev,
                    [key]: validationRules[field.id].errorMessage,
                }));

                if (!focusedElement) {
                    focusedElement = document.getElementById(key);
                }
                isValid = false;
            }
        });

        if (focusedElement) {
            focusedElement.focus();
        }

        return isValid;
    };

    const handleKeep = () => {
        if (keep === false) {
            keepBtnRef.current.classList.add("bg-maincolor");
            isKeep(true);
            setInputValues({ ...inputValues, keep: true });
        } else {
            keepBtnRef.current.classList.remove("bg-maincolor");
            isKeep(false);
            setInputValues({ ...inputValues, keep: false });
        }
    };

    const handleLoginGoogle = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=430311231437-p5htp79gao25qmgsqrt26t8q2hkjjuue.apps.googleusercontent.com&scope=openid email profile&response_type=code&redirect_uri=http://localhost:5173/login-redirect`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        axios
            .post(`http://localhost:80/auth/login`, inputValues)
            .then((result) => {
                const { username, nickname, realname, email, accessToken, refreshToken } = result.data;
                login(username, nickname, realname, email, accessToken, refreshToken);
                navi("/");
            })
            .catch((error) => {
                setExceptionMessage(error.response.data.cause);
            });
    };

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-maincolor">로그인</section>
                    <section className="w-full h-auto">
                        <ul className="flex flex-col gap-6">
                            {inputFields.map((field) => (
                                <li key={field.id} className="flex flex-col">
                                    <label htmlFor={field.id} className="ml-1 font-maintheme text-2xl text-maincolor">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={inputValues[field.id]}
                                        onChange={handleChange}
                                        className="p-2 mt-1 border-2 border-gray-300 rounded-md font-Pretendard text-lg"
                                    />
                                    {isEmptyMessage[field.id] && <p className="mt-1 ml-1 text-red-500 font-Pretendard text-lg">{isEmptyMessage[field.id]}</p>}
                                    {fieldMessages[field.id] && <p className={`mt-1 ml-1 font-Pretendard text-lg text-red-500`}>{isValid[field.id] ? "" : fieldMessages[field.id]}</p>}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="w-full mt-6 flex">
                        <button id="keep" ref={keepBtnRef} onClick={handleKeep} className="size-7 mr-2 text-gray-300 border-2 border-gray-300 rounded-full">
                            ✓
                        </button>
                        <label htmlFor="keep" className="font-maintheme text-xl text-gray-500">
                            로그인 상태 유지
                        </label>
                    </section>
                    {exceptionMessage && (
                        <section className="mt-8 flex justify-center">
                            <p className="font-Pretendard text-lg text-red-500">{exceptionMessage}</p>
                        </section>
                    )}
                    <section className="w-full h-auto flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="w-56 h-24 mt-12 mb-8 border-2 border-maincolor rounded-full font-maintheme text-maincolor text-3xl hover:bg-maincolor hover:text-white cursor-pointer"
                        >
                            로그인
                        </button>
                    </section>
                    <section className="flex flex-col">
                        <div className="flex justify-center gap-8">
                            <div
                                onClick={() => navi("/find-id")}
                                className="font-maintheme text-lg text-maincolor tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer"
                            >
                                아이디 찾기
                            </div>
                            <div
                                onClick={() => navi("/find-pw")}
                                className="font-maintheme text-lg text-maincolor tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer"
                            >
                                비밀번호 찾기
                            </div>
                        </div>
                        <div className="mt-12 mb-4 flex justify-center font-maintheme text-xl text-gray-500 tracking-wider">처음이신가요?</div>
                        <div className="mb-24 flex items-center gap-4">
                            <div
                                onClick={() => navi("/sign-up")}
                                className="font-maintheme text-2xl text-maincolor tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer"
                            >
                                회원가입
                            </div>
                            <div className="font-maintheme text-lg text-gray-500 tracking-wider">또는</div>
                            <div className="flex items-center gap-2">
                                <button onClick={handleLoginGoogle} type="button" className="size-12 border-2 border-gray-300 rounded-md cursor-pointer">
                                    <img src={Icon_Google} alt="Icon_Google" />
                                </button>
                                <div className="font-maintheme text-lg text-gray-500 tracking-wider">로 시작하기</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Login;
