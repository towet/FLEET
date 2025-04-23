import React from 'react';
import { MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

const GeoFencing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Geo-Fencing Solutions</h1>
          <p className="text-xl text-gray-600">Set virtual boundaries and get instant alerts for your fleet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://www.groundtruth.com/wp-content/uploads/2021/02/Geofencing.jpg"
              alt="Geo-fencing illustration"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Real-Time Zone Management</h2>
            <p className="text-lg text-gray-600">
              Create custom geo-fences around important locations and receive instant notifications when vehicles enter or exit these zones.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Custom Zone Creation</h3>
                  <p className="text-gray-600">Define multiple zones with different alert settings</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Notifications</h3>
                  <p className="text-gray-600">Get alerts via SMS, email, or mobile app</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Historical Data</h3>
                  <p className="text-gray-600">Track and analyze zone entry/exit patterns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-orange-50 rounded-lg">
              <MapPin className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Multiple Zones</h3>
              <p className="text-gray-600">Create unlimited geo-fences for different operational areas</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Alerts</h3>
              <p className="text-gray-600">Customizable notifications for different events and scenarios</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <CheckCircle2 className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Route Compliance</h3>
              <p className="text-gray-600">Ensure vehicles stay on designated routes and areas</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today to learn more about our geo-fencing solutions
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoFencing;