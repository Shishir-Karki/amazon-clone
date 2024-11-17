import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Navbar = ({ onSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search");
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="flex items-center p-1 pl-4 pr-2 py-2">
        <Link to="/">
          <div className="flex items-center mr-4">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className="h-[35px] object-contain cursor-pointer mt-2"
            />
            <span className="text-xs text-white ml-1">.in</span>
          </div>
        </Link>
        <div className="link flex items-center mr-4 hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
          <div className="pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-200">Deliver to</p>
            <p className="text-sm font-bold">India</p>
          </div>
        </div>
        <div className="hidden sm:flex flex-grow">
          <form
            onSubmit={handleSearch}
            className="flex items-center h-10 rounded-md flex-grow"
          >
            <div
              className="flex items-center h-full px-4 bg-gray-200 text-gray-600 text-sm rounded-l-md hover:bg-gray-300 cursor-pointer"
              onClick={toggleSidebar}
            >
              All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            <input
              type="text"
              className="h-full p-2 flex-grow focus:outline-none text-black"
              placeholder="Search Amazon.in"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="h-full px-5 bg-[#febd69] hover:bg-[#f3a847] cursor-pointer rounded-r-md flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-4 mx-6 whitespace-nowrap">
          <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png"
              alt="Flag"
              className="h-4 mr-1"
            />
            <span className="font-bold text-sm">EN</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div className="link hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
            <p className="text-xs">Hello, sign in</p>
            <p className="font-bold text-sm">
              Account & Lists
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 inline ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </p>
          </div>
          <div className="link hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
            <p className="text-xs">Returns</p>
            <p className="font-bold text-sm">& Orders</p>
          </div>
          <Link to="/cart">
            <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="absolute top-0 right-0 h-5 w-5 bg-[#f3a847] text-black font-bold rounded-full flex items-center justify-center">
                  {cartTotalQuantity}
                </span>
              </div>
              <span className="font-bold text-sm mt-3">Cart</span>
            </div>
          </Link>
        </div>
      </div>
     
<div className="flex items-center bg-[#232f3e] text-sm w-full overflow-x-auto">
  <div className="flex items-center max-w-screen-2xl mx-auto w-full px-4">
    <div
      className="flex items-center justify-between text-4xl space-x-20 px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer"
      onClick={toggleSidebar}
    >
     <p className="flex ">
     <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-6 h-6 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
        />
      </svg>
      <span className="text-base font-medium">All</span>
     </p>
    </div>
    <p className="px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Best Sellers
    </p>
    <p className="px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Mobiles
    </p>
    <p className="px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Electronics
    </p>
    <p className="hidden md:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Books
    </p>
    <p className="hidden lg:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Fashion
    </p>
    <p className="hidden lg:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Customer Service
    </p>
    <p className="hidden lg:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Amazon Pay
    </p>
    <p className="hidden xl:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      New Releases
    </p>
    <p className="hidden xl:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Prime
    </p>
    <p className="hidden xl:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Fast Delivery
    </p>
    <p className="hidden 2xl:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Today's Deals
    </p>
    <p className="hidden 2xl:flex px-4 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-base">
      Best Deals
    </p>
  </div>
</div>
    </nav>
  );
};

export default Navbar;
