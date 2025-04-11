import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { createContext, useContext } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import FuelTracking from './components/FuelTracking';
import SpeedingAlarm from './components/SpeedingAlarm';
import SecurityTheft from './components/SecurityTheft';
import GeoFencing from './components/GeoFencing';
import SmartAlerts from './components/SmartAlerts';
import SpeedMonitoring from './components/SpeedMonitoring';
import LiveTracking from './components/LiveTracking';
import {
  Shield,
  TrendingUp,
  Target,
  ArrowRight,
  Droplet,
  AlertTriangle,
  MapPin,
  Bell
} from 'lucide-react';

import heroImage from './assets/hero.png';
import WhatsAppButton from './components/WhatsAppButton';
import deezayLogo from './assets/Deezay.png';

// Create a context for the contact function
export const ContactContext = createContext<() => void>(() => {});

function App() {
  useScrollAnimation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Services data
  const services = [
    {
      icon: <Droplet className="w-5 h-5" />,
      title: "Real-Time Fuel Tracking",
      description: "Monitor fuel levels and consumption in real-time",
      link: "/fuel-tracking"
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Speed Monitoring",
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
      icon: <Bell className="w-5 h-5" />,
      title: "Smart Alerts",
      description: "Intelligent notification system",
      link: "/smart-alerts"
    }
  ];

  // Use the scroll animation hook
  useScrollAnimation();

  const handleContactClick = () => {
    setIsContactOpen(true);
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
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white p-0.5 rounded-full">
                  <img src={deezayLogo} alt="Deezay Ecofuel Logo" className="w-14 h-14 object-contain rounded-full" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-orange-500">Deezay</span>
                <span className="text-base font-medium text-gray-700">Ecofuel</span>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8 stagger">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-orange-500 transition-colors">Home</Link>
              
              {/* Desktop Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onBlur={() => setTimeout(() => setIsServicesOpen(false), 200)}
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-1"
                >
                  Services
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Desktop Services Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        to={service.link}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
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

              <button 
                onClick={() => scrollToSection('why-choose-us')} 
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('steps')} 
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Steps
              </button>
              <button
                onClick={handleContactClick}
                className="hidden lg:flex bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors bounce-in"
              >
                Contact Us
              </button>
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-orange-500 transition-colors px-4">Home</Link>
              {/* Mobile Services Menu */}
              <div className="px-4">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-600 hover:text-orange-500 transition-colors py-2"
                >
                  <span>Services</span>
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
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition-colors"
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsMobileMenuOpen(false);
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

              <button 
                onClick={() => scrollToSection('why-choose-us')} 
                className="text-left px-4 text-gray-600 hover:text-orange-500 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('steps')} 
                className="text-left px-4 text-gray-600 hover:text-orange-500 transition-colors"
              >
                Steps
              </button>
              <button
                onClick={() => {
                  handleContactClick();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors mx-4"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>
      <WhatsAppButton phoneNumber="+254795704273" />

      {/* Contact Popup */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative transform transition-all duration-300 scale-100 shadow-2xl">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#F3F4F6"/>
                <path d="M16 8L8 16M8 8L16 16" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
              <p className="text-gray-600">Choose your preferred way to reach us</p>
            </div>

            <div className="space-y-6">
              <a
                href="https://wa.me/254795704273"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-green-600 mb-1">WhatsApp</h3>
                  <p className="text-green-700">Chat with us instantly</p>
                </div>
                <ArrowRight className="w-6 h-6 text-green-500 group-hover:translate-x-2 transition-transform duration-300" />
              </a>

              <a
                href="mailto:frankyfreaky103@gmail.com"
                className="flex items-center p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-red-600 mb-1">Gmail</h3>
                  <p className="text-red-700">Send us an email</p>
                </div>
                <ArrowRight className="w-6 h-6 text-red-500 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/fuel-tracking" element={<FuelTracking />} />
        <Route path="/speeding-alarm" element={<SpeedingAlarm />} />
        <Route path="/security-theft" element={<SecurityTheft />} />
        <Route path="/geo-fencing" element={<GeoFencing />} />
        <Route path="/smart-alerts" element={<SmartAlerts />} />
        <Route path="/speed-monitoring" element={<SpeedMonitoring />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/" element={
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
                Smart Fuel Tracking
                <span className="text-orange-500 block">For Modern Fleets</span>
              </h1>
              <p className="text-xl text-gray-600 reveal-from-left delay-200">
                We guarantee real-time fleet visibility to owners & fleet managers. Save up to 10% on fuel costs with our advanced tracking and monitoring solutions. Join thousands of companies already optimizing their operations with our proven technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start stagger">
                <button
                  onClick={handleContactClick}
                  className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 
                           transition-all duration-300 flex items-center gap-2 group"
                >
                  Request Free Demo
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
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
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-xl"></div>
                  </div>
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
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-500">Active</span>
                    </div>
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
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Transform Your Fleet with Deezay Ecofuel</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Leading innovator in real-time fuel monitoring and GPS fleet tracking solutions. Our advanced system helps businesses reduce fuel costs by up to 30% through precise consumption tracking, anti-theft protection, and comprehensive fleet management. Join thousands of companies already optimizing their operations with our proven technology.
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
                    stat: "500+",
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
                    <div className="mt-4 md:mt-6 flex items-center justify-between">
                      <button className="text-orange-500 text-sm md:text-base font-medium flex items-center gap-1 group-hover:text-orange-600 transition-colors duration-300">
                        Learn More
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>
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
          <div className="mt-12 md:mt-16 text-center reveal-from-bottom">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-semibold hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300">
              Get Started Now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
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
        }

        @media (max-width: 768px) {
          .reveal, .reveal-from-bottom, .reveal-from-left, .reveal-scale {
            transition-delay: 0ms !important;
          }
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

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-900/95 to-blue-800/90">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2H36zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                onClick={handleContactClick}
                className="bg-white/90 text-blue-900 hover:bg-white px-8 py-3 rounded-lg text-lg font-semibold 
                         transition-all transform hover:scale-105 hover:shadow-lg flex items-center group bounce-in"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={handleContactClick}
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
          <div className="flex items-center justify-center mb-8 reveal-scale">
            <div className="flex items-center gap-3">
              <img src={deezayLogo} alt="Deezay Ecofuel Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Deezay</h2>
                <span className="text-lg font-semibold text-gray-200">Ecofuel</span>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Deezay Ecofuel. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </>} />
      </Routes>
    </div>
  );
}

export default App;