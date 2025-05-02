import { useNavigate } from "react-router-dom";

const SignUpCompleted = () => {
    const navi = useNavigate();

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white dark:bg-gray-800 border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-maincolor">회원가입 완료</section>
                    <section className="mb-16 flex flex-col items-center gap-4">
                        <div className="font-maintheme text-2xl text-gray-500 tracking-wider">회원가입에</div>
                        <div className="font-maintheme text-2xl text-gray-500 tracking-wider">성공 했습니다.</div>
                    </section>
                    <section className="mb-24 flex flex-col items-center">
                        <div
                            onClick={() => navi("/start")}
                            className="font-maintheme text-3xl text-maincolor tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer"
                        >
                            로그인 하러 가기
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default SignUpCompleted;
