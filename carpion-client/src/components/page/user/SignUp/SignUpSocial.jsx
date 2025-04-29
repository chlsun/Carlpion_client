import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpSocial = () => {
    const inputFields = [
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
    ];

    const validationRules = {
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
    };

    const navi = useNavigate();

    const [inputValues, setInputValues] = useState({
        nickname: "",
        realname: "",
    });

    const [isEmptyMessage, setIsEmptyMessage] = useState({
        nickname: "",
        realname: "",
    });

    const [fieldMessages, setFieldMessages] = useState({
        nickname: "",
        realname: "",
    });

    const [helpMessages, setHelpMessages] = useState({
        nickname: "",
        realname: "",
    });

    const [isValid, setIsValid] = useState({
        nickname: null,
        realname: null,
    });

    const [exceptionMessage, setExceptionMessage] = useState(null);

    const [googleLoginInfo, setGoogleLoginInfo] = useState(null);

    const [code, setCode] = useState(null);

    const [isProgress, setIsProgress] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setGoogleLoginInfo({ socialId: location.state.socialId, platform: location.state.platform, email: location.state.email });
            setCode(location.state.code);
        }
    }, []);

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

                const labelMap = {
                    nickname: "닉네임",
                    realname: "이름",
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
        if (isProgress) return;
        if (!validateForm()) return;
        setIsProgress(true);
        axios
            .post(`http://localhost:80/auth/sign-up-social`, { ...googleLoginInfo, ...inputValues })
            .then((result) => {
                if (result.status == 201) {
                    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=430311231437-p5htp79gao25qmgsqrt26t8q2hkjjuue.apps.googleusercontent.com&scope=openid email profile&response_type=code&redirect_uri=http://localhost:5173/login-redirect&login_hint=${googleLoginInfo.email}`;
                }
            })
            .catch((error) => {
                error.response.data.code && setExceptionMessage(error.response.data.code);
                error.response.data.cause && setExceptionMessage(error.response.data.cause);
                setIsProgress(false);
            });
    };

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-4xl text-maincolor">소셜 회원 추가정보 입력</section>
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
                                    {fieldMessages[field.id] && (
                                        <p className={`mt-1 ml-1 font-Pretendard text-lg ${isValid[field.id] ? "text-green-500" : "text-red-500"}`}>{fieldMessages[field.id]}</p>
                                    )}
                                    {helpMessages[field.id] && <p className="ml-1 text-red-500 font-Pretendard text-md">{helpMessages[field.id]}</p>}
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
                            회원가입
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default SignUpSocial;
