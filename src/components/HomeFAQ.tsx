import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "How much does house cleaning cost in Jacksonville?",
    a: "Our standard cleaning starts at $108 for homes up to 750 sq ft. Deep cleaning starts at $208 and move in/out cleaning starts at $283. Use our instant price calculator above for your exact quote based on home size and service type.",
  },
  {
    q: "Are your cleaners background-checked?",
    a: "Yes! Every Point Polish cleaner undergoes a thorough background check, is fully insured, and goes through our professional training program before their first assignment.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No, many of our clients provide a spare key or door code. We're fully insured and bonded, so your home is protected. You can also be home if you prefer — whatever makes you comfortable.",
  },
  {
    q: "What cleaning products do you use?",
    a: "We use eco-friendly, non-toxic cleaning products that are safe for children, pets, and the environment. If you have specific product preferences or allergies, let us know and we'll accommodate.",
  },
  {
    q: "What's your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations. Same-day cancellations may be subject to a fee. We understand things come up, so we're always flexible and understanding.",
  },
  {
    q: "Do you offer recurring cleaning discounts?",
    a: "Absolutely! Weekly service saves 15%, bi-weekly saves 10%, and monthly saves 5%. The more frequently you book, the more you save — and your home stays consistently clean.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Jacksonville, FL and surrounding areas including Jacksonville Beach, Atlantic Beach, Neptune Beach, Ponte Vedra Beach, and more throughout Duval County.",
  },
  {
    q: "Do you offer a first-time discount?",
    a: "Yes! Use promo code POLISH to get 10% off your first cleaning. We also offer a free estimate on all services.",
  },
];

const HomeFAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our cleaning services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-lg px-5"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-semibold hover:underline">
            More questions? Visit our full FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;