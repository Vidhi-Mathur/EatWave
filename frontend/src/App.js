import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import AuthFormPage from './components/Pages/AuthPage.js';
import TermsAndConditions from './components/Pages/TermsAndConditionsPage';
import RestaurantDetailPage from './components/Pages/RestaurantDetailPage.js';
import { AuthContext } from './store/Auth-Context.js';
import { CartPage } from './components/Pages/CartPage.js';
import { OrderPage } from './components/Pages/OrderPage.js';
import { ErrorPage } from './components/Pages/ErrorPage.js';
import { Cancel } from './components/Pages/Cancel.js';
import { Success } from './components/Pages/Success.js';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<AuthFormPage signup />} />
              <Route path="/login" element={<AuthFormPage signup={false} />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />
              <Route path='/restaurant/add-restaurant' element={<RestaurantDetailPage />} />
              {isAuthenticated && (
                <>
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/order' element={<OrderPage />} />
                </>
              )}
              <Route path='/cancel' element={<Cancel />} />
              <Route path='/success' element={<Success />} />
              <Route path="*" element={<ErrorPage />}/>
            </Routes>
      </Router>
    </div>
  );
}

export default App;