import { useState, useEffect } from "react";
import { BsThreeDotsVertical, BsPerson, BsCarFront, BsCalendarCheck, BsBarChart, BsSun, BsMoon } from "react-icons/bs";
import { Line, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const mockData = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", registrationDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1987654321", registrationDate: "2024-01-16" }
  ],
  vehicles: [
    { id: 1, model: "Tesla Model 3", year: 2024, category: "Electric", dailyRate: 150, status: "Available", image: "https://images.unsplash.com/photo-1684162440652-20574f2a5b82" },
    { id: 2, model: "BMW X5", year: 2023, category: "SUV", dailyRate: 200, status: "Rented", image: "https://images.unsplash.com/photo-1683926131296-01430bb9dd3d" }
  ],
  bookings: [
    { id: 1, userId: 1, vehicleId: 1, startDate: "2024-01-20", endDate: "2024-01-25", totalCost: 750, status: "Confirmed" },
    { id: 2, userId: 2, vehicleId: 2, startDate: "2024-01-22", endDate: "2024-01-24", totalCost: 400, status: "Pending" }
  ]
};

const chartData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 }
];

const AdminPanel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-indigo-600 text-white transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">Vehicle Rental Admin</h1>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full flex items-center p-3 rounded-lg ${activeSection === "dashboard" ? "bg-indigo-700" : "hover:bg-indigo-700"}`}
            >
              <BsBarChart className="mr-3" /> Dashboard
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`w-full flex items-center p-3 rounded-lg ${activeSection === "users" ? "bg-indigo-700" : "hover:bg-indigo-700"}`}
            >
              <BsPerson className="mr-3" /> Users
            </button>
            <button
              onClick={() => setActiveSection("vehicles")}
              className={`w-full flex items-center p-3 rounded-lg ${activeSection === "vehicles" ? "bg-indigo-700" : "hover:bg-indigo-700"}`}
            >
              <BsCarFront className="mr-3" /> Vehicles
            </button>
            <button
              onClick={() => setActiveSection("bookings")}
              className={`w-full flex items-center p-3 rounded-lg ${activeSection === "bookings" ? "bg-indigo-700" : "hover:bg-indigo-700"}`}
            >
              <BsCalendarCheck className="mr-3" /> Bookings
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="flex justify-between items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <BsThreeDotsVertical />
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <BsSun /> : <BsMoon />}
            </button>
          </div>
        </header>

        {/* Content Sections */}
        <div className="p-6">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{mockData.users.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Total Vehicles</h3>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{mockData.vehicles.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {mockData.bookings.filter(b => b.status === "Confirmed").length}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${mockData.bookings.reduce((acc, curr) => acc + curr.totalCost, 0)}
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Revenue Trend</h3>
                <div className="h-64">
                  <Line
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
                  </Line>
                </div>
              </div>
            </div>
          )}

          {activeSection === "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {mockData.users.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4">{user.id}</td>
                          <td className="px-6 py-4">{user.name}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.phone}</td>
                          <td className="px-6 py-4">{user.registrationDate}</td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">View</button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Suspend</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === "vehicles" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Vehicles Management</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add New Vehicle</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockData.vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img src={vehicle.image} alt={vehicle.model} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{vehicle.model}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">Year: {vehicle.year}</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">Category: {vehicle.category}</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">Daily Rate: ${vehicle.dailyRate}</p>
                        <p className={`mb-4 ${vehicle.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                          {vehicle.status}
                        </p>
                        <div className="flex justify-end space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "bookings" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Bookings Management</h2>
                <div className="mb-6 flex gap-4">
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="End Date"
                  />
                  <select className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:border-gray-600">
                    <option value="">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Booking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Cost</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {mockData.bookings.map(booking => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4">{booking.id}</td>
                          <td className="px-6 py-4">{mockData.users.find(u => u.id === booking.userId)?.name}</td>
                          <td className="px-6 py-4">{mockData.vehicles.find(v => v.id === booking.vehicleId)?.model}</td>
                          <td className="px-6 py-4">{booking.startDate} - {booking.endDate}</td>
                          <td className="px-6 py-4">${booking.totalCost}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
