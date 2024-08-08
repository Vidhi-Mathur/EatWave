import { NavLink } from "react-router-dom";
import SearchSharpIcon from '@mui/icons-material/SearchTwoTone';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useContext, useState } from "react";
import { AuthContext } from "../../store/Auth-Context";
import { DropDownMenu } from "./DropDownMenu";


const NavLinks = (props) => {
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <>
        <NavLink to="/search" className="mr-4 md:mr-16"><SearchSharpIcon /> Search</NavLink>
        {isAuthenticated? (
            <>
            <NavLink to="/cart" className="mr-4 md:mr-16"><ShoppingCartSharpIcon /> Cart</NavLink>
            <NavLink to="/restaurant/add-restaurant" className="mr-4 md:mr-16"><RestaurantIcon /> Add Restaurant</NavLink>
            <DropDownMenu />
            </>
        ): (
            <NavLink to="/signup" className="mr-4 md:mr-16"><LoginIcon /> Signup</NavLink>
        )}
        </>
    )
}

export const NavigationBar = (props) => {
    const [isOpen, setOpen] = useState(false);

    const toggleNavBar = () => {
        setOpen(!isOpen); 
    }

    return (
        <>
        <nav className="flex justify-between items-center">
            <div className="hidden w-full justify-between md:flex">
                <NavLinks />
            </div>
            <div className="md:hidden">
                <button onClick={toggleNavBar}>{isOpen ? <CloseIcon className="absolute right-2 top-20"/> : <MenuIcon />}</button>
            </div>
        </nav>
        {isOpen && <div className="flex basis-full flex-col items-center "><NavLinks /></div>}
        </>
    );
}