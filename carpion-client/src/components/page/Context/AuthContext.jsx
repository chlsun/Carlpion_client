import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navi = useNavigate();

    const [auth, setAuth] = useState({
        username: null,
        nickname: null,
        realname: null,
        email: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
    });

    const [refreshToken, setRefreshToekn] = useState(() => localStorage.getItem("refreshToken"));

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");

        if (token == null && refreshToken) {
            axios
                .post(`http://localhost:80/auth/auto-login`, {
                    refreshToken: refreshToken,
                })
                .then((result) => {
                    const { username, nickname, realname, email, accessToken, refreshToken } = result.data;
                    login(username, nickname, realname, email, accessToken, refreshToken);
                })
                .catch(() => {
                    localStorage.removeItem("refreshToken");
                });
        } else if (token) {
            const username = sessionStorage.getItem("username");
            const nickname = sessionStorage.getItem("nickname");
            const realname = sessionStorage.getItem("realname");
            const email = sessionStorage.getItem("email");
            const accessToken = sessionStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            setAuth({
                username,
                nickname,
                realname,
                email,
                accessToken,
                refreshToken,
                isAuthenticated: true,
            });
        }

        setTimeout(() => {
            setRefreshToekn(localStorage.getItem("refreshToken"));
        }, 2000);
    }, [refreshToken]);

    function login(username, nickname, realname, email, accessToken, refreshToken) {
        if (refreshToken === undefined) {
            setAuth({
                username,
                nickname,
                realname,
                email,
                accessToken,
                refreshToken: null,
                isAuthenticated: true,
            });

            sessionStorage.setItem("username", username);
            sessionStorage.setItem("nickname", nickname);
            sessionStorage.setItem("realname", realname);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("accessToken", accessToken);

            return;
        }

        setAuth({
            username,
            nickname,
            realname,
            email,
            accessToken,
            refreshToken,
            isAuthenticated: true,
        });

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("nickname", nickname);
        sessionStorage.setItem("realname", realname);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }

    const logout = () => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken && refreshToken !== "undefined") {
            axios.post(`http://localhost:80/auth/logout`, {
                refreshToken: refreshToken,
            });
        }

        setAuth({
            username: null,
            nickname: null,
            realname: null,
            email: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
        });

        sessionStorage.removeItem("username");
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("realname");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("socialId");
        sessionStorage.removeItem("platform");
        localStorage.removeItem("refreshToken");

        navi("/");
    };

    return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};
