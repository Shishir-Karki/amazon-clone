import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './utils/firebase';
import { setUser, clearUser } from './utils/authSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductDetail from './components/ProductDetail';

import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email,
            uid: currentUser.uid,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const isAuthPage = ['/signup', '/'].includes(location.pathname);

  return (
    <div className="App flex flex-col min-h-screen">
      {!isAuthPage && <Navbar onSearch={handleSearch} />}

      <div className="flex-grow">
        <Routes>
          {/* Authentication Pages */}
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <Signup />}
          />

          {/* Protected Main Pages */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Carousel />
                  <ProductSection searchQuery={searchQuery} />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
  path="/product/:id"
  element={
    <ProtectedRoute>
      <ProductDetail />
    </ProtectedRoute>
  }
/>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
