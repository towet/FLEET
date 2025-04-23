import React, { useEffect } from 'react';
import { Map, Navigation, Clock, Activity, BarChart2, Radio } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

// Declare the global window type
declare global {
  interface Window {
    openQuotePopup?: () => void;
  }
}

interface LiveTrackingProps {}

const LiveTracking: React.FC<LiveTrackingProps> = () => {
  const navigate = useNavigate();
  
  // Get the setIsQuoteOpen function from the parent component
  const openQuotePopup = () => {
    // Using window object to access the parent component's state
    if (window.openQuotePopup) {
      window.openQuotePopup();
    } else {
      // Fallback to contact page if parent function isn't available
      navigate('/contact');
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Vehicle Tracking</h1>
          <p className="text-xl text-gray-600">Real-time fleet visibility and monitoring solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://ideogram.ai/assets/image/lossless/response/8bqYyiZ0TDe86UW86EcGcg"
              alt="Live tracking dashboard"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Advanced Real-Time Monitoring</h2>
            <p className="text-lg text-gray-600">
              Track your entire fleet in real-time with our state-of-the-art GPS tracking system. Get instant updates on location, speed, and vehicle status.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Radio className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Live GPS Updates</h3>
                  <p className="text-gray-600">Real-time location tracking with 10-second updates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Activity className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Vehicle Status</h3>
                  <p className="text-gray-600">Monitor engine status, speed, and maintenance alerts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BarChart2 className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Performance Analytics</h3>
                  <p className="text-gray-600">Detailed reports on vehicle usage and efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tracking Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-orange-50 rounded-lg">
              <Map className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Interactive Maps</h3>
              <p className="text-gray-600">View all vehicles on an interactive map with detailed filters</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <Navigation className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Route History</h3>
              <p className="text-gray-600">Access detailed trip history and route playback</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <Clock className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">24/7 Monitoring</h3>
              <p className="text-gray-600">Round-the-clock tracking with instant notifications</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500 text-white rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-6">Experience the power of real-time fleet tracking</p>
            <button
              onClick={openQuotePopup}
              className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-sm opacity-90">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10s</div>
              <div className="text-sm opacity-90">Update Frequency</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Active Fleets</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support Available</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Tracking Your Fleet Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get complete visibility of your entire fleet with our advanced tracking solution
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Request Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
