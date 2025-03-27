import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaGasPump, FaBolt, FaLeaf } from "react-icons/fa";
import VehicleCard from "./CarCard";
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await service.getVehiclesData();
  //       setVehicles(data.documents || []);
  //       setFilteredVehicles(data.documents || []);
  //     } catch (error) {
  //       console.error("Error fetching vehicles:", error);
  //     } finally {
  //       console.log("Fetch completed!!");
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(()=>{
    service.getVehiclesData().then((data) => {setVehicles(data.documents);
      console.log(data.documents);
    }).catch((err)=> console.log(err));
  },[])

  useEffect(() => {
    let filtered = vehicles;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by vehicle type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((vehicle) => selectedTypes.includes(vehicle.type));
    }

    // Filter by fuel type
    if (selectedFuel.length > 0) {
      filtered = filtered.filter((vehicle) => selectedFuel.includes(vehicle.fuelType));
    }

    // Filter by mileage (assuming `range` is the mileage field)
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
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="w-full px-4 py-8">
        <button
          className="lg:hidden mb-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Filters" : "Show Filters"}
        </button>

        <div className="flex gap-4 w-full">
          {/* Sidebar */}
          <div className={`w-1/4 bg-white p-6 rounded-lg shadow-md ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
            {/* Search Bar */}
            <div className="mb-6 relative flex gap-2">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              {searchTerm && (
                <FaTimes className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setSearchTerm("")} />
              )}
            </div>

            {/* Vehicle Type */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Type</h3>
              <div className="space-y-2">
                {vehicleTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="vehicleType"
                      checked={selectedTypes.includes(type)}
                      onChange={() => setSelectedTypes([type])}
                      className="form-radio text-blue-500"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel Type */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Fuel Type</h3>
              <div className="space-y-2">
                {fuelTypes.map((type) => (
                  <label key={type.name} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="fuelType"
                      checked={selectedFuel.includes(type.name)}
                      onChange={() => setSelectedFuel([type.name])}
                      className="form-radio text-blue-500"
                    />
                    <span className="flex items-center gap-2">{type.icon} {type.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mileage */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Mileage</h3>
              <select
                value={selectedMileage}
                onChange={(e) => setSelectedMileage(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select mileage range</option>
                {mileageRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button onClick={clearFilters} className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Clear All Filters
            </button>
          </div>

          {/* Vehicles List */}
          <div className=" bg-white px-4 py-5 w-9/12">
            {vehicles?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No vehicles found matching your criteria
              </div>
            ) : (
              <div className="w-full grid grid-cols-4 md:grid-cols-2 gap-2">
              {
              vehicles.map((vehicle) => (
                <div key={Math.random()*20} className=" rounded-lg  overflow-hidden transition-transform hover:scale-105">
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCar;
