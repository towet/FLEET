import React, { useEffect } from 'react';
import { useContext } from 'react';
import { ContactContext } from '../App';
import {
  Droplet,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  FileText,
  Target,
  BarChart,
  Bell,
  AlertCircle
} from 'lucide-react';

const FuelTracking = () => {
  const handleContactClick = useContext(ContactContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const features = [
    {
      icon: Droplet,
      title: "Fuel System Monitoring",
      description: "Real-time monitoring of fuel system components.",
      image: "https://erautocare.com/wp-content/uploads/2019/03/signs-of-a-clogged-fuel-filter.jpeg"
    },
    {
      icon: TrendingUp,
      title: "Track Consumption",
      description: "Monitor fuel usage patterns and trends.",
      image: "https://vivitrack.in/wp-content/uploads/2021/03/Fuel-Consumption-Control.jpg"
    },
    {
      icon: AlertTriangle,
      title: "Prevent Fuel Loss",
      description: "Detect and prevent fuel theft and leakage.",
      image: "https://images.squarespace-cdn.com/content/v1/5ea7eb25f24c673cc70f6f68/1618359058834-RTATET9HNNZXRK9CKK2Z/Header-Image-03.jpg"
    },
    {
      icon: Target,
      title: "Set Targets",
      description: "Monitor fuel consumption targets.",
      image: "https://images.hgmsites.net/sml/fuel-gauge_100382139_s.jpg"
    },
    {
      icon: UserCheck,
      title: "Driver Behavior",
      description: "Monitor driving patterns for efficiency.",
      image: "https://loginextsolutions.com/blog/wp-content/uploads/2017/12/Driver-Behavior-Monitoring-System.jpg"
    },
    {
      icon: FileText,
      title: "Compliance",
      description: "Ensure fuel usage policy compliance.",
      image: "https://www.eqs.com/assets/2021/03/EQS-Blog_Compliance-Management-1024x576.jpg"
    }
  ];

  const stats = [
    {
      value: "25%",
      label: "Cost Reduction",
      description: "Average savings"
    },
    {
      value: "24/7",
      label: "Monitoring",
      description: "Real-time tracking"
    },
    {
      value: "98%",
      label: "Detection",
      description: "Fuel anomalies"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://media.licdn.com/dms/image/v2/D4E12AQGcIeKOmqta2g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1675865129823?e=2147483647&v=beta&t=MK6CP_b3KNLrcMC5q0vxIH0onxx1qBk8EagKu5ZXdFY"
            alt="Fuel Monitoring Dashboard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-amber-500/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Smart Fuel Management
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Optimize fuel consumption and reduce costs.
              </p>
              <button
                onClick={handleContactClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <BarChart className="w-6 h-6 text-orange-500 mb-2" />
                  <div className="font-semibold text-sm">Analysis</div>
                  <p className="text-xs text-gray-300">Real-time data</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <AlertCircle className="w-6 h-6 text-orange-500 mb-2" />
                  <div className="font-semibold text-sm">Alerts</div>
                  <p className="text-xs text-gray-300">Instant updates</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl p-1">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src="https://ideogram.ai/assets/image/lossless/response/n2RqOaIIQu2HFTUZaaRu-g"
                      alt="Fuel Report Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Alert Notification */}
              <div className="absolute -bottom-4 -right-4">
                <div className="bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-semibold text-sm">Fuel Alert</div>
                      <div className="text-xs text-gray-600">Low level detected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl hover:from-orange-600 hover:to-amber-500 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-orange-600 mb-1 group-hover:text-white">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1 group-hover:text-white">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-white/90">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Fuel Management Features</h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Monitor and optimize your fleet's fuel consumption.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    {React.createElement(feature.icon, { 
                      className: 'w-6 h-6'
                    })}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Dashboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Fuel Analysis</h2>
              <p className="text-sm text-gray-600 mb-6">
                Comprehensive analytics for optimized management.
              </p>
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D12AQEEUMijykq1cw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1708942146924?e=2147483647&v=beta&t=ZL-AlOxle8vb4SUuMGeBuddvU3HmROWqDYjMpOnttos"
                alt="Fuel Analysis Dashboard"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-3">Mileage Analysis</h3>
                <img 
                  src="https://ideogram.ai/assets/image/lossless/response/fiSrJYzUT7apjqKElJ1sjA"
                  alt="Fuel Mileage Chart"
                  className="w-full rounded-md"
                />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-3">Alert System</h3>
                <img 
                  src="https://www.evanshalshaw.com/-/media/evanshalshaw/blog/know-your-fuel-levels-how-low-is-too-low/2022-update/fuel-light-1280x720px.ashx"
                  alt="Fuel Alert System"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FuelTracking;
