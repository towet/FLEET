import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  Clock,
  User,
  AtSign,
  MessageSquare,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: 'fuel-tracking' // Default service
  });



  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: 'fuel-tracking'
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };



  const contactMethods = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 798888658',
      link: 'tel:',
      color: 'bg-gradient-to-r from-blue-400 to-blue-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'Info@deezayecofuel.co.et',
      link: 'mailto:Info@deezayecofuel.co.et',
      color: 'bg-gradient-to-r from-red-400 to-red-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Addis Ababa, Ethiopia',
      link: 'https://maps.google.com/?q=Addis+Ababa,Ethiopia',
      color: 'bg-gradient-to-r from-green-400 to-green-600'
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon-Fri: 8AM - 6PM',
      color: 'bg-gradient-to-r from-purple-400 to-purple-600'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      link: 'https://instagram.com/your-handle',
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      link: 'https://facebook.com/your-page',
      color: 'bg-blue-600'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      link: 'https://wa.me/254712345678',
      color: 'bg-green-500'
    },
    {
      icon: Send,
      label: 'Telegram',
      link: 'https://t.me/your-handle',
      color: 'bg-blue-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative animate-fade-in">
            Get in Touch
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mt-2">We'd Love to Hear From You</span>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/5 rounded-full blur-xl"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto relative animate-slide-up">
            Have questions about our services? Want to start optimizing your fleet? 
            We're here to help and answer any question you might have.
          </p>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className={`${method.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300`}>
                  {React.createElement(method.icon, { className: 'w-6 h-6 text-white' })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.label}</h3>
                {method.link ? (
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{method.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Connect With Us</h2>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className={`${social.color} p-4 rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/10`}>
                {React.createElement(social.icon, { className: 'w-6 h-6 text-white' })}
              </div>
              <span className="sr-only">{social.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Map Section */}
          <div className="relative h-64 lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126083.2423731179!2d38.6894684!3d8.9733158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service of Interest
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white appearance-none"
                  >
                    <option value="fuel-tracking">Real-Time Fuel Tracking</option>
                    <option value="live-tracking">Live Vehicle Tracking</option>
                    <option value="speeding-alarm">Speeding Alarm</option>
                    <option value="security-theft">Security & Theft Prevention</option>
                    <option value="geo-fencing">Geo Fencing</option>
                    <option value="smart-alerts">Smart Alerts</option>
                    <option value="speed-monitoring">Speed Monitoring</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5" />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition-all duration-300 relative overflow-hidden group
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/25'
                  }`}
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-orange-600"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
