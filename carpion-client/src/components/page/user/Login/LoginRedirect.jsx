import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthSocialContext } from "../../Context/AuthSocialContext";

const LoginRedirect = () => {
    const navi = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");

    const [googleAccessToken, setGoogleAccecssToken] = useState(null);

    const [googleIdToken, setGoogleIdToken] = useState(null);

    const [googleLoginInfo, setGoogleLoginInfo] = useState(null);

    const { socialLogin } = useContext(AuthSocialContext);

    useEffect(() => {
        if (code) {
            axios
                .post(`https://oauth2.googleapis.com/token`, {
                    code: code,
                    client_id: "430311231437-p5htp79gao25qmgsqrt26t8q2hkjjuue.apps.googleusercontent.com",
                    client_secret: "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",
                    redirect_uri: "http://localhost:5173/login-redirect",
                    grant_type: "authorization_code",
                })
                .then((tokenRes) => {
                    console.log(tokenRes);
                    if (tokenRes.status === 200) {
                        setGoogleAccecssToken(tokenRes.data.access_token);
                        setGoogleIdToken(tokenRes.data.id_token);
                    }
                })
                .catch((tokenError) => {
                    console.log(tokenError);
                    navi("/");
                });
        }
    }, []);

    useEffect(() => {
        if (googleAccessToken) {
            axios
                .get(`https://www.googleapis.com/userinfo/v2/me`, { headers: { Authorization: `Bearer ${googleAccessToken}` } })
                .then((userInfoRes) => {
                    if (userInfoRes.status === 200) {
                        setGoogleLoginInfo({ socialId: userInfoRes.data.id, email: userInfoRes.data.email, platform: "google" });
                    }
                })
                .catch((userInfoError) => {
                    console.log(userInfoError);
                    navi("/");
                });
        }
    }, [googleAccessToken]);

    useEffect(() => {
        if (googleLoginInfo) {
            axios
                .post(`http://localhost:80/auth/login-social`, googleLoginInfo)
                .then((googleLoginRes) => {
                    if (googleLoginRes.status === 200) {
                        const { socialId, platform, nickname, realname, email } = googleLoginRes.data;
                        socialLogin(socialId, platform, nickname, realname, email, googleIdToken);
                    }
                })
                .catch((googleLoginError) => {
                    if (googleLoginError.status === 302) {
                        navi("/sign-up-social", { state: { ...googleLoginInfo, code } });
                    }
                });
        }
    }, [googleLoginInfo]);

    return (
        <>
            <div className="size-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center select-none">
                <div className="w-xl px-24 my-48 bg-white dark:bg-gray-800 border-2 border-maincolor rounded-2xl flex flex-col justify-center items-center">
                    <div className="font-maintheme text-4xl text-maincolor">로그인 진행 중 입니다...</div>
                </div>
            </div>
        </>
    );
};

export default LoginRedirect;
