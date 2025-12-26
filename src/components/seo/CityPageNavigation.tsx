import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CityPageNavigationProps {
  currentCity: string;
  county: "broward" | "palm-beach" | "miami-dade";
}

const cityLinks = {
  broward: [
    { name: "Fort Lauderdale", path: "/fort-lauderdale-cleaning" },
    { name: "Hollywood", path: "/hollywood-cleaning" },
    { name: "Coral Springs", path: "/coral-springs-cleaning" },
    { name: "Pembroke Pines", path: "/pembroke-pines-cleaning" },
    { name: "Weston", path: "/weston-cleaning" },
    { name: "Plantation", path: "/plantation-cleaning" },
  ],
  "palm-beach": [
    { name: "West Palm Beach", path: "/west-palm-beach-cleaning" },
    { name: "Boca Raton", path: "/boca-raton-cleaning" },
    { name: "Delray Beach", path: "/delray-beach-cleaning" },
    { name: "Jupiter", path: "/jupiter-cleaning" },
    { name: "Palm Beach Gardens", path: "/palm-beach-gardens-cleaning" },
    { name: "Wellington", path: "/wellington-cleaning" },
  ],
  "miami-dade": [
    { name: "Miami", path: "/miami-cleaning" },
    { name: "Miami Beach", path: "/miami-beach-cleaning" },
    { name: "Coral Gables", path: "/coral-gables-cleaning" },
    { name: "Aventura", path: "/aventura-cleaning" },
    { name: "Doral", path: "/doral-cleaning" },
    { name: "Hialeah", path: "/hialeah-cleaning" },
  ],
};

const serviceLinks = [
  { name: "Standard Cleaning", path: "/standard-cleaning" },
  { name: "Deep Cleaning", path: "/deep-cleaning" },
  { name: "Move In/Out Cleaning", path: "/move-in-out-cleaning" },
  { name: "Carpet Cleaning", path: "/carpet-cleaning" },
];

const CityPageNavigation = ({ currentCity, county }: CityPageNavigationProps) => {
  const nearbyCities = cityLinks[county].filter(city => city.name !== currentCity).slice(0, 5);
  
  return (
    <section className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Nearby Cities */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Nearby Cities We Serve
            </h3>
            <ul className="space-y-2">
              {nearbyCities.map((city) => (
                <li key={city.path}>
                  <Link 
                    to={city.path} 
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {city.name} Cleaning
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/service-areas" 
                  className="text-primary font-medium hover:underline flex items-center gap-2"
                >
                  View All 40+ Cities →
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Our Services */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Our Cleaning Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.path}>
                  <Link 
                    to={service.path} 
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/blog" 
                  className="text-primary font-medium hover:underline flex items-center gap-2"
                >
                  Read Our Blog →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            {" · "}
            <Link to="/faq" className="hover:text-primary">FAQ</Link>
            {" · "}
            <Link to="/referral-program" className="hover:text-primary">Referral Program</Link>
            {" · "}
            <Link to="/apply" className="hover:text-primary">Join Our Team</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CityPageNavigation;
