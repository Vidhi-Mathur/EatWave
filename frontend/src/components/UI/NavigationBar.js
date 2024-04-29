import { NavLink } from "react-router-dom";
import SearchSharpIcon from '@mui/icons-material/SearchTwoTone';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";


const NavLinks = (props) => {
    return (
        <>
        <NavLink to="/search" className="mr-16"><SearchSharpIcon /> Search</NavLink>
        <NavLink to="/offers" className="mr-16"><LocalOfferOutlinedIcon /> Offers</NavLink>
        <NavLink to="/help" className="mr-16"><HelpOutlineSharpIcon /> Help</NavLink> 
        <NavLink to="/signup" className="mr-16"><LoginIcon /> Signup</NavLink>
        <NavLink to="/cart" className="mr-16"><ShoppingCartSharpIcon /> Cart</NavLink>
        </>
    )
}
const NavigationBar = (props) => {
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
                <button onClick={toggleNavBar}>{isOpen ? <CloseIcon /> : <MenuIcon />}</button>
            </div>
        </nav>
        {isOpen && <div className="flex basis-full flex-col items-center "><NavLinks /></div>}
        </>
    );
}

export default NavigationBar