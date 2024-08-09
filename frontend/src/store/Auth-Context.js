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
    fetchRefreshToken: () => {},
    details: () => {}
});

export const AuthCtxProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null); 
    const [refreshToken, setRefreshToken] = useState(null)
    const [details, setDetails] = useState({ name: '', email: ''})

    const login = (newToken, newRefreshToken, name, email) => {
        setAuth(true);
        setToken(newToken); 
        setRefreshToken(newRefreshToken)
        setDetails({name, email})
    };

    const signup = (newToken, newRefreshToken, name, email) => {
        setAuth(true);
        setToken(newToken); 
        setRefreshToken(newRefreshToken)
        setDetails({name, email})
    };

    const logout = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to log user out');
            setAuth(false);
            setToken(null); 
            setRefreshToken(null)
        } 
        catch (error) {
            console.error(error.message);
        }
    };

    const fetchRefreshToken = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
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
        fetchRefreshToken,
        details
    };

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};