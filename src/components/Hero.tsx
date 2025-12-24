import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import TrustBadges from "./TrustBadges";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Trust indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success-foreground border border-success/30 mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm font-medium text-background">Booking Available Today</span>
        </div>

        <h1 className="sr-only">Cleaners Near Me</h1>
        <p className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-background mb-6 animate-fade-in" aria-hidden="true">
          Cleaners Near Me
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl">South Florida's Trusted Cleaning Service</span>
        </p>
        <p className="text-background/90 text-lg md:text-xl max-w-2xl mx-auto mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          South Florida's most trusted cleaning service.
        </p>
        <p className="text-background text-xl md:text-2xl font-semibold max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          For Every Budget, For Every Space, For You.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-8" style={{ animationDelay: "0.4s" }}>
          <Button
            variant="outline"
            size="lg"
            className="bg-info text-info-foreground border-info hover:bg-info/90 font-semibold text-base md:text-lg px-6 md:px-8 py-6"
            asChild
          >
            <a href="tel:+15615718725" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call (561) 571-8725
            </a>
          </Button>
          <Button
            size="lg"
            className="bg-success text-success-foreground hover:bg-success/90 font-semibold text-base md:text-lg px-6 md:px-8 py-6 group"
            asChild
          >
            <a href="#booking" className="flex items-center gap-2">
              Get Instant Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <TrustBadges variant="light" showReview={true} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-background/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-background/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
