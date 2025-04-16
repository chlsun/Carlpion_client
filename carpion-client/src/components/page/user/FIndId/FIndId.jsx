import { useState } from "react";
import axios from "axios";

const FindId = () => {
    const inputFields = [
        {
            id: "realname",
            label: "이름",
            type: "text",
            placeholder: "가입 시 입력한 이름을 입력해 주세요.",
        },
        {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "가입 시 입력한 이메일을 입력해 주세요.",
        },
    ];

    const validationRules = {
        realname: {
            regExp: /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/,
            errorMessage: "잘못된 이름 형식 입니다.",
        },
        email: {
            regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            errorMessage: "잘못된 이메일 형식 입니다.",
        },
    };

    const [inputValues, setInputValues] = useState({
        realname: "",
        email: "",
    });

    const [isEmptyMessage, setIsEmptyMessage] = useState({
        realname: "",
        email: "",
    });

    const [fieldMessages, setFieldMessages] = useState({
        realname: "",
        email: "",
    });

    const [isValid, setIsValid] = useState({
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
            setIsValid({ ...isValid, [id]: null });
            setFieldMessages({ ...fieldMessages, [id]: "" });
            return;
        }

        if (!validation.regExp.test(value)) {
            setIsValid({ ...isValid, [id]: false });
            setFieldMessages({ ...fieldMessages, [id]: validation.errorMessage });
        } else {
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

                const labelMap = {
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
            .post(``, inputValues)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("아이디 찾기 완료:", inputValues);
    };

    return (
        <>
            <div className="size-full bg-gray-100 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-maincolor">아이디 찾기</section>
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
                                    {fieldMessages[field.id] && <p className={`mt-1 ml-1 font-Pretendard text-lg text-red-500`}>{isValid[field.id] ? "" : fieldMessages[field.id]}</p>}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="w-full mt-12 flex flex-col justify-center">
                        <div className="ml-1 font-maintheme text-maincolor text-2xl">해당 이메일로 가입된 아이디</div>
                        <div className="w-full pl-1 py-2 mt-1 bg-gray-100 border-2 border-gray-200 rounded-md">
                            <div className="font-Pretendard text-lg select-all">abcd1234</div>
                        </div>
                        <div className="w-fit ml-1 mt-2 font-maintheme text-xl text-maincolor tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer">
                            비밀번호 찾기
                        </div>
                    </section>
                    <section className="w-full h-auto flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="w-56 h-24 mt-16 mb-24 border-2 border-maincolor rounded-full font-maintheme text-maincolor text-3xl hover:bg-maincolor hover:text-white cursor-pointer"
                        >
                            아이디 찾기
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default FindId;
