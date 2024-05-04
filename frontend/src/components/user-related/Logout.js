import { useEffect, useState } from "react"

export const Logout = () => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        const logoutUser = async() => {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!response) throw new Error('Failed to Login user out')
            setToken(null)
        }
        logoutUser()
    }, [token])
    //As renders nothing
    return null
}