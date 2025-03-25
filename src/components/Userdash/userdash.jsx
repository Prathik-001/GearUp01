import { useState } from "react";
import { FaCar, FaHistory, FaCalendarAlt, FaUser, FaPhone, FaMapMarkerAlt, FaClock, FaCoins} from "react-icons/fa";
import { format } from "date-fns";

const CarRentalDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const userData = {
    name: "Roshan",
    email: "Roshan@gmail.om",
    memberSince: "2022-01-01",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    tier: "Gold Member",
    stats: {
      totalRentals: 25,
      milesDriven: 5000,
      preferredVehicle: "SUV"
    }
  };

  const activeRental = {
    vehicle: "Tesla Model 3",
    image: "https://images.unsplash.com/photo-1637706679933-c421676a8f13",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    specs: "Electric · Automatic · 5 Seats",
    remainingDays: 5
  };

  const upcomingRentals = [
    {
      id: 1,
      vehicle: "BMW X5",
      image: "https://images.unsplash.com/photo-1622653902334-5e98a8694f47",
      startDate: "2024-02-01",
      location: "New York City",
      duration: "7 days"
    },
    {
      id: 2,
      vehicle: "Mercedes GLC",
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982",
      startDate: "2024-02-15",
      location: "Los Angeles",
      duration: "5 days"
    }
  ];

  const rentalHistory = [
    {
      id: 1,
      date: "2023-12-15",
      vehicle: "Audi Q7",
      duration: "7 days",
      cost: "$850",
      status: "Completed"
    },
    {
      id: 2,
      date: "2023-11-20",
      vehicle: "Toyota Camry",
      duration: "3 days",
      cost: "$300",
      status: "Cancelled"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-8">User Dashboard</h1>
        <div className="flex flex-col space-y-2">
          {[
            { id: "profile", icon: FaUser, label: "Profile" },
            { id: "active", icon: FaCar, label: "Active Rental" },
            { id: "upcoming", icon: FaCalendarAlt, label: "Upcoming" },
            { id: "history", icon: FaHistory, label: "History" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{userData.name}</h2>
                    <p className="text-gray-500">{userData.email}</p>
                    <p className="text-sm mt-2">Member since {format(new Date(userData.memberSince), "MMM yyyy")}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {userData.tier}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-lg bg-white shadow-lg`}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaCar className="text-2xl text-blue-500" />
                    <h3 className="text-lg font-semibold">Total Rentals</h3>
                  </div>
                  <p className="text-3xl font-bold">{userData.stats.totalRentals}</p>
                </div>
                <div className={`p-4 rounded-lg bg-white shadow-lg`}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaClock className="text-2xl text-green-500" />
                    <h3 className="text-lg font-semibold">Miles Driven</h3>
                  </div>
                  <p className="text-3xl font-bold">{userData.stats.milesDriven}</p>
                </div>
                <div className={`p-4 rounded-lg bg-white shadow-lg`}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaCoins className="text-2xl text-yellow-500" />
                    <h3 className="text-lg font-semibold">Preferred Vehicle</h3>
                  </div>
                  <p className="text-3xl font-bold">{userData.stats.preferredVehicle}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "active" && activeRental && (
            <div className={`p-6 rounded-lg bg-white shadow-lg`}>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={activeRental.image}
                  alt={activeRental.vehicle}
                  className="w-full md:w-1/3 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{activeRental.vehicle}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Start Date</p>
                      <p className="font-semibold">{format(new Date(activeRental.startDate), "PP")}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">End Date</p>
                      <p className="font-semibold">{format(new Date(activeRental.endDate), "PP")}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Specifications</p>
                      <p className="font-semibold">{activeRental.specs}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Remaining Days</p>
                      <p className="font-semibold">{activeRental.remainingDays} days</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Extend Rental</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel Rental</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaPhone className="inline mr-2" /> Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "upcoming" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingRentals.map((rental) => (
                <div key={rental.id} className={`p-4 rounded-lg bg-white shadow-lg`}>
                  <img
                    src={rental.image}
                    alt={rental.vehicle}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{rental.vehicle}</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt />
                      {format(new Date(rental.startDate), "PP")}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      {rental.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock />
                      {rental.duration}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Modify</button>
                    <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "history" && (
            <div className={`rounded-lg bg-white shadow-lg overflow-hidden`}>
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Vehicle</th>
                    <th className="px-6 py-3 text-left">Duration</th>
                    <th className="px-6 py-3 text-left">Cost</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalHistory.map((rental) => (
                    <tr key={rental.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-6 py-4">{format(new Date(rental.date), "PP")}</td>
                      <td className="px-6 py-4">{rental.vehicle}</td>
                      <td className="px-6 py-4">{rental.duration}</td>
                      <td className="px-6 py-4">{rental.cost}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${rental.status === "Completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {rental.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRentalDashboard;