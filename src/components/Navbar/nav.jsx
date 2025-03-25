import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { FiMenu, FiX } from "react-icons/fi";
import authService from "../../appright/auth";
import { logout as authLogout } from "../../store/authSlice";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status); // Get authentication status from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const logoutUser = async () => {
    try {
      const res = await authService.logout();
      if (res)
      {
        console.log(res);
      dispatch(authLogout()); // Update Redux store
      navigate("/"); // Redirect to home after logout
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header className="bg-white shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-blue-600">GearUp</div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            {!authStatus ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/singup" className="text-gray-600 hover:text-blue-600 transition-colors">Signup</Link>
              </>
            ) : (
              <>
               <Link to={"/userdash"} className="text-gray-600 hover:text-blue-600 transition-colors ">Dashboard</Link>
              <button onClick={(e)=>logoutUser()} className="text-red-600 hover:text-red-800 transition-colors">Logout</button>
             </>
            )} 
          </nav>
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/vehicles" className="text-gray-600">Vehicles</Link>
            <Link to="/rentals" className="text-gray-600">Rentals</Link>
            <Link to="/about" className="text-gray-600">About Us</Link>
            <Link to="/contact" className="text-gray-600">Contact</Link>
            {!authStatus ? (
              <>
                <Link to="/login" className="text-gray-600">Login</Link>
                <Link to="/signup" className="text-gray-600">Signup</Link>
              </>
            ) : (
              <button onClick={logoutUser} className="text-red-600 hover:text-red-800">Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
