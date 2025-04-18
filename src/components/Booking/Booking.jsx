import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Car, Fuel, CreditCard, IndianRupee, Check, Receipt } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../../appright/conf.js';
import PaymentRecipt from './PaymentRecipt.jsx';

const locations = [
  'Mumbai, Maharashtra',
  'Delhi, NCR',
  'Bangalore, Karnataka',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat'
];

const Booking = () => {
  const locationRouter = useLocation();
  const selectedBike = locationRouter.state?.bike;
  const selectedCar=locationRouter.state?.car;
  const selectedVehicle = selectedCar || selectedBike;
 // Vehicle passed via router
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId)
  const vehicleId= selectedVehicle?.$id;

  const [vehicleData, setVehicleData] = useState({
    vehicleName: '',
    vehicleType: '',
    fuelType: '',
    rentPrice: 0,
  });

  const [bookingData, setBookingData] = useState({
    fromDate: '',
    toDate: '',
    location: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);


  useEffect(() => {
    if (selectedVehicle) {
      setVehicleData({
        vehicleName: selectedVehicle.vehicleName,
        vehicleType: selectedVehicle.vehicleType,
        fuelType: selectedVehicle.fuelType,
        rentPrice: selectedVehicle.rentPrice,
      });
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (bookingData.fromDate && bookingData.toDate && vehicleData.rentPrice) {
      const start = new Date(bookingData.fromDate);
      const end = new Date(bookingData.toDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalPrice(days * vehicleData.rentPrice);
      } else {
        setTotalPrice(0);
      }
    }
  }, [bookingData.fromDate, bookingData.toDate, vehicleData.rentPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setBookingData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fromDate, toDate, location, paymentMethod, cardNumber, expiryMonth, expiryYear } = bookingData;

    if (!fromDate || !toDate || !location || !paymentMethod || !cardNumber || !expiryMonth || !expiryYear) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await service.bookingData(
        vehicleData.vehicleName,
        vehicleData.vehicleType,
        vehicleData.fuelType,
        vehicleData.rentPrice,
        totalPrice,
        fromDate,
        toDate,
        location,
        vehicleId,
        cardNumber,
        expiryMonth,
        expiryYear,
        "pending",
        userId
      );

      if (response) {
        console.log("Booking successful", response);
        setTimeout(() => {
            navigate("/receipt", {
              state: {
                vehicleName: vehicleData.vehicleName,
                fromDate: bookingData.fromDate,
                toDate: bookingData.toDate,
                location: bookingData.location,
                totalAmount: totalPrice,
              },
            });
          }, 500);
        console.log("Booking successful", response);
      }
    } catch (error) {
      console.error("Booking error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8 bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay'
      }}>
      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline font-medium">← Back</button>
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center"> Booking</h1>

        {/* Selected Vehicle Display */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Selected Vehicle</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Car className="text-blue-600" size={24} />
              <div>
                <p className="font-medium text-gray-900">{vehicleData.vehicleName}</p>
                <p className="text-sm text-gray-600">{vehicleData.vehicleType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Fuel className="text-blue-600" size={24} />
              <div>
                <p className="font-medium text-gray-900">Fuel Type</p>
                <p className="text-sm text-gray-600">{vehicleData.fuelType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IndianRupee className="text-blue-600" size={24} />
              <div>
                <p className="font-medium text-gray-900">Daily Rate</p>
                <p className="text-sm text-gray-600">₹{vehicleData.rentPrice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input
                    type="date"
                    name="fromDate"
                    value={bookingData.fromDate}
                    min={new Date().toLocaleDateString('en-CA')} // ✅ correct for local timezone
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-3"
                    required
                />

            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input
                type="date"
                name="toDate"
                value={bookingData.toDate}
                min={bookingData.fromDate || new Date().toISOString().split("T")[0]} // ✅ prevent going before fromDate
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3"
                required
                />
            </div>
        </div>

          {/* Location Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
            <select name="location" value={bookingData.location}
              onChange={handleInputChange} className="w-full border rounded-lg p-3" required>
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="paymentMethod"
                  value={bookingData.paymentMethod}
                  onChange={handleInputChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="cash">Cash on Spot</option>
                </select>
              </div>
            </div>

            {(bookingData.paymentMethod === 'credit' || bookingData.paymentMethod === 'debit') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={bookingData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={bookingData.paymentMethod !== 'cash'}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                    <input
                      type="text"
                      name="expiryMonth"
                      maxLength={2}
                      value={bookingData.expiryMonth}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                        if (parseInt(value) <= 12 || value === '') {
                          handleInputChange(e);
                        }
                      }}
                      placeholder="MM"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={bookingData.paymentMethod !== 'cash'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      name="expiryYear"
                      value={bookingData.expiryYear}
                      maxLength={4}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                        handleInputChange(e);
                      }}
                      placeholder="YY"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={bookingData.paymentMethod !== 'cash'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={bookingData.cvv}
                      maxLength={3}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                        handleInputChange(e);
                      }}
                      placeholder="XXX"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={bookingData.paymentMethod !== 'cash'}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Total Price */}
          {totalPrice > 0 && (
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-2xl font-bold text-blue-900 text-center">
                Total Price: ₹{totalPrice.toLocaleString()}
              </p>
              <p className="text-center text-sm text-blue-600 mt-1">
                for {Math.ceil((new Date(bookingData.toDate).getTime() - new Date(bookingData.fromDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          )}

          <button type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl text-center shadow-xl">
              <Check className="text-green-600 mb-4 mx-auto" size={48} />
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="mb-4 text-gray-600">
                {vehicleData.vehicleName} booked from {bookingData.fromDate} to {bookingData.toDate}
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                onClick={() => setShowConfirmation(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
