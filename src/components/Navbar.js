import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { clearUser } from '../utils/authSlice';
import Sidebar from './Sidebar';

const Navbar = ({ onSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchVisible(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex flex-col">
        <div className="flex items-center p-1 pl-4 pr-2 py-2">
          <button className="lg:hidden mr-2" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5" />
            </svg>
          </button>

          <Link to="/" className={`flex-shrink-0 ${isSearchVisible ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex items-center mr-2 md:mr-4">
              <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" className="h-[25px] md:h-[35px] object-contain cursor-pointer mt-2" />
              <span className="text-xs text-white ml-1">.in</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className={`flex flex-grow ${isSearchVisible ? 'flex' : 'hidden md:flex'}`}>
            <div className="flex flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 h-10 flex-grow rounded-l-md focus:outline-none"
                placeholder="Search Amazon.in"
              />
              <button type="submit" className="px-4 bg-[#febd69] hover:bg-[#f3a847] rounded-r-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </form>

          <button onClick={toggleSearch} className={`md:hidden mx-2 ${isSearchVisible ? 'hidden' : 'block'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          <div className={`hidden md:flex items-center space-x-4 mx-6 whitespace-nowrap ${isSearchVisible ? 'md:hidden' : ''}`}>
            <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png" alt="Flag" className="h-4 mr-1" />
              <span className="font-bold text-sm">EN</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            <div className="link hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer relative group">
              <p className="text-xs">Hello, {user?.email?.split('@')[0] || 'Guest'}</p>
              <p className="font-bold text-sm">
                Account & Lists
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 inline ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </p>
              
              <div className="hidden group-hover:block absolute right-0 top-full w-56 bg-white text-black shadow-lg rounded-sm z-50">
                <div className="p-4">
                  {!user ? (
                    <div>
                      <Link to="/login">
                        <button className="w-full bg-[#f0c14b] hover:bg-[#e8b835] text-sm py-2 px-3 rounded-sm border border-[#a88734]">
                          Sign In
                        </button>
                      </Link>
                      <p className="mt-2 text-xs">
                        New customer?{' '}
                        <Link to="/signup" className="text-[#0066c0] hover:text-[#c45500] hover:underline">
                          Start here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="w-full bg-[#f0c14b] hover:bg-[#e8b835] text-sm py-2 px-3 rounded-sm border border-[#a88734]"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="link hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
              <p className="text-xs">Returns</p>
              <p className="font-bold text-sm">& Orders</p>
            </div>
          </div>

          <Link to="/cart" className={`flex items-center hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer ${isSearchVisible ? 'hidden md:flex' : 'flex'}`}>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 md:w-10 h-8 md:h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-14.158 0M7.5 14.25l-2.394-7.978m15.144 9.478a3 3 0 1 0-2.625 4.5" />
              </svg>
              <span className="absolute top-0 right-0 md:right-1 rounded-full bg-[#f08804] h-4 md:h-6 text-[10px] md:text-sm font-bold text-center text-black w-4 md:w-6">
                {cartTotalQuantity}
              </span>
            </div>
            <p className="hidden md:block font-bold text-sm md:text-base ml-1 mt-2">Cart</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
