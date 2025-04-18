import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const inputFields = [
        {
            id: "username",
            label: "아이디",
            type: "text",
            placeholder: "사용할 아이디를 입력해 주세요.",
        },
        {
            id: "password",
            label: "비밀번호",
            type: "password",
            placeholder: "사용할 비밀번호를 입력해 주세요.",
        },
        {
            id: "nickname",
            label: "닉네임",
            type: "text",
            placeholder: "사용할 닉네임을 입력해 주세요.",
        },
        {
            id: "realname",
            label: "이름",
            type: "text",
            placeholder: "이름을 입력해 주세요.",
        },
        {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "이메일을 입력해 주세요.",
        },
    ];

    const validationRules = {
        username: {
            regExp: /^[a-z][a-z0-9]{6,18}[0-9]$/,
            successMessage: "사용 가능한 아이디 입니다.",
            errorMessage: "사용 불가능한 아이디 입니다.",
            helpMessage: "8 ~ 20자, 영어 소문자로 시작해서 숫자로 끝나야 합니다.",
        },
        password: {
            regExp: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,30}$/,
            successMessage: "사용 가능한 비밀번호 입니다.",
            errorMessage: "사용 불가능한 비밀번호 입니다.",
            helpMessage: "8 ~ 30자, 영어 알파벳과 숫자, 특수문자가 포함되어야 합니다.",
        },
        nickname: {
            regExp: /^[\uAC00-\uD7A3a-zA-Z0-9]{2,10}$/,
            successMessage: "사용 가능한 닉네임 입니다.",
            errorMessage: "사용 불가능한 닉네임 입니다.",
            helpMessage: "2 ~ 10자, 한글과 영어 알파벳, 숫자로 이루어져야 합니다.",
        },
        realname: {
            regExp: /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/,
            successMessage: "사용 가능한 이름 입니다.",
            errorMessage: "잘못된 이름 형식 입니다.",
        },
        email: {
            regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            successMessage: "사용 가능한 이메일 입니다.",
            errorMessage: "잘못된 이메일 형식 입니다.",
            helpMessage: "이메일 형식을 확인해 주세요. (예: example@email.com)",
        },
    };

    const navi = useNavigate();

    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
        nickname: "",
        realname: "",
        email: "",
    });

    const [isEmptyMessage, setIsEmptyMessage] = useState({
        username: "",
        password: "",
        nickname: "",
        realname: "",
        email: "",
    });

    const [fieldMessages, setFieldMessages] = useState({
        username: "",
        password: "",
        nickname: "",
        realname: "",
        email: "",
    });

    const [helpMessages, setHelpMessages] = useState({
        username: "",
        password: "",
        nickname: "",
        realname: "",
        email: "",
    });

    const [isValid, setIsValid] = useState({
        username: null,
        password: null,
        nickname: null,
        realname: null,
        email: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputValues({ ...inputValues, [id]: value });
        setIsEmptyMessage({ ...isEmptyMessage, [id]: "" });

        const field = inputFields.find((f) => f.id === id);
        const validation = validationRules[field.id];

        if (!validation) return;

        if (!value) {
            setHelpMessages({ ...helpMessages, [id]: "" });
            setIsValid({ ...isValid, [id]: null });
            setFieldMessages({ ...fieldMessages, [id]: "" });
            return;
        }

        if (!validation.regExp.test(value)) {
            setHelpMessages({ ...helpMessages, [id]: validation.helpMessage || "" });
            setIsValid({ ...isValid, [id]: false });
            setFieldMessages({ ...fieldMessages, [id]: validation.errorMessage });
        } else {
            setHelpMessages({ ...helpMessages, [id]: "" });
            setIsValid({ ...isValid, [id]: true });
            setFieldMessages({ ...fieldMessages, [id]: validation.successMessage });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let focusedElement = null;

        inputFields.forEach((field) => {
            const key = field.id;

            if (!inputValues[key]) {
                let particle = "을";

                if (key === "username" || key === "password") {
                    particle = "를";
                }

                const labelMap = {
                    username: "아이디",
                    password: "비밀번호",
                    nickname: "닉네임",
                    realname: "이름",
                    email: "이메일",
                };

                setIsEmptyMessage((prev) => ({
                    ...prev,
                    [key]: `${labelMap[key]}${particle} 입력해 주세요.`,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        axios
            .post(`http://localhost:80/users`, inputValues)
            .then(() => {
                navi("/sign-up-done");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-maincolor">회원가입</section>
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
                                    {field.id === "email" ? (
                                        <div className="w-full mt-2 flex justify-between">
                                            <button className="px-2 py-1 border-2 border-maincolor rounded-md font-maintheme text-md text-maincolor tracking-wider cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-3 active:bg-maincolor active:text-white">
                                                이메일 인증
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="메일로 발송된 인증번호를 입력하세요."
                                                className="w-68 px-2 py-1 border-2 border-gray-300 rounded-md font-Pretendard text-md"
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {isEmptyMessage[field.id] && <p className="mt-1 ml-1 text-red-500 font-Pretendard text-lg">{isEmptyMessage[field.id]}</p>}
                                    {fieldMessages[field.id] && (
                                        <p className={`mt-1 ml-1 font-Pretendard text-lg ${isValid[field.id] ? "text-green-500" : "text-red-500"}`}>{fieldMessages[field.id]}</p>
                                    )}
                                    {helpMessages[field.id] && <p className="ml-1 text-red-500 font-Pretendard text-md">{helpMessages[field.id]}</p>}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="w-full h-auto flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="w-56 h-24 mt-16 mb-24 border-2 border-maincolor rounded-full font-maintheme text-maincolor text-3xl hover:bg-maincolor hover:text-white cursor-pointer"
                        >
                            회원가입
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default SignUp;
