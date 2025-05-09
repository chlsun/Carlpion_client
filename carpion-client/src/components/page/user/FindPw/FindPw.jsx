import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FindPw = () => {
    const inputFields = [
        {
            id: "username",
            label: "아이디",
            type: "text",
            placeholder: "가입한 아이디를 입력해 주세요.",
        },
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
        username: {
            regExp: /^[a-z][a-z0-9]{6,18}[0-9]$/,
            errorMessage: "잘못된 아이디 입니다.",
        },
        realname: {
            regExp: /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/,
            errorMessage: "잘못된 이름 형식 입니다.",
        },
        email: {
            regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            errorMessage: "잘못된 이메일 형식 입니다.",
        },
    };

    const navi = useNavigate();

    const [inputValues, setInputValues] = useState({
        username: "",
        realname: "",
        email: "",
    });

    const [isEmptyMessage, setIsEmptyMessage] = useState({
        username: "",
        realname: "",
        email: "",
    });

    const [fieldMessages, setFieldMessages] = useState({
        username: "",
        realname: "",
        email: "",
    });

    const [isValid, setIsValid] = useState({
        username: null,
        realname: null,
        email: null,
    });

    const [exceptionMessage, setExceptionMessage] = useState(null);

    const [isSendVerifyEmail, setIsSendVerifyEmail] = useState(false);

    const [sendVerifyEmailMessage, setSendVerifyEmailMessage] = useState(null);

    const [showVerifyCodeInput, setShowVerifyCodeInput] = useState(false);

    const [verifyCode, setVerifyCode] = useState(null);

    const [isProgress, setIsProgress] = useState(false);

    const [isProgressSendEmail, setIsProgressSendEmail] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const findIdUsername = location.state.username;
            const findIdRealname = location.state.realname;
            const findIdEmail = location.state.email;

            setInputValues({
                username: findIdUsername,
                realname: findIdRealname,
                email: findIdEmail,
            });

            setIsValid({
                username: true,
                realname: true,
                email: true,
            });
        }
    }, []);

    const handleChange = (e) => {
        setSendVerifyEmailMessage("");

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
            setFieldMessages({
                ...fieldMessages,
                [id]: validation.successMessage,
            });
        }
    };

    const handleCodeChange = (e) => {
        setVerifyCode(e.target.value);
    };

    const validateForm = () => {
        let isValid = true;
        let focusedElement = null;

        inputFields.forEach((field) => {
            const key = field.id;

            if (!inputValues[key]) {
                let particle = "을";

                if (key === "username") {
                    particle = "를";
                }

                const labelMap = {
                    username: "아이디",
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

    const handleSendVerifyEmail = () => {
        if (isProgressSendEmail) return;
        if (!isValid.email) {
            document.getElementById("email").focus();
            return;
        }

        setShowVerifyCodeInput(true);
        setIsProgressSendEmail(true);
        axios
            .post(`http://localhost:80/auth/send-email`, { email: inputValues.email, type: "비밀번호 찾기" })
            .then(() => {
                setIsSendVerifyEmail(true);
                setIsProgressSendEmail(false);
                setSendVerifyEmailMessage("인증 메일이 전송 되었습니다.");
            })
            .catch((error) => {
                setIsSendVerifyEmail(false);
                setIsProgressSendEmail(false);
                setSendVerifyEmailMessage(error.response.data.cause);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isProgress) return;
        if (!validateForm()) return;
        setIsProgress(true);
        axios
            .post(`http://localhost:80/auth/find-pw`, { ...inputValues, code: verifyCode })
            .then(() => {
                navi("/find-pw-done", { state: { email: inputValues.email } });
            })
            .catch((error) => {
                error.response.data.code && setExceptionMessage(error.response.data.code);
                error.response.data.cause && setExceptionMessage(error.response.data.cause);
                setIsProgress(false);
            });
    };

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white dark:bg-gray-800 border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-maincolor">비밀번호 찾기</section>
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
                                        <>
                                            <div className="w-full mt-2 flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={handleSendVerifyEmail}
                                                    className={`px-2 py-1 border-2 border-maincolor rounded-md font-maintheme text-md text-maincolor tracking-wider ${
                                                        isProgressSendEmail
                                                            ? "opacity-50 cursor-progress"
                                                            : "hover:underline hover:decoration-2 hover:underline-offset-3 active:bg-maincolor active:text-white cursor-pointer"
                                                    }`}
                                                >
                                                    이메일 인증
                                                </button>
                                                {showVerifyCodeInput ? (
                                                    <input
                                                        id="code"
                                                        type="text"
                                                        onChange={handleCodeChange}
                                                        placeholder="메일로 발송된 인증번호를 입력하세요."
                                                        className="w-68 px-2 py-1 border-2 border-gray-300 rounded-md font-Pretendard text-md"
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            {sendVerifyEmailMessage && (
                                                <p className={`mt-1 ml-1 font-Pretendard text-lg ${isSendVerifyEmail ? "text-green-500" : "text-red-500"}`}>{sendVerifyEmailMessage}</p>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {isEmptyMessage[field.id] && <p className="mt-1 ml-1 text-red-500 font-Pretendard text-lg">{isEmptyMessage[field.id]}</p>}
                                    {fieldMessages[field.id] && <p className={`mt-1 ml-1 font-Pretendard text-lg text-red-500`}>{isValid[field.id] ? "" : fieldMessages[field.id]}</p>}
                                </li>
                            ))}
                        </ul>
                    </section>
                    {exceptionMessage && (
                        <section className="mt-12 flex justify-center">
                            <p className="font-Pretendard text-lg text-red-500">{exceptionMessage}</p>
                        </section>
                    )}
                    <section className="w-full h-auto flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className={`w-56 h-24 mt-12 mb-8 border-2 border-maincolor rounded-full font-maintheme text-maincolor text-3xl ${
                                isProgress ? "opacity-50 cursor-progress" : "hover:bg-maincolor hover:text-white cursor-pointer"
                            }`}
                        >
                            비밀번호 찾기
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default FindPw;
