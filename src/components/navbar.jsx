/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const redirectToLogin = () =>{
    window.location.href = '/login';
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="poppins-thin">
      <nav className="flex fixed top-0 left-0 w-full z-50 items-center justify-between px-6 py-4 bg-white">
        <div className="md:w-[80%] w-full mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">LMS</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="font-medium text-gray-900">Home</a>
            <a href="/pricing" className="font-medium text-gray-500 hover:text-gray-900">Pricing</a>
            <a href="/contact" className="font-medium text-gray-500 hover:text-gray-900">Contact</a>
          </div>
          <div className="hidden md:block">
            <button onClick={redirectToLogin} className="bg-[#0B5D3A] cursor-pointer text-sm text-white px-6 py-2 rounded-lg font-medium">
              Sign In
            </button>
          </div>
          <button className="md:hidden text-gray-900" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/50 bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={toggleMenu}
      ></div>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-900">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <a href="/" className="font-medium text-md text-gray-900">Home</a>
          <a href="/pricing" className="font-medium text-md text-gray-500 hover:text-gray-900">Pricing</a>
          <a href="/contact" className="font-medium text-md text-gray-500 hover:text-gray-900">Contact</a>
          <button onClick={redirectToLogin} className="bg-[#0B5D3A] cursor-pointer text-sm text-white px-6 py-2 rounded-lg font-medium">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
