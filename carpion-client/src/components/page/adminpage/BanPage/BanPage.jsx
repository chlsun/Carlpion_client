import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const BanPage = () => {
    const { auth, isAdmin } = useContext(AuthContext);

    const [sortingType, setSortingType] = useState("desc");

    const [searchType, setSearchType] = useState("id");

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        axios.post(`http://localhost:80/`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        });
    });

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 flex justify-center select-none">
                <div className="w-7xl my-48 px-8 py-6 bg-white border-2 border-maincolor rounded-4xl flex flex-col gap-4">
                    <section className="flex justify-between">
                        <div className="font-maintheme text-2xl text-maincolor">회원 목록</div>
                        <div className="flex items-center gap-2">
                            <div className="font-maintheme text-xl">정렬 기준</div>
                            <select
                                value={sortingType}
                                onChange={(e) => setSortingType(e.target.value)}
                                className="px-2 py-1 bg-white border-2 border-maincolor rounded-md font-maintheme text-md text-maincolor focus:border-maincolor cursor-pointer select-none"
                            >
                                <option value="desc">최신순</option>
                                <option value="asc">등록순</option>
                            </select>
                        </div>
                    </section>
                    <section className="w-full">
                        <table className="table-fixed w-full border-separate border-spacing-4 bg-gray-100 rounded-2xl">
                            <thead className="font-Pretendard text-lg border">
                                <tr>
                                    <th>아이디</th>
                                    <th>닉네임</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>가입일</th>
                                    <th>계정 활성화 여부</th>
                                    <th>활성화 / 비활성화</th>
                                </tr>
                            </thead>
                            <tbody className="font-Pretendard text-gray-800 select-text">
                                <tr className="text-center">
                                    <td>user1234</td>
                                    <td>유저킴</td>
                                    <td>김유저</td>
                                    <td>user1234@carlpion.com</td>
                                    <td>2025-05-08</td>
                                    <td className="text-green-500 select-none">Y</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="px-2 py-1 bg-white border-2 border-maincolor rounded-md font-maintheme text-md text-maincolor active:bg-maincolor active:text-white cursor-pointer select-none"
                                        >
                                            전환
                                        </button>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <td>user1234</td>
                                    <td>유저킴</td>
                                    <td>김유저</td>
                                    <td>user1234@carlpion.com</td>
                                    <td>2025-05-08</td>
                                    <td className="text-red-500 select-none">N</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="px-2 py-1 bg-white border-2 border-maincolor rounded-md font-maintheme text-md text-maincolor active:bg-maincolor active:text-white cursor-pointer select-none"
                                        >
                                            전환
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section className="flex justify-between text-center">
                        <div className="flex gap-1">
                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                className="px-2 py-1 bg-white border-2 border-maincolor rounded-md font-maintheme text-lg text-maincolor focus:border-maincolor cursor-pointer select-none"
                            >
                                <option value="id">아이디</option>
                                <option value="nickname">닉네임</option>
                                <option value="realname">이름</option>
                                <option value="email">이메일</option>
                            </select>
                            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="px-2 py-1 border-2 border-gray-300 rounded-md font-Pretendard text-lg" />
                            <button type="button" className="px-2 py-1 border-2 border-maincolor rounded-md font-maintheme text-lg text-maincolor active:bg-maincolor active:text-white cursor-pointer">
                                찾기
                            </button>
                        </div>
                        <div className="flex justify-center gap-1">
                            <div className="px-2 py-1 border-2 border-maincolor rounded-md font-maintheme text-lg text-maincolor active:bg-maincolor active:text-white cursor-pointer">이전</div>
                            <div className="w-10 py-1 border-2 border-maincolor rounded-md font-maintheme text-lg text-maincolor cursor-pointer">1</div>
                            <div className="w-10 py-1 border-2 border-maincolor rounded-md font-maintheme text-lg text-maincolor cursor-pointer">10</div>
                            <div className="px-2 py-1 border-2 border-maincolor rounded-md font-maintheme text-lg text-maincolor active:bg-maincolor active:text-white cursor-pointer">다음</div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default BanPage;
