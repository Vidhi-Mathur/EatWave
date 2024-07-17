import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import AuthFormPage from './components/Pages/AuthPage.js';
import TermsAndConditions from './components/Pages/TermsAndConditionsPage';
import RestaurantDetailPage from './components/Pages/RestaurantDetailPage.js';
import { CartPage } from './components/Pages/CartPage.js';
import { OrderPage } from './components/Pages/OrderPage.js';
import { ErrorPage } from './components/Pages/ErrorPage.js';
import { Cancel } from './components/Pages/Cancel.js';
import { SuccessPage } from './components/Pages/SuccessPage.js';
import { AccountPage } from './components/Pages/AccountPage.js';
import { PastOrders } from './components/user-related/PastOrders.js';
import { AddRestaurantPage } from './components/Pages/AddRestaurantPage.js';
import { SearchPage } from './components/Pages/SearchPage.js';
import { ProtectedRoutes } from './components/user-related/ProtectedRoutes.js';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<AuthFormPage signup />} />
              <Route path="/login" element={<AuthFormPage signup={false} />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />
              <Route path ="/search" element={<SearchPage />}/>
              <Route element={<ProtectedRoutes />}>
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/order' element={<OrderPage />} />
                  <Route path='/cancel' element={<Cancel />} />
                  <Route path='/success' element={<SuccessPage />} />
                  <Route path="/my-account" element={<AccountPage />}>
                    <Route path="orders" element={<PastOrders />} />
                    {/* <Route path="/favorites" element={} /> */}
                  </Route>
                  <Route path='/restaurant/add-restaurant' element={<AddRestaurantPage />} />
              </Route>
              <Route path="*" element={<ErrorPage />}/>
            </Routes>
      </Router>
    </div>
  );
}

export default App;

