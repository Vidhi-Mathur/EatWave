import { NavLink, Outlet } from "react-router-dom"
import Content from "../UI/Content"
import Layout from "../UI/Layout"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const AccountPage = () => {
    return (
        <Layout>
            <Content>
                <div className="justify-start">
                <table className="table-auto">
                    <tr><NavLink to="/my-account/orders"><ShoppingBagIcon /> Orders</NavLink></tr>
                    <tr><NavLink to="/my-account/favorites"><FavoriteIcon /> Favorites</NavLink></tr>
                    <tr><NavLink to="/my-account/addresses"><LocationOnIcon /> Addresses</NavLink></tr>
                </table>
                </div>
                    <Outlet />
            </Content>
        </Layout>
    )
}