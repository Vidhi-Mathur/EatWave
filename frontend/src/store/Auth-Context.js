import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    signup: () => {},
    logout: () => {},
    token: null,
    refreshToken: null,
    setToken: () => {},
    setRefreshToken: () => {},
    fetchRefreshToken: () => {}
});

export const AuthCtxProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null); 
    const [refreshToken, setRefreshToken] = useState(null)

    const login = (newToken, newRefreshToken) => {
        setAuth(true);
        setToken(newToken); 
        setRefreshToken(newRefreshToken)
    };

    const signup = (newToken, newRefreshToken) => {
        setAuth(true);
        setToken(newToken); 
        setRefreshToken(newRefreshToken)
    };

    const logout = () => {
        setAuth(false);
        setToken(null); 
        setRefreshToken(null)
    };

    const fetchRefreshToken = async() => {
        const response = await fetch('http://localhost:3000/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        })
        if(!response.ok){
            console.log('Problem with refresh token')
            logout()
        }
        const result = await response.json()
        setToken(result.accessToken)
        return result
    }

    const ctxValue = {
        isAuthenticated: auth,
        login,
        signup,
        logout,
        token,
        refreshToken, 
        setToken,
        setRefreshToken,
        fetchRefreshToken
    };

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};