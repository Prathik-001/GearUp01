import React, { useState } from "react";
import { FaCar, FaGasPump, FaRoad, FaStar,FaMotorcycle } from "react-icons/fa";
import { BsLightningChargeFill, BsFuelPump } from "react-icons/bs";

const VehicleCard = () => {
  const [imageError, setImageError] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: "Tesla",
      image: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20210603020343_Honda_CRF300L.jpg&w=700&c=1",
      range: "520",
      type: "Off-road",
      fuelType: "Petrol",
      luxuryLevel: 1,
    },
    {
      id: 2,
      name: "BMW X7 xDrive",
      image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
      range: "750",
      type: "SUV",
      fuelType: "Diesel",
      luxuryLevel: 4,
    },
    {
      id: 3,
      name: "Mercedes-Benz S-Class",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      range: "680",
      type: "Sedan",
      fuelType: "Hybrid",
      luxuryLevel: 5,
    },
    {
      id: 4 ,
      name: "BMW X7 xDrive",
      image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
      range: "750",
      type: "SUV",
      fuelType: "Petrol",
      luxuryLevel: 4,
    },

  ];

  const getFuelTypeIcon = (fuelType) => {
    switch (fuelType) {
      case "Electric":
        return (
          <div className="flex items-center gap-1">
            <BsLightningChargeFill className="text-blue-500" />
            <span className="text-blue-500 text-sm">{fuelType}</span>
          </div>
        );
        case "Petrol":
          return (
            <div className="flex items-center gap-1">
              <BsFuelPump className="text-green-500" />
              <span className="text-green-500 text-sm">{fuelType}</span>
            </div>
          );
      default:
        return (
          <div className="flex items-center gap-1">
            <FaGasPump className="text-red-500" />
            <span className="text-red-500 text-sm">{fuelType}</span>
          </div>
        );
    }
  };

  const getLuxuryStars = (level) => {
    return [...Array(level)].map((_, index) => (
      <FaStar key={index} className="text-yellow-400" />
    ));
  };

  const getTypeColor = (type) => {
    switch (type) {
        case "Sedan":
            return "bg-blue-100 text-blue-800";
        case "SUV":
            return "bg-green-100 text-green-800";
        case "Convertible":
            return "bg-purple-100 text-purple-800";
        case "Muv":
            return "bg-red-100 text-red-800";
        case "Off-road":
            return "bg-gray-100 text-gray-800";;
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = "https://images.unsplash.com/photo-1511919884226-fd3cad34687c";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            role="article"
            aria-label={`${vehicle.name} rental card`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
                loading="lazy"
              />
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
                {vehicle.name}
              </h2>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(vehicle.type)}`}>
                  <FaMotorcycle className="inline mr-1" />
                  {vehicle.type}
                </span>
                {getFuelTypeIcon(vehicle.fuelType)}
              </div>

              <div className="flex items-center space-x-1">
                <FaRoad className="text-gray-500" />
                <span className="text-gray-700">
                  {vehicle.range} km range
                </span>
              </div>

              <div className="flex items-center space-x-1">
                {getLuxuryStars(vehicle.luxuryLevel)}
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={() => console.log(`Rent ${vehicle.name}`)}
              >
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCard;