import React, { useState, useEffect } from "react";
import { FiUsers, FiTruck, FiBookOpen, FiDollarSign, FiMenu,} from "react-icons/fi";
import { FaCar, FaMotorcycle,} from "react-icons/fa";
import { MdDirectionsBike, MdDirectionsCar } from "react-icons/md";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import service from "../../appright/conf";
import VehicleCardList from './CardList';


const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", registrationDate: "2024-01-15", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", registrationDate: "2024-01-16", status: "Active" },
];


const mockBookings = [
  {
    id: "BK1",
    user: "John Doe",
    vehicle: "Mountain Bike Pro",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    totalCost: 150,
    status: "Active"
  }
];

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bike, setBikeVehicles] = useState([]);
  const [car, setCarVehicles] = useState([]); 

  const DashboardCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold text-blue-600">{}</h3>
          </div>
          <FiUsers className="text-3xl text-blue-500" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Vehicles</p>
            <div className="flex gap-4">
              <span className="flex items-center">
                <MdDirectionsBike className="mr-1" />
                {bike.length}
              </span>
              <span className="flex items-center">
                <MdDirectionsCar className="mr-1" />
                {car.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Bookings</p>
            <h3 className="text-2xl font-bold text-purple-600">{mockBookings.length}</h3>
          </div>
          <FiBookOpen className="text-3xl text-purple-500" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold text-yellow-600">
              ${mockBookings.reduce((acc, booking) => acc + booking.totalCost, 0)}
            </h3>
          </div>
          <FiDollarSign className="text-3xl text-yellow-500" />
        </div>
      </div>
    </div>
  );

  const UsersTable = () => (
    <div className="mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name, email, or ID"
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Registration Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {format(new Date(user.registrationDate), "MMM dd, yyyy")}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
// fetching the bike data
useEffect(() => {
  service.getBikesData ()
    .then((data) => setBikeVehicles(data.documents))
    .catch((err) => console.log(err));
  }, []);

  const BikeSection = () => (
    <div className="grid">
      <Link to={'/badd'}>
          <button className=" text-xl font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">
            Add New Bike
          </button></Link>
          <div className="space-y-8 bg-gray-200">
             {bike.length === 0 ? (
                  <div className="text-center py-12">
                    <FaCar className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-xl">No vehicles available</p>
                  </div>
                ) : (
                  <div className="space-y-1 ">
                    {bike.map((vehicle) => (
                      <div key={Math.random()*20} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 hover:scale-100 ">
                      <VehicleCardList key={vehicle}
                    vehicle={vehicle}
                    onDelete={handleDeleteBike}/>
                </div>
              ))}
              </div>
            )}
            </div>
      </div>
  );

// fetching the bike data
  useEffect(() => {
    service.getVehiclesData ()
      .then((data) => setCarVehicles(data.documents))
      .catch((err) => console.log(err));
    }, []);

  const CarSection = () => (
    <div className="grid">
    <Link to={'/add'}>
        <button className=" text-xl font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">
          Add New Car
        </button></Link>
        <div className="space-y-8 bg-gray-200">
           {car.length === 0 ? (
                <div className="text-center py-12">
                  <FaCar className="mx-auto text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-500 text-xl">No vehicles available</p>
                </div>
              ) : (
                <div className="space-y-1 ">
                  {car.map((vehicle) => (
                    <div key={Math.random()*20
                    } className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 hover:scale-100 ">
                    <VehicleCardList 
                    key={vehicle}
                    vehicle={vehicle}
                    onDelete={handleDeleteCar}/>
              </div>
            ))}
            </div>
          )}
          </div>
    </div>
  );

  // Deleting the Car 
  const handleDeleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await service.deleteCar(id);
        alert("Car deleted!");
        setCarVehicles((prev) => prev.filter((item) => item.$id !== id));
      } catch (err) {
        console.error(err);
        alert("Error deleting car");
      }
    }
  };

// Deleting the Bike  
  const handleDeleteBike = async (id) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      try {
        await service.deleteBike(id);
        alert("Bike deleted!");
        setBikeVehicles((prev) => prev.filter((item) => item.$id !== id));
      } catch (err) {
        console.error(err);
        alert("Error deleting bike");
      }
    }
  };

  const BookingsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vehicle</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Start Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">End Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total Cost</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mockBookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{booking.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{booking.user}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{booking.vehicle}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {format(new Date(booking.startDate), "MMM dd, yyyy")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {format(new Date(booking.endDate), "MMM dd, yyyy")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">${booking.totalCost}</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        {activeSection === "bookings" && <BookingsTable />}
      </div>
    </div>
  );
};

export default AdminPanel;
