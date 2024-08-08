import { NavLink, Outlet, useLocation } from "react-router-dom"
import { Content } from "../UI/Content"
import Layout from "../UI/Layout"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContext } from "react";
import { AuthContext } from "../../store/Auth-Context";
import backgroundImage from "../../assets/AccountPage.jpeg"

export const AccountPage = () => {
    const { details } = useContext(AuthContext)
    const location = useLocation()

    const isOrdersActive = location.pathname === '/my-account' || location.pathname === '/my-account/orders';

    return (
        <Layout customisedImageUrl={backgroundImage}>
          <Content>
                <div className="bg-orange-500 text-white p-8">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold">{details.name}</h1>
                        <h1 className="text-lg">{details.email}</h1>
                    </div>
                </div>
                <div className="container mx-auto p-4">
                    <main className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                        <nav className="w-full md:w-1/4 p-4 bg-orange-100">
                          <ul>
                            <li className="mb-2">
                              <NavLink to="/my-account/orders" className={ `flex items-center p-3 rounded-lg ${
                                isOrdersActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-200'}`}>
                                <ShoppingBagIcon className="mr-3"/>
                                <span>Orders</span>
                              </NavLink>
                            </li>
                            <li className="mb-2">
                              <NavLink to="/my-account/favorites" className={({ isActive }) => `flex items-center p-3 rounded-lg ${
                                isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-200'}`}>
                                <FavoriteIcon className="mr-3"/>
                                <span>Favorites</span>
                              </NavLink>
                            </li>
                            <li className="mb-2">
                              <NavLink to="/my-account/addresses" className={({ isActive }) => `flex items-center p-3 rounded-lg ${
                                isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-200'}`}>
                                <LocationOnIcon className="mr-3"/>
                                <span>Addresses</span>
                              </NavLink>
                            </li>
                          </ul>
                        </nav>
                        <section className="w-full md:w-3/4 p-4">
                          <Outlet />
                        </section>
                    </main>
                </div>
            </Content>
        </Layout>
    )
}