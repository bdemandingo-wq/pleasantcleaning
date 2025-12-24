import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingCalculator from "@/components/PricingCalculator";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import ServiceAreaLinks from "@/components/seo/ServiceAreaLinks";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import GoogleMapEmbed from "@/components/seo/GoogleMapEmbed";

const Index = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Cleaners Near Me | South Florida Cleaning Services | TIDYWISE"
        pageDescription="Looking for cleaners near me? TIDYWISE serves Broward, Miami-Dade & Palm Beach County. Licensed & insured professional cleaners. Same-day quotes. Call (561) 571-8725!"
        canonicalUrl="https://tidywisecleaning.com"
        pageType="home"
      />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <PricingCalculator />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <ServiceAreaLinks />
        <GoogleMapEmbed />
        <BlogPreview />
        <Contact />
        <Footer />
        <StickyCallButton />
        <AIChatbot />
      </main>
    </>
  );
};

export default Index;