import { motion } from 'framer-motion';
import { GiDroplets } from 'react-icons/gi';
import { FaShieldAlt, FaChartLine, FaSatelliteDish, FaTruck, FaIndustry } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <GiDroplets className="text-4xl text-orange-500" />,
      title: "Fuel Protection",
      description: "Safeguarding every drop with precision monitoring"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-orange-500" />,
      title: "Advanced Security",
      description: "State-of-the-art technology for theft prevention"
    },
    {
      icon: <FaChartLine className="text-4xl text-orange-500" />,
      title: "Real-time Analytics",
      description: "Comprehensive insights for informed decisions"
    },
    {
      icon: <FaSatelliteDish className="text-4xl text-orange-500" />,
      title: "GPS Integration",
      description: "20+ years of monitoring expertise"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="relative pt-28 pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-left">
                  Protecting Every Drop
                  <span className="text-orange-500 block">with Deezay</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mb-8 text-left">
                  EcoFuel Tracking Solutions
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg text-gray-600 leading-relaxed text-left"
                >
                  Welcome to Deezay EcoFuel Tracking Solutions, a visionary new leader in fuel management, redefining security with precision. As an innovative startup, we're transforming the industry by ensuring the integrity of fuel transportation and mitigating unauthorized fuel loss by drivers in trucks. Partnered with a proven leader boasting over 20 years of GPS and monitoring expertise, we're not just launching a business—we're setting a new standard.
                </motion.p>
              </div>

              <div className="order-1 lg:order-2 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative z-10"
                >
                  <div className="relative">
                    {/* Decorative elements */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-xl"
                    />
                    <motion.div
                      animate={{
                        rotate: [360, 0],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full blur-xl"
                    />
                    
                    {/* Main image */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent mix-blend-overlay" />
                      <img
                        src="https://ideogram.ai/assets/image/lossless/response/qIv4rignTCele2NTIG9KZw"
                        alt="Deezay EcoFuel Solutions"
                        className="w-full h-[400px] object-cover rounded-2xl"
                      />
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-4 right-10 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg"
                    >
                      <GiDroplets className="text-2xl text-orange-500" />
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                      className="absolute -bottom-4 left-10 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg"
                    >
                      <FaShieldAlt className="text-2xl text-orange-500" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  We deliver state-of-the-art technology that tracks fuel from tanker to truck, safeguarding every ounce. Our FuelGuard360 Platform integrates real-time monitoring, advanced consumption analytics, and robust theft prevention to address discrepancies instantly—whether securing transportation routes or ensuring driver accountability.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">What Defines Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  Breakthrough innovation, pinpoint accuracy, and a steadfast commitment to your success. Our solutions optimize operations, reduce losses, and scale seamlessly to meet your needs, from local operations to global enterprises. By blending our bold vision with our partner's unmatched experience, Deezay EcoFuel Tracking Solutions empowers you with a competitive edge.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
            {[
              { icon: <FaIndustry />, title: "Industry Leader", value: "20+" },
              { icon: <FaTruck />, title: "Active Vehicles", value: "500+" },
              { icon: <FaChartLine />, title: "Fuel Saved", value: "10%" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl text-orange-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-white">Partner with Us</h2>
              <p className="text-lg mb-8 text-white/90">
                Elevate your fuel management and secure your assets. With Deezay EcoFuel Tracking Solutions, every journey is protected, and every drop is accounted for.
              </p>
              <button className="px-8 py-4 bg-white text-orange-500 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 mx-auto group">
                Get Started Today
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
