const FindPwCompleted = () => {
    return (
        <>
            <div className="size-full bg-gray-100 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <section className="mt-24 mb-16 font-maintheme text-5xl text-maincolor">비밀번호 찾기 완료</section>
                    <section className="mb-16 flex flex-col items-center gap-4">
                        <div className="font-maintheme text-2xl text-gray-500 tracking-wider">임시 비밀번호가</div>
                        <div className="font-Pretendard text-2xl">abcd1234@abcd.com</div>
                        <div className="font-maintheme text-2xl text-gray-500 tracking-wider">로 전송 되었습니다.</div>
                    </section>
                    <section className="mb-24 flex flex-col items-center">
                        <div className="font-maintheme text-3xl text-maincolor tracking-wider hover:underline hover:decoration-2 hover:underline-offset-3 cursor-pointer">로그인 하러 가기</div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default FindPwCompleted;
