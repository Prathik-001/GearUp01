import React, { useState, useEffect } from "react";
import { FiUsers, FiTruck, FiBookOpen, FiDollarSign, FiMenu } from "react-icons/fi";
import { FaCar, FaMotorcycle, FaUser } from "react-icons/fa";
import { MdDirectionsBike, MdDirectionsCar } from "react-icons/md";
import { Link } from "react-router-dom";
import service from "../../appright/conf";
import CarCardList from "./CarCardList";
import BikeCardList from "./BikeCardList";
import UserData from "./UserData";
import VehicleRentalBookingRow from "./AdminBooking";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bike, setBikeVehicles] = useState([]);
  const [car, setCarVehicles] = useState([]);
  const [user, setUserData] = useState([]);
  const [booking, setBooking] = useState([]);

  // Fetch all data
  useEffect(() => {
    service.getAllUsersData().then(setUserData).catch(console.error);
    service.getAllBikesData().then(setBikeVehicles).catch(console.error);
    service.getAllCarsData().then(setCarVehicles).catch(console.error);
    service.getAllBookingsData().then(setBooking).catch(console.error);
  }, []);

  // Dashboard
  const DashboardCards = () => (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold text-blue-600">{user.length}</h3>
          </div>
          <FiUsers className="text-3xl text-blue-500" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Vehicles</p>
            <div className="flex gap-4">
              <span className="flex items-center"><MdDirectionsBike className="mr-1" />{bike.length}</span>
              <span className="flex items-center"><MdDirectionsCar className="mr-1" />{car.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Bookings</p>
            <h3 className="text-2xl font-bold text-purple-600">{booking.length}</h3>
          </div>
          <FiBookOpen className="text-3xl text-purple-500" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold text-yellow-600">
              ₹{booking.reduce((acc, b) => acc + b.totalPrice, 0)}
            </h3>
          </div>
          <span className="text-3xl text-yellow-500">₹</span> {/* Directly using the ₹ symbol */}
        </div>
      </div>
    </div>
  );

  // User Section

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Blue button
      cancelButtonColor: "#d33",     // Red cancel button
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        await service.deleteUser(id);
        await Swal.fire(
          "Deleted!",
          "The User has been deleted successfully.",
          "success"
        );
        setUserData((prev) => prev.filter((item) => item.$id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error!",
          "There was a problem deleting the User.",
          "error"
        );
      }
    }
  };

  const UsersTable = () => (
    <div>
      {user.length === 0 ? (
        <div className="text-center py-12">
          <FaUser className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-xl">No User Found</p>
        </div>
      ) : (
        <div>
          {user.map((u) => (
            <div key={u.$id} className="mt-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-100">
              <UserData user={u} onDelete={handleDeleteUser} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Bike Section
  const handleDeleteBike = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This Bike will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Blue button
      cancelButtonColor: "#d33",     // Red cancel button
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        await service.deleteBike(id);
        await Swal.fire(
          "Deleted!",
          "The bike has been deleted successfully.",
          "success"
        );
        setBikeVehicles((prev) => prev.filter((item) => item.$id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error!",
          "There was a problem deleting the car.",
          "error"
        );
      }
    }
  };

  const BikeSection = () => (
    <div className="grid">
      <Link to="badd">
        <button className="text-xl font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">Add New Bike</button>
      </Link>
      <div className="space-y-8 bg-gray-200">
        {bike.length === 0 ? (
          <div className="text-center py-12">
            <FaCar className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl">No vehicles available</p>
          </div>
        ) : (
          <div className="space-y-1">
            {bike.map((vehicle) => (
              <div key={vehicle.$id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 hover:scale-100">
                <BikeCardList  vehicle={vehicle} onDelete={handleDeleteBike} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Car Section  

  const handleDeleteCar = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Blue button
      cancelButtonColor: "#d33",     // Red cancel button
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        await service.deleteCar(id);
        await Swal.fire(
          "Deleted!",
          "The car has been deleted successfully.",
          "success"
        );
        setCarVehicles((prev) => prev.filter((item) => item.$id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error!",
          "There was a problem deleting the car.",
          "error"
        );
      }
    }
  };
  

  const CarSection = () => (
    <div>
      <Link to="add">
        <button className="text-xl font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">Add New Car</button>
      </Link>
      <div className="space-y-8 bg-gray-200">
        {car.length === 0 ? (
          <div className="text-center py-12">
            <FaCar className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl">No vehicles available</p>
          </div>
        ) : (
          <div className="space-y-1">
            {car.map((vehicle) => (
              <div key={vehicle.$id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 hover:scale-100">
                <CarCardList vehicle={vehicle} onDelete={handleDeleteCar} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Bookings Section


  const handleDeleteBooking = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this booking!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await service.deleteBooking(id);
          Swal.fire(
            "Deleted!",
            "Your booking has been deleted.",
            "success"
          );
          setBooking((prev) => prev.filter((item) => item.$id !== id));
        } catch (err) {
          console.error(err);
          Swal.fire(
            "Error!",
            "There was a problem deleting the booking.",
            "error"
          );
        }
      }
    };

  
  const BookingsTable = ({ booking, users, handleDeleteBooking }) => (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vehicle Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Cost</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {booking.map((b) => (
              <VehicleRentalBookingRow
                key={b.$id}
                booking={b}
                users={users}
                onDelete={handleDeleteBooking}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300`}
        >
          <div className="p-4 flex items-center justify-between">
            <h2 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>Admin Panel</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FiMenu className="text-gray-600" />
            </button>
          </div>
          <nav className="mt-8">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full p-4 flex items-center ${activeSection === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
            >
              <FiUsers className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Dashboard</span>}
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`w-full p-4 flex items-center ${activeSection === "users" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
            >
              <FiUsers className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Users</span>}
            </button>
            <button
              onClick={() => setActiveSection("car")}
              className={`w-full p-4 flex items-center ${activeSection === "car" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
            >
              <FaCar className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Cars</span>}
            </button>
            <button
              onClick={() => setActiveSection("bike")}
              className={`w-full p-4 flex items-center ${activeSection === "bike" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
            >
              <FaMotorcycle className="text-xl" /> 
              {isSidebarOpen && <span className="ml-4">Bikes</span>}
            </button>
            <button
              onClick={() => setActiveSection("bookings")}
              className={`w-full p-4 flex items-center ${activeSection === "bookings" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
            >
              <FiBookOpen className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Bookings</span>}
            </button>
          </nav>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-2xl font-bold mb-8">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
  
          {activeSection === "dashboard" && <DashboardCards />}
          {activeSection === "users" && <UsersTable />}
          {activeSection === "car" && <CarSection />}
          {activeSection === "bike" && <BikeSection />}
          {activeSection === "bookings" &&  <BookingsTable 
            booking={booking}
            users={user}
            handleDeleteBooking={handleDeleteBooking}/>}
        </div>
      </div>
    );
};

export default AdminPanel;
