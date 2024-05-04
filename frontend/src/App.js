import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import AuthFormPage from './components/Pages/AuthPage.js';
import TermsAndConditions from './components/Pages/TermsAndConditionsPage';
import RestaurantDetailPage from './components/Pages/RestaurantDetailPage.js';
import { AuthContext, AuthCtxProvider } from './store/Auth-Context.js';
import { MenuCtxProvider } from './store/Menu-Context.js';
import CartPage from './components/Pages/CartPage.js';

function App() {
  const { isAuthenticated }= useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <AuthCtxProvider>
          <MenuCtxProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<AuthFormPage signup/>} />
          <Route path="/login" element={<AuthFormPage signup={false}/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path='/restuarant/add-restaurant' element={<RestaurantDetailPage />} />
          {isAuthenticated && <Route path='/cart' element={<CartPage />} />}
        </Routes>
          </MenuCtxProvider>
        </AuthCtxProvider>
      </Router>
    </div>
  );
}

export default App
