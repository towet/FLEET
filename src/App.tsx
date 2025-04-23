import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import FuelTracking from './components/FuelTracking';
import SpeedingAlarm from './components/SpeedingAlarm';
import SecurityTheft from './components/SecurityTheft';
import GeoFencing from './components/GeoFencing';
import SmartAlerts from './components/SmartAlerts';
import SpeedMonitoring from './components/SpeedMonitoring';
import LiveTracking from './components/LiveTracking';
import About from './components/About';
import ContactUs from './components/ContactUs';
import KnowledgeAdmin from './components/KnowledgeAdmin';
import { extractWebsiteContent, extractStaticContent } from './lib/ai/websiteExtractor';
import {
  Shield,
  TrendingUp,
  Target,
  ArrowRight,
  Droplet,
  AlertTriangle,
  MapPin,
  Bell,
  Smartphone,
  Download,
  Phone,
  Mail,
  Clock,
  Settings
} from 'lucide-react';

import heroImage from './assets/hero.png';
import WhatsAppButton from './components/WhatsAppButton';
import deezayLogo from './assets/Defts Final Logo\' PNG-01.png';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Simple authentication using password
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in a real app, use proper authentication
    if (password === 'deezayadmin') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      alert('Invalid password');
    }
  };
  
  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

function App() {
  const navigate = useNavigate();
  useScrollAnimation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    fleetSize: '',
    service: '',
    message: ''
  });

  // Handle smooth scrolling and navigation
  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]); // Add navigate as dependency to trigger scroll on route change

  // Initialize AI knowledge base with website content and static information
  useEffect(() => {
    const initializeKnowledgeBase = async () => {
      try {
        console.log('Initializing knowledge base with static content...');
        // First add static content (will always work)
        await extractStaticContent();
        
        // Then try to extract website content (only works when DOM is loaded)
        console.log('Attempting to extract website content...');
        await extractWebsiteContent();
        
        console.log('Knowledge base initialization complete!');
      } catch (error) {
        console.error('Error initializing knowledge base:', error);
      }
    };
    
    initializeKnowledgeBase();
  }, []);

  const MainContent = () => (
    <>
      {/* Hero Section */}
      <header className="pt-28 pb-24 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left reveal">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                Deezay Ecofuel Tracking solutions
                <span className="text-orange-500 block">For Modern Fleets</span>
              </h1>
              <p className="text-xl text-gray-600 reveal-from-left delay-200">
                We guarantee real-time fleet visibility to owners & fleet managers. Save up to 10% on fuel costs with our advanced tracking and monitoring solutions. Join thousands of companies already optimizing their operations with our proven technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start stagger">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 
                           transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  Get Quote
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => window.open('https://www.gps-server.net/gps-server-mobile', '_blank')}
                  className="px-8 py-4 bg-transparent text-orange-500 rounded-xl font-semibold
                           border-2 border-orange-500 hover:bg-orange-50 transition-all duration-300 flex items-center gap-3 group
                           shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <Smartphone className="w-6 h-6" />
                    <span>Download App</span>
                    <Download className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Real-time Monitor</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Shield className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Tamper Detect</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Geo-fence</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Bell className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Mobile Access</span>
                </div>
              </div>
            </div>
            <div className="relative reveal">
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="Fuel Tracking Solution"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50 reveal-scale">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Solutions</h2>
            <p className="text-gray-600 text-lg">
              Comprehensive fleet monitoring and fuel management solutions to optimize your operations and enhance security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplet className="w-8 h-8" />,
                title: "Real-Time Fuel Tracking",
                description: "Monitor fuel levels and consumption in real-time. Get instant updates on fuel usage patterns and efficiency metrics.",
                image: "https://ideogram.ai/assets/image/lossless/response/06Oful4XS-K8oRsUI6gUaQ",
                link: "/fuel-tracking"
              },
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: "Speed Monitoring",
                description: "Get instant alerts when your vehicles exceed speed limits. Monitor driver behavior and ensure safety.",
                image: "https://cdn.britannica.com/15/238815-050-09D8544E/speedometer-dashboard-car.jpg",
                link: "/speeding-alarm"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Security & Theft Prevention",
                description: "Advanced security features to protect your fleet from theft and unauthorized use.",
                image: "https://ideogram.ai/assets/image/lossless/response/pG52FNs4Re-O852nGQDbaA",
                link: "/security-theft"
              },
              {
                icon: <Bell className="w-8 h-8" />,
                title: "Smart Alerts",
                description: "Intelligent notification system for proactive fleet management and monitoring.",
                image: "https://www.ncuindia.edu/wp-content/uploads/2024/06/2-Emerging-Cybersecurity-Threats.webp",
                link: "/smart-alerts"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Geo-Fencing Alert",
                description: "Set virtual boundaries and receive alerts when vehicles enter or exit designated zones. Perfect for route compliance.",
                image: "https://www.groundtruth.com/wp-content/uploads/2021/02/Geofencing.jpg",
                link: "/geo-fencing"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Live Vehicle Tracking",
                description: "Track your entire fleet in real-time with precise location data and movement history.",
                image: "https://ideogram.ai/assets/image/lossless/response/8bqYyiZ0TDe86UW86EcGcg",
                link: "/live-tracking"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="reveal-from-bottom group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-orange-500 rounded-lg p-2 transform -translate-y-6 group-hover:-translate-y-8 transition-transform duration-300">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link to={service.link || '#'} className="text-orange-500 font-semibold flex items-center gap-1 group-hover:text-orange-600 transition-colors duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="why-choose-us" className="py-16 md:py-24 bg-white relative overflow-hidden reveal-scale">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-50 rounded-bl-[100px] transform rotate-6"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-50 rounded-tr-[100px] transform -rotate-6"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 reveal">
              <div>
                <span className="text-orange-500 font-semibold text-lg mb-4 block reveal-from-bottom">Why Choose Us</span>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Transform Your Fleet with Deezay Ecofuel Tracking solutions </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Leading innovator in real-time fuel monitoring and GPS fleet tracking solutions. Our advanced system helps businesses reduce fuel costs by up to 30% through precise consumption tracking, anti-theft protection, and comprehensive fleet management.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Fuel Filling & Theft Alerts",
                    description: "Get instant alerts on Fuel Refuels and Fuel Drains (Location, Time & Volume)",
                    icon: Shield,
                    delay: 0
                  },
                  {
                    title: "Trip Consumption Data",
                    description: "Each trip has Fuel Consumed per Km (L/km) for analysis",
                    icon: TrendingUp,
                    delay: 100
                  },
                  {
                    title: "Real Time Location",
                    description: "We guarantee Global Coverage to all units on cross-border movements",
                    icon: Target,
                    delay: 200
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="reveal p-6 rounded-xl bg-white border border-orange-100 hover:border-orange-500 transition-all duration-300 
                             shadow-lg hover:shadow-xl group"
                    style={{ transitionDelay: `${feature.delay}ms` }}
                  >
                    <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 -mt-4 relative z-10 mx-auto
                                 group-hover:scale-110 transition-transform duration-300">
                      {React.createElement(feature.icon, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    stat: "20+",
                    label: "Fleet Vehicles Tracked"
                  },
                  {
                    stat: "15%",
                    label: "Average Fuel Savings"
                  },
                  {
                    stat: "24/7",
                    label: "Monitoring & Support"
                  },
                  {
                    stat: "5+",
                    label: "Countries Served"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="text-4xl font-bold text-orange-500 mb-2">{item.stat}</div>
                    <div className="text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative reveal">
              <div className="relative h-full">
                <img
                  src="https://ideogram.ai/assets/image/lossless/response/D0WM7MVXREa2w7AszmrsVQ"
                  alt="Why Choose Deezay Ecofuel"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="steps" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden reveal-scale">
        {/* Animated background elements - Adjusted for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-orange-500/5 rounded-bl-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-500/5 rounded-tr-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 md:w-48 h-24 md:h-48 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating particles - Reduced for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 md:w-2 h-1 md:h-2 bg-orange-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 reveal">
            <span className="text-orange-500 font-semibold text-base md:text-lg mb-3 md:mb-4 block reveal-from-bottom">
              Secure Your Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900 reveal-from-bottom" style={{ transitionDelay: '200ms' }}>
              3 Simple Steps to Transform Your Fleet Management
            </h2>
            <p className="text-lg mb-8 text-white/80 leading-relaxed max-w-2xl mx-auto reveal-from-bottom" style={{ transitionDelay: '400ms' }}>
              Start your journey towards efficient fleet management and fuel cost savings today.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connection line - Hidden on mobile */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 transform -translate-y-1/2 reveal-from-left"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
              {[
                {
                  step: "01",
                  title: "Request A Quote",
                  description: "Share request for our services to our sales team for evaluation and quote",
                  icon: Shield,
                  color: "from-orange-400 to-orange-600"
                },
                {
                  step: "02",
                  title: "Free Demo",
                  description: "We showcase our system to you before you pay anything. Buy confidence",
                  icon: Target,
                  color: "from-blue-400 to-blue-600"
                },
                {
                  step: "03",
                  title: "System Set up",
                  description: "Our Installation Engineers equip the fleet with the required hardware",
                  icon: Shield,
                  color: "from-green-400 to-green-600"
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="reveal-scale group"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Step number with gradient background */}
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-base md:text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>

                    {/* Icon with gradient background */}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${step.color} p-3 md:p-4 mb-4 md:mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                      {React.createElement(step.icon, { className: 'w-full h-full text-white' })}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Interactive elements */}
                    <div className="mt-4 md:mt-6 flex items-center justify-end">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span className="text-xs md:text-sm text-gray-500">Active</span>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action - Adjusted for mobile */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105"
            >
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="http://smartgps24.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
            >
              Free Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Add custom styles for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-1000%) rotate(360deg); opacity: 0; }
          }

          .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all 1s cubic-bezier(0.5, 0, 0, 1);
          }

          .reveal.active {
            opacity: 1;
            transform: translateY(0);
          }

          .reveal-from-bottom {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.5, 0, 0, 1);
          }

          .reveal-from-bottom.active {
            opacity: 1;
            transform: translateY(0);
          }

          .reveal-from-left {
            opacity: 0;
            transform: translateX(-100px);
            transition: all 1s cubic-bezier(0.5, 0, 0, 1);
          }

          .reveal-from-left.active {
            opacity: 1;
            transform: translateX(0);
          }

          .reveal-scale {
            opacity: 0;
            transform: scale(0.9);
            transition: all 1s cubic-bezier(0.5, 0, 0, 1);
          }

          .reveal-scale.active {
            opacity: 1;
            transform: scale(1);
          }
        `}} />
      </section>

      {/* Testimonials Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50 reveal-scale">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Client Testimonials</h2>
            <p className="text-gray-600 text-lg">
              Hear what our clients have to say about their experience working with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "	Eyerusalem Tamirat",
                position: "Fleet Manager, Transport Company",
                image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                quote: "Deezay Ecofuel's tracking system helped us reduce fuel theft and improve our fleet efficiency by 40%. Excellent service!"
              },
              {
                name: "Tsehay Kassa",
                position: "Operations Director, Logistics",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                quote: "Real-time fuel monitoring transformed how we manage our fleet. The cost savings and efficiency gains are remarkable."
              },
              {
                name: "Melaku Tesfaye",
                position: "CEO, Distribution Company",
                image: "https://media.istockphoto.com/id/1203732956/photo/portrait-of-cheerful-african-businessman-in-early-30s.jpg?s=612x612&w=0&k=20&c=hBZa4GISX2p1t7CDYzNfsUz95f9FrlmXcrq5gU1mFJg=",
                quote: "Their GPS tracking and fuel management solutions gave us complete control over our fleet operations. Outstanding results."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="reveal bg-white rounded-xl p-8 group relative overflow-hidden border border-gray-100 hover:border-orange-500/20 transition-all duration-300"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -mr-16 -mt-16 transition-all duration-300 group-hover:bg-orange-500/20"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-8 reveal-from-left">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-orange-500/20"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 relative pl-4 border-l-2 border-orange-500/30">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-orange-50/30 relative overflow-hidden reveal-scale">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-100/50 to-orange-200/30 rounded-bl-[100px] transform rotate-6 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-orange-100/50 to-orange-200/30 rounded-tr-[100px] transform -rotate-6 animate-pulse" style={{ animationDelay: '1s' }}></div>
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-orange-500 font-semibold text-lg mb-4 block reveal-from-bottom">Got Questions?</span>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 reveal-from-bottom" style={{ transitionDelay: '200ms' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg reveal-from-bottom" style={{ transitionDelay: '400ms' }}>
              Find answers to common questions about our fleet management and fuel tracking solutions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {[
              {
                question: "How accurate is your fuel tracking system?",
                answer: "Our fuel tracking system is highly accurate with a margin of error less than 1%. We use advanced sensors and real-time monitoring to ensure precise measurements of fuel levels and consumption.",
                icon: "📊"
              },
              {
                question: "What kind of vehicles can be equipped with your system?",
                answer: "Our system is compatible with most vehicle types including trucks, buses, construction equipment, and passenger vehicles. We provide custom solutions based on your fleet's specific requirements.",
                icon: "🚛"
              },
              {
                question: "How long does the installation process take?",
                answer: "Typically, installation takes 2-3 hours per vehicle. We work around your schedule to minimize disruption to your operations and can perform installations at your preferred location.",
                icon: "⚙️"
              },
              {
                question: "What kind of support do you provide?",
                answer: "We offer 24/7 technical support, regular maintenance checks, and continuous system monitoring. Our team is always available to help with any questions or issues you may encounter.",
                icon: "🛠️"
              },
              {
                question: "Can I monitor my fleet in real-time?",
                answer: "Yes, our system provides real-time monitoring through our web platform and mobile app. You can track fuel levels, location, speed, and other vital metrics instantly from anywhere.",
                icon: "📱"
              },
              {
                question: "What reports and analytics are available?",
                answer: "We provide comprehensive reports including fuel consumption trends, cost analysis, driver behavior, route optimization, and custom reports tailored to your needs. All data can be exported in various formats.",
                icon: "📈"
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-orange-500/50 transition-all duration-500 shadow-sm hover:shadow-xl reveal-from-bottom group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <details className="group/item">
                  <summary className="flex items-center justify-between gap-3 p-6 cursor-pointer marker:content-none">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl group-hover/item:scale-125 transition-transform duration-300">
                        {faq.icon}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover/item:text-orange-500 transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-orange-100 group-hover/item:bg-orange-200 transition-colors duration-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-orange-500 transition-transform duration-500 group-hover/item:scale-110 group-open/item:rotate-180"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </summary>

                  <div className="px-6 pb-6 pt-2 space-y-4">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500/60 to-transparent"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <button className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span className="text-xs text-gray-500">Updated Recently</span>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal-scale">
            <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-gray-600 mb-2 text-lg">Still have questions?</p>
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-all transform group-hover:translate-x-1"
                >
                  Contact Our Experts
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add custom animation keyframes */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-1000%) rotate(360deg); opacity: 0; }
          }
        `}} />
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-900/95 to-blue-800/90">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2H36zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 reveal-scale">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-lg mb-8 text-white/80 leading-relaxed max-w-2xl mx-auto">
                Join hundreds of successful businesses that have revolutionized their digital strategy.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center stagger">
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="bg-white/90 text-blue-900 hover:bg-white px-8 py-3 rounded-lg text-lg font-semibold 
                         transition-all transform hover:scale-105 hover:shadow-lg flex items-center group bounce-in"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg 
                         transition-all backdrop-blur-sm bounce-in delay-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and About */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4 mb-4">
                <img src={deezayLogo} alt="Deezay Ecofuel Logo" className="w-auto h-16" />
              </div>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Leading provider of fuel tracking and fleet management solutions in Eastern Africa.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <a href="tel:+254798888658" className="text-gray-400 hover:text-white transition-colors">
                    +254 798888658
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <a href="mailto:Info@deezayecofuel.co.et" className="text-gray-400 hover:text-white transition-colors">
                    Info@deezayecofuel.co.et
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-400">Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-400">Mon-Fri: 8AM - 6PM</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
                <Link to="/admin/knowledge" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-400" /> Admin Panel
                </Link>
                <button onClick={() => setIsQuoteOpen(true)} className="text-gray-400 hover:text-white transition-colors text-left">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2024 Deezay Ecofuel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );

  useEffect(() => {
    // Add the setIsQuoteOpen function to the window object
    (window as any).openQuotePopup = () => setIsQuoteOpen(true);
    
    // Clean up when component unmounts
    return () => {
      delete (window as any).openQuotePopup;
    };
  }, []);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!quoteForm.name || !quoteForm.email || !quoteForm.phone) {
        alert('Please fill in all required fields');
        return;
      }
      
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          service: quoteForm.service,
          message: `Fleet Size: ${quoteForm.fleetSize}
Company: ${quoteForm.company}
${quoteForm.message}`,
          subject: 'New Quote Request'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send quote request');
      }

      // Clear form and close popup
      setQuoteForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        fleetSize: '',
        service: '',
        message: ''
      });
      
      // Show success message and close after delay
      alert('Your quote request has been sent successfully! We will contact you soon.');
      setIsQuoteOpen(false);
      
    } catch (error) {
      console.error('Error sending quote request:', error);
      alert('There was an error sending your request. Please try again.');
    }
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .fade-scale, .rotate-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Add reveal on scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-from-bottom, .reveal-from-left, .reveal-scale');
      
      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < window.innerHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-16 md:pt-20">
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50 top-0">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between reveal-from-left">
            {/* Logo */}
            <div className="flex items-center gap-4 reveal-from-left">
              <div>
                <img src={deezayLogo} alt="Deezay Ecofuel Logo" className="w-auto h-16" />
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8 stagger">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-orange-500 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-orange-500 transition-colors">About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">Contact Us</Link>
              {/* Desktop Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-1"
                >
                  Our Services
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Desktop Services Dropdown Menu */}
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {[
                      {
                        icon: <Droplet className="w-5 h-5" />,
                        title: "Real-Time Fuel Tracking",
                        description: "Monitor fuel levels and consumption in real-time",
                        link: "/fuel-tracking"
                      },
                      {
                        icon: <Target className="w-5 h-5" />,
                        title: "Live Tracking",
                        description: "Real-time vehicle location tracking",
                        link: "/live-tracking"
                      },
                      {
                        icon: <AlertTriangle className="w-5 h-5" />,
                        title: "Speeding Alarm",
                        description: "Get instant alerts for speed limit violations",
                        link: "/speeding-alarm"
                      },
                      {
                        icon: <Shield className="w-5 h-5" />,
                        title: "Security & Theft Prevention",
                        description: "Advanced security features for fleet protection",
                        link: "/security-theft"
                      },
                      {
                        icon: <MapPin className="w-5 h-5" />,
                        title: "Geo Fencing",
                        description: "Set up virtual perimeters for your fleet",
                        link: "/geo-fencing"
                      },
                      {
                        icon: <Bell className="w-5 h-5" />,
                        title: "Smart Alerts",
                        description: "Intelligent notification system",
                        link: "/smart-alerts"
                      },
                      {
                        icon: <TrendingUp className="w-5 h-5" />,
                        title: "Speed Monitoring",
                        description: "Track and analyze vehicle speeds",
                        link: "/speed-monitoring"
                      }
                    ].map((service, index) => (
                      <Link
                        key={index}
                        to={service.link}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsServicesOpen(false);
                          navigate(service.link);
                        }}
                      >
                        <div className="text-orange-500">
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-medium">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:flex space-x-4">
                <Link to="/about" className="text-white hover:text-gray-300 transition-colors duration-200">About Us</Link>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Our Services
                </button>
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Get Quote
                </button>
                <Link to="/admin/knowledge" className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center gap-1">
                  <Settings className="w-4 h-4" /> Admin
                </Link>
              </div>

            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} py-4`}>
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} className="text-gray-600 hover:text-orange-500 transition-colors px-4">Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-orange-500 transition-colors px-4">About Us</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-orange-500 transition-colors px-4">Contact Us</Link>
              {/* Mobile Services Menu */}
              <div className="px-4">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-600 hover:text-orange-500 transition-colors py-2"
                >
                  <span>Our Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Services Submenu */}
                <div className={`pl-4 ${isServicesOpen ? 'block' : 'hidden'} space-y-2 mt-2`}>
                  {[
                    {
                      icon: <Droplet className="w-5 h-5" />,
                      title: "Real-Time Fuel Tracking",
                      description: "Monitor fuel levels and consumption in real-time",
                      link: "/fuel-tracking"
                    },
                    {
                      icon: <Target className="w-5 h-5" />,
                      title: "Live Tracking",
                      description: "Real-time vehicle location tracking",
                      link: "/live-tracking"
                    },
                    {
                      icon: <AlertTriangle className="w-5 h-5" />,
                      title: "Speeding Alarm",
                      description: "Get instant alerts for speed limit violations",
                      link: "/speeding-alarm"
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      title: "Security & Theft Prevention",
                      description: "Advanced security features for fleet protection",
                      link: "/security-theft"
                    },
                    {
                      icon: <MapPin className="w-5 h-5" />,
                      title: "Geo Fencing",
                      description: "Set up virtual perimeters for your fleet",
                      link: "/geo-fencing"
                    },
                    {
                      icon: <Bell className="w-5 h-5" />,
                      title: "Smart Alerts",
                      description: "Intelligent notification system",
                      link: "/smart-alerts"
                    },
                    {
                      icon: <TrendingUp className="w-5 h-5" />,
                      title: "Speed Monitoring",
                      description: "Track and analyze vehicle speeds",
                      link: "/speed-monitoring"
                    }
                  ].map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsServicesOpen(false);
                        setIsMobileMenuOpen(false);
                        navigate(service.link);
                      }}
                    >
                      <div className="text-orange-500">
                        {service.icon}
                      </div>
                      <div>
                        <div className="font-medium">{service.title}</div>
                        <div className="text-sm text-gray-500">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <WhatsAppButton />

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/fuel-tracking" element={<FuelTracking />} />
        <Route path="/speeding-alarm" element={<SpeedingAlarm />} />
        <Route path="/security-theft" element={<SecurityTheft />} />
        <Route path="/geo-fencing" element={<GeoFencing />} />
        <Route path="/smart-alerts" element={<SmartAlerts />} />
        <Route path="/speed-monitoring" element={<SpeedMonitoring />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/admin/knowledge" element={
          <ProtectedRoute>
            <KnowledgeAdmin />
          </ProtectedRoute>
        } />
      </Routes>

      {/* Quote Request Popup */}
      {isQuoteOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-900">Request a Quote</h3>
                <button 
                  onClick={() => setIsQuoteOpen(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-6" onSubmit={handleQuoteSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="+254 XXX XXX XXX"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={quoteForm.company}
                    onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                {/* Fleet Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fleet Size</label>
                  <select
                    value={quoteForm.fleetSize}
                    onChange={(e) => setQuoteForm({...quoteForm, fleetSize: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select fleet size</option>
                    <option value="1-5">1-5 vehicles</option>
                    <option value="6-20">6-20 vehicles</option>
                    <option value="21-50">21-50 vehicles</option>
                    <option value="50+">50+ vehicles</option>
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                  <select
                    value={quoteForm.service}
                    onChange={(e) => setQuoteForm({...quoteForm, service: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select service</option>
                    <option value="fuel-tracking">Real-Time Fuel Tracking</option>
                    <option value="live-tracking">Live Tracking</option>
                    <option value="speeding-alarm">Speeding Alarm</option>
                    <option value="security-theft">Security & Theft Prevention</option>
                    <option value="geo-fencing">Geo Fencing</option>
                    <option value="smart-alerts">Smart Alerts</option>
                    <option value="speed-monitoring">Speed Monitoring</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Tell us more about your needs..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Submit Request
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default App;
