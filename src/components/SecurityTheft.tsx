import {
  Shield,
  Lock,
  Bell,
  AlertTriangle,
  Eye,
  Key
} from 'lucide-react';

const SecurityTheft = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security & Theft Prevention</h1>
          <p className="text-xl text-gray-600">Advanced security features to protect your fleet assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://ideogram.ai/assets/image/lossless/response/pG52FNs4Re-O852nGQDbaA"
              alt="Security system dashboard"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Security System</h2>
            <p className="text-lg text-gray-600">
              Protect your fleet with our advanced security system that provides real-time monitoring,
              instant alerts, and proactive theft prevention measures.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">24/7 Protection</h3>
                  <p className="text-gray-600">Round-the-clock security monitoring and alerts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Anti-Theft System</h3>
                  <p className="text-gray-600">Advanced immobilization and tracking features</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Bell className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Alerts</h3>
                  <p className="text-gray-600">Real-time notifications for security breaches</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Theft Prevention</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Engine immobilization</li>
                <li>• Remote lockdown</li>
                <li>• Unauthorized movement detection</li>
                <li>• Geofence integration</li>
              </ul>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <Eye className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Monitoring System</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Real-time surveillance</li>
                <li>• Activity logging</li>
                <li>• Access control</li>
                <li>• Video monitoring</li>
              </ul>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <Key className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Access Control</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Digital key management</li>
                <li>• Driver authentication</li>
                <li>• Role-based access</li>
                <li>• Usage logs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-6">Real-Time Security Monitoring</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Shield className="w-8 h-8" />
                <div>
                  <div className="font-semibold">24/7 Protection</div>
                  <div className="text-white/80">Continuous security monitoring</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="w-8 h-8" />
                <div>
                  <div className="font-semibold">Instant Alerts</div>
                  <div className="text-white/80">Real-time security notifications</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Lock className="w-8 h-8" />
                <div>
                  <div className="font-semibold">Remote Control</div>
                  <div className="text-white/80">Instant vehicle lockdown</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Security Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
                <div className="text-gray-600">Theft Prevention Rate</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                <div className="text-gray-600">Fleet Coverage</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
                <div className="text-gray-600">Active Monitoring</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">60s</div>
                <div className="text-gray-600">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Protect Your Fleet Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Implement advanced security measures and protect your valuable assets
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTheft;
