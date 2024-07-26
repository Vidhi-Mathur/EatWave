import { useContext, useEffect } from "react"
import { AuthContext } from "../../store/Auth-Context"

export const Logout = () => {
    const { token, setToken } = useContext(AuthContext)
    useEffect(() => {
        const logoutUser = async() => {
            const response = await fetch('https://eatwave-api.onrender.com/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!response) throw new Error('Failed to Login user out')
            setToken(null)
        }
        logoutUser()
    }, [token, setToken])
    //As renders nothing
    return null
}