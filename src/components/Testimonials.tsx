import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah K.",
    location: "Jacksonville",
    rating: 5,
    text: "Point Polish Cleaners left my home absolutely spotless. Every surface was polished to perfection. I've never had a cleaning service this thorough!",
  },
  {
    name: "Marcus T.",
    location: "Jacksonville Beach",
    rating: 5,
    text: "Their attention to detail is unmatched. Used their deep cleaning service and the results were incredible. Highly recommend!",
  },
  {
    name: "Lisa R.",
    location: "Ponte Vedra",
    rating: 5,
    text: "As a busy professional, Point Polish is a lifesaver. The bi-weekly service keeps my home in perfect shape and gives me back my weekends.",
  },
  {
    name: "David M.",
    location: "Atlantic Beach",
    rating: 5,
    text: "Their move-in cleaning was so thorough, my landlord actually complimented it. Booked again immediately for regular service.",
  },
  {
    name: "Jennifer W.",
    location: "Neptune Beach",
    rating: 5,
    text: "I was nervous about letting someone into my home but their background-checked team made me feel completely at ease. Premium quality service.",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Rating summary */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
            ))}
          </div>
          <span className="text-lg font-semibold text-foreground">5.0</span>
          <span className="text-muted-foreground">5-Star Rated</span>
        </div>
        
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Real People. Real Clean Homes.
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Join happy Jacksonville homeowners who trust Point Polish Cleaners.
        </p>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[320px] md:w-[380px] bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow scroll-snap-center"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
                  Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-10 space-y-3">
          <Link 
            to="/service-areas"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            📍 Serving Jacksonville, FL & surrounding areas →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;