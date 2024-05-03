import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    signup: () => {},
    logout: () => {}
})

export const AuthCtxProvider = ({children}) => {
    const [auth, setAuth] = useState(false)
    const login = () => {
        setAuth(true)
    }
    const signup = () => {
        setAuth(true)
    }
    const logout = () => {
        setAuth(false)
    }
    const ctxValue = {
        isAuthenticated: auth,
        login,
        signup,
        logout
    }
    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
}