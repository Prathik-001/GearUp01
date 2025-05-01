import { useState, useEffect } from "react";
import {FaCar,FaHistory,FaCalendarAlt,FaUser,FaPhone,FaMapMarkerAlt,FaClock,FaCoins,} from "react-icons/fa";
import { format } from "date-fns";
import service from "../../appright/conf";
import { Account } from "appwrite";
import ActiveRental from "./activeRentalCard";
import Swal from "sweetalert2";


const CarRentalDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [booking, setBooking] = useState([]);
  const [userData, setUserData] = useState(null);
  const today = new Date();

  useEffect(() => {
    const loadUserBookings = async () => {
      try {
        const account = new Account(service.client);
        const user = await account.get();
        setUserData(user);

        const allBookings = await service.getAllBookingsData();
        const userBookings = allBookings.filter(
          (booking) => booking.userId === user.$id
        );
        setBooking(userBookings);
      } catch (err) {
        console.error(err);
        alert("Failed to load user bookings.");
      }
    };

    loadUserBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This Booking will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Blue button
      cancelButtonColor: "#d33",     // Red cancel button
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        await service.deleteBooking(id);
        await Swal.fire(
          "Deleted!",
          "The Booking has been deleted successfully. Refund will be processed with in 24 hours.",
          "success"
        );
        setBooking((prev) => prev.filter((item) => item.$id !== id));
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

  const activeBookings = booking.filter(
    (rental) =>
      new Date(rental.startDate) <= today &&
      new Date(rental.endDate) >= today
  );

  const upcomingBookings = booking.filter(
    (rental) => new Date(rental.startDate) > today
  );

  const expiredBookings = booking.filter(
    (rental) => new Date(rental.endDate) < today
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-8">User Dashboard</h1>
        <div className="flex flex-col space-y-2">
          {[
            { id: "profile", icon: FaUser, label: "Profile" },
            { id: "active", icon: FaCar, label: "Active Rental" },
            { id: "upcoming", icon: FaCalendarAlt, label: "Upcoming" },
            { id: "history", icon: FaHistory, label: "History" },
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
                  <div>
                    <h2 className="text-2xl font-bold">
                      {userData?.name || "User"}
                    </h2>
                    <p className="text-gray-500">{userData?.email}</p>
                    <p className="text-sm mt-2">
                      Member since{" "}
                      {userData
                        ? format(new Date(userData.$createdAt), "dd MMM yyyy")
                        : "N/A"}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Gold Member
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCar className="text-2xl text-blue-500" />
                    <h3 className="text-lg font-semibold">Total Rentals</h3>
                  </div>
                  <p className="text-3xl font-bold">{booking.length}</p>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaClock className="text-2xl text-green-500" />
                    <h3 className="text-lg font-semibold">Active Rentals</h3>
                  </div>
                  <p className="text-3xl font-bold">{activeBookings.length}</p>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCalendarAlt className="text-2xl text-purple-500" />
                    <h3 className="text-lg font-semibold">Upcoming Rentals</h3>
                  </div>
                  <p className="text-3xl font-bold">{upcomingBookings.length}</p>
                </div>
              </div>

            </div>
          )}

          {activeTab === "active" && (
            <div>
              {activeBookings.length === 0 ? (
                <div className="text-center py-12">
                  <FaPhone className="mx-auto text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-500 text-xl">
                    No Active Booking Found
                  </p>
                </div>
              ) : (
                activeBookings.map((u) => (
                  <div
                    key={u.$id}
                    className="mt-3 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <ActiveRental rental={u} onDelete={handleDeleteBooking} />
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "upcoming" && (
            <div>
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-500 text-xl">
                    No Upcoming Bookings
                  </p>
                </div>
              ) : (
                upcomingBookings.map((u) => (
                  <div
                    key={u.$id}
                    className="mt-3 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <ActiveRental rental={u} onDelete={handleDeleteBooking} />
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="rounded-lg bg-white shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Rental History
              </h2>
              {expiredBookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FaHistory className="mx-auto text-6xl text-gray-300 mb-4" />
                  No rental history found.
                </div>
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">Start Date</th>
                      <th className="px-6 py-3 text-left">End Date</th>
                      <th className="px-6 py-3 text-left">Vehicle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiredBookings.map((rental) => (
                      <tr
                        key={rental.$id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          {format(new Date(rental.startDate), "PP")}
                        </td>
                        <td className="px-6 py-4">
                          {format(new Date(rental.endDate), "PP")}
                        </td>
                        <td className="px-6 py-4">
                          {rental.vehicleName || "Unknown Vehicle"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRentalDashboard;
