import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaGasPump, FaBolt, FaLeaf } from "react-icons/fa";
import VehicleCard from "./BikeCard";
import service from "../../appright/conf";

const ViewAllCar = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [selectedMileage, setSelectedMileage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const vehicleTypes = ["Sedan", "SUV", "Hatchback", "Luxury", "Convertible"];
  const fuelTypes = [
    { name: "Petrol", icon: <FaGasPump /> },
    { name: "Diesel", icon: <FaGasPump /> },
    { name: "Electric", icon: <FaBolt /> },
    { name: "Hybrid", icon: <FaLeaf /> },
  ];
  const mileageRanges = [
    "0-5,000 miles",
    "5,000-10,000 miles",
    "10,000-20,000 miles",
    "20,000+ miles",
  ];

  useEffect(() => {
    service.getAllBikesData()
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = vehicles;

    if (searchTerm.trim()) {
      filtered = filtered.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((vehicle) => selectedTypes.includes(vehicle.type));
    }

    if (selectedFuel.length > 0) {
      filtered = filtered.filter((vehicle) => selectedFuel.includes(vehicle.fuelType));
    }

    if (selectedMileage) {
      const [min, max] = selectedMileage.replace(/[^0-9-]/g, "").split("-").map(Number);
      filtered = filtered.filter((vehicle) => {
        const mileage = parseInt(vehicle.range, 10);
        return max ? mileage >= min && mileage <= max : mileage >= min;
      });
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, selectedTypes, selectedFuel, selectedMileage, vehicles]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTypes([]);
    setSelectedFuel([]);
    setSelectedMileage("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen bg-white w-full px-2 py-2">
      <button
        className="lg:hidden mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Filters" : "Show Filters"}
      </button>

      {/* Sidebar */}
      <div className={`w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-4 rounded-lg shadow-md ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        {/* Search Bar */}
        <div className="relative flex items-center gap-2 mb-4">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && <FaTimes className="absolute right-3 cursor-pointer text-gray-400" onClick={() => setSearchTerm("")} />}
        </div>

        {/* Vehicle Type */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Vehicle Type</h3>
          {vehicleTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="vehicleType"
                checked={selectedTypes.includes(type)}
                onChange={() => setSelectedTypes([type])}
                className="form-radio text-blue-500"
              />
              {type}
            </label>
          ))}
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Fuel Type</h3>
          {fuelTypes.map((type) => (
            <label key={type.name} className="flex items-center gap-2">
              <input
                type="radio"
                name="fuelType"
                checked={selectedFuel.includes(type.name)}
                onChange={() => setSelectedFuel([type.name])}
                className="form-radio text-blue-500"
              />
              {type.icon} {type.name}
            </label>
          ))}
        </div>

        {/* Clear Filters */}
        <button onClick={clearFilters} className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Clear All Filters
        </button>
      </div>

      {/* Vehicles List */}
      <div className=" px-4 py-5 bg-gray-200 w-4/5  rounded-lg ">
            {vehicles?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No vehicles found matching your criteria
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
              {
              vehicles.map((vehicle) => (
                <div key={Math.random()*20} className=" rounded-lg  gap-1 overflow-hidden transition-transform hover:scale-95">
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
  );
};

export default ViewAllCar;
