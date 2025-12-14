import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const StickyCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Default phone number - Palm Beach area code as business is in Deerfield Beach
  const phoneNumber = "(561) 571-8725";
  const telLink = "tel:+15615718725";

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 animate-fade-in"
      role="complementary"
      aria-label="Quick contact"
    >
      <Button
        size="lg"
        className="w-full md:w-auto bg-secondary text-secondary-foreground shadow-elevated font-semibold text-lg py-6 px-8"
        asChild
      >
        <a 
          href={telLink} 
          className="flex items-center justify-center gap-3"
          aria-label={`Call TIDYWISE now at ${phoneNumber}`}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call Now: {phoneNumber}</span>
        </a>
      </Button>
    </div>
  );
};

export default StickyCallButton;
