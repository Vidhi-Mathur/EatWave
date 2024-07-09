import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../store/Auth-Context"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const DropDownMenu = () => {
    const { logout } = useContext(AuthContext)
    const [dropDown, setDropDown] = useState(false)
    
    const openHandler = () => {
        setDropDown(true)
    }

    const closeHandler = () => {
        setDropDown(false)
    }

    const logoutHandler = () => {
        logout()
        setDropDown(false)
    }

    return (
        <>
        <div className="relative inline-block" onMouseEnter={openHandler} onMouseLeave={closeHandler}>
                <NavLink to="/my-account" className="mr-4 md:mr-16"><AccountCircleIcon /> Username</NavLink>
                {dropDown && (
                    <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <nav className="py-2 text-sm text-gray-700">
                    <NavLink to='/my-account' className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink>
                    <NavLink to='/my-account/orders' className="block px-4 py-2 hover:bg-gray-100">Orders</NavLink>
                    <NavLink to='/my-account/favorites' className="block px-4 py-2 hover:bg-gray-100">Favorites</NavLink>
                    <button onClick={logoutHandler} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                    </nav>
                    </div>
                )}
        </div>
        </>
  )
}