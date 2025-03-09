import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi";

function nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
        {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-blue-600">GearUp</div>
            <nav className="hidden md:flex space-x-8">
                <Link to={"/"} className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                <Link to={"car"} className="text-gray-600 hover:text-blue-600 transition-colors">Car</Link>
                <Link to={"login"} className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                <Link to={"bike"} className="text-gray-600 hover:text-blue-600 transition-colors">Bike</Link>
            </nav>
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a  className="text-gray-600">Vehicles</a>
              <a  className="text-gray-600">Rentals</a>
              <a  className="text-gray-600">About Us</a>
              <a  className="text-gray-600">Contact</a>
            </div>
          </div>
        )}
      </header>
        </div>
    )
}

export default nav