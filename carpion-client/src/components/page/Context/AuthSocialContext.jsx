import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthSocialContext = createContext();

export const AuthSocialProvider = ({ children }) => {
    const navi = useNavigate();

    const [authSocial, setAuthSocial] = useState({
        socialId: null,
        platform: null,
        nickname: null,
        realname: null,
        email: null,
        accessToken: null,
        isAuthenticated: false,
    });

    const socialLogin = (socialId, platform, nickname, realname, email, accessToken) => {
        setAuthSocial({ socialId, platform, nickname, realname, email, accessToken, isAuthenticated: true });

        sessionStorage.setItem("socialId", socialId);
        sessionStorage.setItem("platform", platform);
        sessionStorage.setItem("nickname", nickname);
        sessionStorage.setItem("realname", realname);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("accessToken", accessToken);

        navi("/");
    };

    const socialLogout = () => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken && refreshToken !== "undefined") {
            axios.post(`http://localhost:80/auth/logout`, {
                refreshToken: refreshToken,
            });
        }

        setAuthSocial({ socialId: null, platform: null, nickname: null, realname: null, email: null, accessToken: null, isAuthenticated: false });

        sessionStorage.removeItem("socialId");
        sessionStorage.removeItem("platform");
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("realname");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("username");
        localStorage.removeItem("refreshToken");

        navi("/");
    };

    return <AuthSocialContext.Provider value={{ authSocial, socialLogin, socialLogout }}>{children}</AuthSocialContext.Provider>;
};
