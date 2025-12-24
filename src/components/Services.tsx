import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Home, Truck, Building2, Check, Armchair, Layers } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Standard Cleaning",
    description: "Perfect for regular maintenance cleaning to keep your home spotless.",
    price: "From $150",
    link: "/standard-cleaning",
    features: [
      "All rooms dusted & vacuumed",
      "Kitchen & bathrooms sanitized",
      "Floors mopped",
      "Trash emptied",
    ],
  },
  {
    icon: Home,
    title: "Deep Cleaning",
    description: "Comprehensive cleaning for homes that need extra attention to detail.",
    price: "From $250",
    link: "/deep-cleaning",
    features: [
      "Everything in Standard Cleaning",
      "Baseboards & trim cleaned",
      "Light switches & door handles",
      "Inside cabinets & drawers",
    ],
  },
  {
    icon: Truck,
    title: "Move In/Out",
    description: "Perfect for moving - we leave your old or new home spotless.",
    price: "From $300",
    link: "/move-in-out-cleaning",
    features: [
      "Complete top-to-bottom cleaning",
      "Inside appliances cleaned",
      "Windows & tracks cleaned",
      "Ready for move-in inspection",
    ],
  },
  {
    icon: Layers,
    title: "Carpet Cleaning",
    description: "Professional deep extraction cleaning for all carpet types.",
    price: "Custom Quote",
    link: "/carpet-cleaning",
    features: [
      "Deep fiber extraction",
      "Stain & spot treatment",
      "Odor elimination",
      "Fast drying times",
    ],
  },
  {
    icon: Armchair,
    title: "Upholstery Cleaning",
    description: "Expert furniture and fabric cleaning for sofas, chairs & more.",
    price: "Custom Quote",
    link: "/upholstery-cleaning",
    features: [
      "Safe for all fabric types",
      "Removes embedded dirt",
      "Pet odor removal",
      "Fabric protection option",
    ],
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Professional cleaning for offices, retail spaces, and commercial properties.",
    price: "Custom Quote",
    link: "/#booking",
    features: [
      "Flexible scheduling",
      "OSHA compliant cleaning",
      "Janitorial services",
      "Floor care & maintenance",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Premium Cleaning Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From standard maintenance to deep cleaning, carpet care to upholstery cleaning - 
            we offer comprehensive solutions for every need in South Florida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link 
              key={service.title}
              to={service.link}
              className="block group"
            >
              <Card
                className="hover-lift border-border/50 animate-fade-in h-full transition-all group-hover:border-primary/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Internal Links for SEO */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Serving all of South Florida with professional cleaning services
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/broward-county-cleaning" className="text-sm text-primary hover:underline">Broward County</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/miami-dade-cleaning" className="text-sm text-primary hover:underline">Miami-Dade County</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/palm-beach-county-cleaning" className="text-sm text-primary hover:underline">Palm Beach County</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/service-areas" className="text-sm text-primary hover:underline">All Service Areas</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
