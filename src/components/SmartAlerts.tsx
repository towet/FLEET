import { useEffect, useContext } from 'react';
import { ContactContext } from '../App';
import { Bell, AlertTriangle, Zap, Shield, MessageSquare, Settings, Smartphone, Mail } from 'lucide-react';

const SmartAlerts = () => {
  const handleContactClick = useContext(ContactContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Alert System</h1>
          <p className="text-xl text-gray-600">Intelligent notifications for proactive fleet management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900">Instant Notifications That Matter</h2>
            <p className="text-lg text-gray-600">
              Our AI-powered alert system monitors your fleet 24/7 and sends real-time notifications for critical events and potential issues.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Real-Time Alerts</h3>
                  <p className="text-gray-600">Instant notifications for critical events</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Preventive Warnings</h3>
                  <p className="text-gray-600">Early detection of potential issues</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Settings className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Customizable Rules</h3>
                  <p className="text-gray-600">Set your own alert thresholds and conditions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="Smart alerts dashboard"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg p-8 mb-16 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">Alert Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <AlertTriangle className="w-12 h-12 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Safety Alerts</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Speeding violations</li>
                <li>• Harsh braking</li>
                <li>• Unauthorized usage</li>
                <li>• Accident detection</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Bell className="w-12 h-12 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Maintenance Alerts</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Service due reminders</li>
                <li>• Engine diagnostics</li>
                <li>• Battery health</li>
                <li>• Tire pressure warnings</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <MessageSquare className="w-12 h-12 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Operations Alerts</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Fuel level warnings</li>
                <li>• Geofence violations</li>
                <li>• Route deviations</li>
                <li>• Idle time alerts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Notification Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Smartphone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mobile App</h3>
              <p className="text-gray-600 text-sm">Push notifications</p>
            </div>
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">SMS</h3>
              <p className="text-gray-600 text-sm">Text messages</p>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-sm">Detailed reports</p>
            </div>
            <div className="text-center">
              <Bell className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Web Dashboard</h3>
              <p className="text-gray-600 text-sm">Real-time updates</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Stay Informed and In Control</h2>
          <p className="text-lg text-gray-600 mb-8">
            Never miss a critical alert with our smart notification system
          </p>
          <button
            onClick={handleContactClick}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartAlerts;
