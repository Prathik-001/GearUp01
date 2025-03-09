import React, { useState ,li } from "react";
import { FaCar, FaMotorcycle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const VehicleRentalSchedule = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [dropoffDateTime, setDropoffDateTime] = useState(null);
  const [errors, setErrors] = useState({});

  const locations = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!selectedVehicle) newErrors.vehicle = "Please select a vehicle type";
    if (!pickupLocation) newErrors.pickup = "Please select pickup location";
    if (!dropoffLocation) newErrors.dropoff = "Please select dropoff location";
    if (!pickupDateTime) newErrors.pickupTime = "Please select pickup date and time";
    if (!dropoffDateTime) newErrors.dropoffTime = "Please select dropoff date and time";
    if (pickupDateTime && dropoffDateTime && pickupDateTime >= dropoffDateTime) {
      newErrors.dateRange = "Dropoff time must be after pickup time";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 justify-center items-center pt-40" >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Search your next ride</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setSelectedVehicle("car")}
            className={`relative overflow-hidden rounded-xl h-64 transition-all duration-300 ${selectedVehicle === "car" ? "ring-4 ring-blue-500" : "hover:shadow-xl"}`}
            aria-label="Rent a Car"
          >
            <img
              src="https://images.unsplash.com/photo-1550355291-bbee04a92027"
              alt="Luxury Car"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity hover:bg-opacity-50">
              <div className="text-center">
                <FaCar className="text-white text-4xl mx-auto mb-2" />
                <h2 className="text-white text-xl font-semibold">Rent a Car</h2>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedVehicle("bike")}
            className={`relative overflow-hidden rounded-xl h-64 transition-all duration-300 ${selectedVehicle === "bike" ? "ring-4 ring-blue-500" : "hover:shadow-xl"}`}
            aria-label="Rent a Bike"
          >
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39"
              alt="Sport Motorcycle"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity hover:bg-opacity-50">
              <div className="text-center">
                <FaMotorcycle className="text-white text-4xl mx-auto mb-2" />
                <h2 className="text-white text-xl font-semibold">Rent a Bike</h2>
              </div>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <select
                id="pickup"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Pickup Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.pickup && <p className="mt-1 text-sm text-red-600">{errors.pickup}</p>}
            </div>

            <div>
              <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">Dropoff Location</label>
              <select
                id="dropoff"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Dropoff Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.dropoff && <p className="mt-1 text-sm text-red-600">{errors.dropoff}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ">Pickup Date & Time</label>
              <DatePicker
                selected={pickupDateTime}
                onChange={setPickupDateTime}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-5"
                placeholderText="Select date and time"
                minDate={new Date()}
              />
              {errors.pickupTime && <p className="mt-1 text-sm text-red-600">{errors.pickupTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dropoff Date & Time</label>
              <DatePicker
                selected={dropoffDateTime}
                onChange={setDropoffDateTime}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-5"
                placeholderText="Select date and time"
                minDate={pickupDateTime || new Date()}
              />
              {errors.dropoffTime && <p className="mt-1 text-sm text-red-600">{errors.dropoffTime}</p>}
            </div>
          </div>

          {errors.dateRange && (
            <p className="text-sm text-red-600">{errors.dateRange}</p>
          )}

          <Link to={"card"}>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
            Schedule Rental
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default VehicleRentalSchedule;
