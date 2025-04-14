import React, { useEffect, useState } from 'react';
import { CheckCircle, Car, Calendar, Clock } from 'lucide-react';

function App() {
  const [showCheck, setShowCheck] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Simulate payment completion
  useEffect(() => {
    setTimeout(() => setShowCheck(true), 500);
    setTimeout(() => setShowDetails(true), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Success Animation */}
        <div className="flex justify-center mb-8">
          <div className={`transform transition-all duration-500 ${
            showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}>
            <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your vehicle rental has been confirmed.</p>
        </div>

        {/* Rental Details */}
        <div className={`space-y-4 transition-all duration-500 ${
          showDetails ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          {/* Vehicle Info */}
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Car className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-semibold text-gray-800">Tesla Model Y</p>
            </div>
          </div>

          {/* Rental Period */}
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Rental Period</p>
              <p className="font-semibold text-gray-800">Mar 15 - Mar 18, 2024</p>
            </div>
          </div>

          {/* Pickup Time */}
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Pickup Time</p>
              <p className="font-semibold text-gray-800">10:00 AM</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-gray-800">$249.99</span>
            </div>
          </div>

          {/* Return to Home Button */}
          <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;