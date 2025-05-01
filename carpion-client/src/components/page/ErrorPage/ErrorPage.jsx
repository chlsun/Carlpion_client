import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navi = useNavigate();

    const location = useLocation();

    const [errorCode, setErrorCode] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (location.state) {
            setErrorCode(location.state.errorCode);
            setErrorMessage(location.state.errorMessage);
        }
    }, []);

    return (
        <>
            <div className="w-full min-h-screen h-auto bg-gray-100 dark:bg-gray-900 flex flex-col items-center select-none">
                <div className="w-xl px-24 my-48 bg-white dark:bg-gray-800 border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-red-500">※ 페이지 오류 ※</section>
                    <section className="mb-16 flex flex-col items-center gap-6">
                        <div className="font-maintheme text-3xl text-red-500">Error Code : {errorCode}</div>
                        <div className="font-maintheme text-xl text-red-500 text-center">{errorMessage}</div>
                    </section>
                    <section className="mb-24 flex flex-col items-center">
                        <div onClick={() => navi("/")} className="font-maintheme text-3xl text-gray-500 tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer">
                            메인 페이지로 돌아가기
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
