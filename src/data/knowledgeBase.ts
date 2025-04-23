export interface KnowledgeEntry {
  topic: string;
  content: string;
  category: 'services' | 'support' | 'pricing' | 'installation' | 'general';
  created_by: string;
  created_at?: string;
}

export const initialKnowledgeBase: KnowledgeEntry[] = [
  // Fuel Tracking Services
  {
    topic: "Real-Time Fuel Tracking",
    content: `Features: Real-time fuel level monitoring, consumption tracking, anti-theft alerts, detailed reports
Benefits: Reduce fuel costs by up to 30%, prevent theft and misuse, optimize routes and consumption
Installation: Takes under 30 minutes per vehicle, our technicians handle all setup
Support: 24/7 monitoring and technical assistance
Price Range: Starting from $10/month per vehicle`,
    category: "services",
    created_by: "system"
  },
  {
    topic: "Live Tracking",
    content: `Features: Real-time GPS location monitoring, route history, geofencing, speed monitoring
Benefits: Know where your vehicles are at all times, improve driver accountability, enhance security
Installation: Professional installation included with service package
Support: 24/7 technical support and system monitoring
Price Range: Starting from $8/month per vehicle`,
    category: "services",
    created_by: "system"
  },
  {
    topic: "Speeding Alarm",
    content: `Features: Real-time speed monitoring, instant alerts for violations, customizable thresholds, driver behavior reports
Benefits: Reduce accidents, improve safety, lower fuel consumption, extend vehicle lifespan
Installation: Professional setup with speed calibration for each vehicle
Support: Dedicated safety monitoring team
Price Range: Available as $5/month add-on to tracking packages`,
    category: "services",
    created_by: "system"
  },
  {
    topic: "Security & Theft Prevention",
    content: `Features: Engine immobilization, unauthorized movement alerts, tamper detection, real-time alerts
Benefits: Prevent vehicle theft, secure your fleet 24/7, rapid response to security threats
Installation: Professional installation of security hardware
Support: 24/7 security monitoring and emergency response
Price Range: Starting from $12/month per vehicle for comprehensive security`,
    category: "services",
    created_by: "system"
  },
  {
    topic: "Geo Fencing",
    content: `Features: Create virtual boundaries, receive alerts when vehicles enter/exit zones, customizable zones
Benefits: Ensure vehicles stay in authorized areas, monitor job site attendance, prevent unauthorized use
Installation: Setup includes defining initial geo-zones based on your requirements
Support: Assistance with zone configuration and alert management
Price Range: Included with tracking packages or $3/month as standalone service`,
    category: "services",
    created_by: "system"
  },
  {
    topic: "Smart Alerts",
    content: `Features: Customizable notification system, engine diagnostics, maintenance reminders, driver behavior alerts
Benefits: Proactive fleet management, reduced maintenance costs, extended vehicle lifespan
Installation: System connects to vehicle diagnostic port for comprehensive monitoring
Support: Alert configuration assistance and monitoring
Price Range: Included with premium packages or $4/month add-on`,
    category: "services",
    created_by: "system"
  },
  {
    topic: "Speed Monitoring",
    content: `Features: Advanced speed tracking, route-specific speed limits, comprehensive reporting, driver scoring
Benefits: 30% reduction in speeding incidents, 25% lower fuel consumption, 40% fewer accidents
Installation: Professional installation with speed calibration
Support: Regular reporting and management dashboards
Price Range: Included with premium packages or $5/month add-on`,
    category: "services",
    created_by: "system"
  },
  // Installation Information
  {
    topic: "Installation Process",
    content: `Process Overview:
1. Initial consultation and fleet assessment
2. Hardware procurement and configuration
3. Professional installation by certified technicians (30 minutes per vehicle)
4. System testing and calibration
5. User training and setup

Requirements:
- Vehicles must be available for installation
- Proper electrical systems required
- Brief access to each vehicle

Locations: We provide on-site installation at your business location
Timeline: Typically 1-2 business days from agreement signing`,
    category: "installation",
    created_by: "system"
  },
  // Support Information
  {
    topic: "Technical Support",
    content: `Support Hours: 24/7 technical assistance
Contact Methods:
- Phone: +254 798888658
- Email: Info@deezayecofuel.co.et
- In-app support ticket system

Response Times:
- Critical issues: Under 30 minutes
- Standard requests: Within 2 hours
- General inquiries: Same business day

Support Services:
- System troubleshooting
- Software updates
- Hardware maintenance
- User training
- Report generation assistance`,
    category: "support",
    created_by: "system"
  },
  // General Information
  {
    topic: "Company Information",
    content: `About Us: Deezay Ecofuel is a leading provider of fuel tracking and fleet management solutions in Eastern Africa. We specialize in helping fleet owners and managers optimize operations, reduce costs, and improve efficiency.

Location: Addis Ababa, Ethiopia
Founded: 2020
Coverage: Operating across multiple East African countries
Team: Experienced professionals in GPS technology, fleet management, and fuel systems

Mission: To provide real-time fleet visibility to owners & fleet managers, helping them save up to 10% on fuel costs with our advanced tracking and monitoring solutions.

Contact:
- Phone: +254 798888658
- Email: Info@deezayecofuel.co.et
- Office Hours: Mon-Fri: 8AM - 6PM`,
    category: "general",
    created_by: "system"
  },
  {
    topic: "Pricing Information",
    content: `Service Tiers:
- Basic Package: $10/month per vehicle (Real-time fuel tracking)
- Standard Package: $15/month per vehicle (Fuel tracking + Live GPS)
- Premium Package: $25/month per vehicle (All services included)

Add-ons:
- Speeding Alarm: $5/month
- Geo-Fencing: $3/month
- Smart Alerts: $4/month
- Security Suite: $7/month

Volume Discounts:
- 10+ vehicles: 10% discount
- 20+ vehicles: 15% discount
- 50+ vehicles: 20% discount

Contract Terms:
- Monthly, quarterly, or annual billing
- Discounts for prepaid annual contracts
- No long-term commitment required`,
    category: "pricing",
    created_by: "system"
  }
];

// Basic search function for the knowledge base
export function searchKnowledgeBase(query: string): KnowledgeEntry[] {
  const normalizedQuery = query.toLowerCase();
  
  return initialKnowledgeBase.filter(entry => {
    const normalizedContent = entry.content.toLowerCase();
    const normalizedTopic = entry.topic.toLowerCase();
    
    return normalizedContent.includes(normalizedQuery) || 
           normalizedTopic.includes(normalizedQuery);
  });
}
