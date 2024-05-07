import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    signup: () => {},
    logout: () => {},
    token: null,
    setToken: () => {} 
});

export const AuthCtxProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null); 

    const login = (newToken) => {
        setAuth(true);
        setToken(newToken); 
    };

    const signup = (newToken) => {
        setAuth(true);
        setToken(newToken); 
    };

    const logout = () => {
        setAuth(false);
        setToken(null); 
    };

    const ctxValue = {
        isAuthenticated: auth,
        login,
        signup,
        logout,
        token, 
        setToken 
    };

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};