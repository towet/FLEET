import { useEffect } from 'react';
import { useContext } from 'react';
import { ContactContext } from '../App';
import { Gauge, AlertTriangle, TrendingUp, Award, Clock, Map, BarChart2, Shield } from 'lucide-react';

const SpeedMonitoring = () => {
  const handleContactClick = useContext(ContactContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Speed Monitoring</h1>
          <p className="text-xl text-gray-600">Real-time speed tracking and driver behavior analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://cdn.britannica.com/15/238815-050-09D8544E/speedometer-dashboard-car.jpg"
              alt="Speed monitoring dashboard"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Intelligent Speed Management</h2>
            <p className="text-lg text-gray-600">
              Monitor and manage your fleet's speed in real-time with our AI-powered system that ensures safety and compliance.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Gauge className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Real-Time Monitoring</h3>
                  <p className="text-gray-600">Live speed tracking with instant alerts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Map className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Zone-Based Limits</h3>
                  <p className="text-gray-600">Automatic speed limit adjustment by area</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BarChart2 className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Performance Analytics</h3>
                  <p className="text-gray-600">Detailed speed pattern analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Instant Alerts</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Speed limit violations</li>
                <li>• Harsh acceleration</li>
                <li>• Sudden braking</li>
                <li>• Custom thresholds</li>
              </ul>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <TrendingUp className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Speed Analytics</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Average speed tracking</li>
                <li>• Speed pattern analysis</li>
                <li>• Route optimization</li>
                <li>• Historical data</li>
              </ul>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <Award className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Driver Scoring</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Safety ratings</li>
                <li>• Performance metrics</li>
                <li>• Behavior analysis</li>
                <li>• Reward system</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-6">Real-Time Speed Monitoring</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8" />
                <div>
                  <div className="font-semibold">24/7 Monitoring</div>
                  <div className="text-white/80">Continuous speed tracking</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="w-8 h-8" />
                <div>
                  <div className="font-semibold">Safety First</div>
                  <div className="text-white/80">Proactive speed management</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Map className="w-8 h-8" />
                <div>
                  <div className="font-semibold">Zone Management</div>
                  <div className="text-white/80">Location-based speed limits</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">30%</div>
                <div className="text-gray-600">Reduction in speeding incidents</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">25%</div>
                <div className="text-gray-600">Lower fuel consumption</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">40%</div>
                <div className="text-gray-600">Fewer accidents</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">20%</div>
                <div className="text-gray-600">Insurance cost savings</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Enhance Fleet Safety?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start monitoring your fleet's speed and improve safety today
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

export default SpeedMonitoring;
