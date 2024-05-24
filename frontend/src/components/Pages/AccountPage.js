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
            <div className="container mx-auto p-4">
              <main className="flex">
                <nav className="w-1/4 p-4">
                  <ul>
                    <li className="mb-2">
                      <NavLink to="/my-account/orders" className="flex items-center p-2 hover:bg-gray-100 rounded">
                        <span className="ml-2"><ShoppingBagIcon /> Orders</span>
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="/my-account/favorites" className="flex items-center p-2 hover:bg-gray-100 rounded">
                        <span className="ml-2"><FavoriteIcon /> Favorites</span>
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="/my-account/addresses" className="flex items-center p-2 hover:bg-gray-100 rounded">
                        <span className="ml-2"><LocationOnIcon /> Addresses</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <section className="w-3/4 p-4">
                  <Outlet />
                </section>
              </main>
              </div>
            </Content>
        </Layout>
    )
}