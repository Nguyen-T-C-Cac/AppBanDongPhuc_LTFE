import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/welcomeLayout .css';

/* Pages */
import Welcome from './pages/Index';
import Home from './pages/HomePage';
import Products from './pages/Products/ProductListingPage';
import Orders from './pages/OrdersPage';
import Account from './pages/AccountPage';
import Cart from './pages/CartPage';
import MainLayout from './layouts/MainLayout';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CategoryProducts from "./pages/Products/CategoryProducts";
import ProductDetail from './pages/ProductDetailPage';
import BackLayout from "./layouts/BackLayout";
import LoginLayout from "./layouts/LoginLayout";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/*k có navbar */}
          <Route path="/" element={<Welcome />} />

          {/* Các trang trong app – có bottom navbar */}

          <Route path="/product/:id" element={<BackLayout><ProductDetail /></BackLayout>} />
         
          <Route path="/account" element={<BackLayout> <Account /> </BackLayout>}/>
          <Route element={<LoginPage />} />
          <Route
              path="/home"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
          />

          <Route
              path="/products"
              element={
                <MainLayout>
                  <Products />
                </MainLayout>
              }
          />
            <Route path="/products/:category"
                   element={
                       <MainLayout>
                           <CategoryProducts />
                       </MainLayout>
                   } />
          <Route
              path="/orders"
              element={
                <MainLayout>
                  <Orders />
                </MainLayout>
              }
          />

          <Route
              path="/account"
              element={
                <MainLayout>
                  <Account />
                </MainLayout>
              }
          />
            <Route
                path="/cart"
                element={<Cart />
                }
            />
            <Route>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>

        </Routes>

      </BrowserRouter>
  );
}

export default App;
