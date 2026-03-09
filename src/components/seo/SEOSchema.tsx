import { Helmet } from 'react-helmet-async';

interface SEOSchemaProps {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  pageType?: 'home' | 'county' | 'blog' | 'service' | 'city';
  county?: string;
  cityName?: string;
  blogMeta?: {
    datePublished?: string;
    dateModified?: string;
    readTime?: string;
    category?: string;
  };
  faqItems?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const WEBSITE = "https://tidywisecleaning.com";
const BUSINESS_NAME = "TIDYWISE Cleaning Services";
const PHONE = "+1-561-571-8725";

const cleaningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "@id": `${WEBSITE}/#business`,
  "name": BUSINESS_NAME,
  "alternateName": ["Tidywise", "TidyWise Cleaning", "TIDYWISE House Cleaning"],
  "description": "TIDYWISE is a professional residential and commercial cleaning company serving 40+ cities across Broward, Miami-Dade, and Palm Beach County, Florida. We offer standard cleaning, deep cleaning, move-in/out cleaning, carpet cleaning, and upholstery cleaning.",
  "url": WEBSITE,
  "telephone": PHONE,
  "email": "support@tidywisecleaning.com",
  "foundingDate": "2023",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "image": [`${WEBSITE}/og-image.webp`, `${WEBSITE}/logo.webp`],
  "logo": `${WEBSITE}/logo.webp`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "65 SW 12th Ave",
    "addressLocality": "Deerfield Beach",
    "addressRegion": "FL",
    "postalCode": "33442",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 26.3182, "longitude": -80.0944 },
  "hasMap": "https://maps.google.com/?q=TIDYWISE+Cleaning+Deerfield+Beach+FL",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "09:00", "closes": "15:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5", "worstRating": "1" },
  "areaServed": [
    { "@type": "City", "name": "Fort Lauderdale", "sameAs": "https://en.wikipedia.org/wiki/Fort_Lauderdale,_Florida" },
    { "@type": "City", "name": "Boca Raton", "sameAs": "https://en.wikipedia.org/wiki/Boca_Raton,_Florida" },
    { "@type": "City", "name": "West Palm Beach", "sameAs": "https://en.wikipedia.org/wiki/West_Palm_Beach,_Florida" },
    { "@type": "City", "name": "Miami", "sameAs": "https://en.wikipedia.org/wiki/Miami" },
    { "@type": "City", "name": "Hollywood", "sameAs": "https://en.wikipedia.org/wiki/Hollywood,_Florida" },
    { "@type": "City", "name": "Pompano Beach" },
    { "@type": "City", "name": "Coral Springs" },
    { "@type": "City", "name": "Deerfield Beach" },
    { "@type": "City", "name": "Miami Beach" },
    { "@type": "City", "name": "Aventura" },
    { "@type": "AdministrativeArea", "name": "Broward County", "sameAs": "https://en.wikipedia.org/wiki/Broward_County,_Florida" },
    { "@type": "AdministrativeArea", "name": "Miami-Dade County", "sameAs": "https://en.wikipedia.org/wiki/Miami-Dade_County,_Florida" },
    { "@type": "AdministrativeArea", "name": "Palm Beach County", "sameAs": "https://en.wikipedia.org/wiki/Palm_Beach_County,_Florida" }
  ],
  "sameAs": [
    "https://www.facebook.com/tidywisecleaning",
    "https://www.instagram.com/tidywisecleaning"
  ],
  "knowsAbout": ["House Cleaning", "Deep Cleaning", "Move-In Cleaning", "Move-Out Cleaning", "Carpet Cleaning", "Upholstery Cleaning", "Eco-Friendly Cleaning", "Commercial Cleaning"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "TIDYWISE Cleaning Services Menu",
    "itemListElement": [
      { "@type": "Offer", "name": "Standard House Cleaning", "description": "Regular maintenance cleaning for homes. Includes all rooms dusted and vacuumed, kitchen and bathrooms sanitized, floors mopped, trash emptied.", "price": "150", "priceCurrency": "USD", "priceSpecification": { "@type": "PriceSpecification", "minPrice": "150", "maxPrice": "350", "priceCurrency": "USD" }, "itemOffered": { "@type": "Service", "name": "Standard Cleaning", "serviceType": "House Cleaning" } },
      { "@type": "Offer", "name": "Deep House Cleaning", "description": "Comprehensive deep cleaning including baseboards, inside cabinets, light fixtures, and all surfaces.", "price": "250", "priceCurrency": "USD", "priceSpecification": { "@type": "PriceSpecification", "minPrice": "250", "maxPrice": "500", "priceCurrency": "USD" }, "itemOffered": { "@type": "Service", "name": "Deep Cleaning", "serviceType": "Deep House Cleaning" } },
      { "@type": "Offer", "name": "Move In / Move Out Cleaning", "description": "Complete top-to-bottom cleaning for move-ins and move-outs. Includes inside appliances, windows, and inspection-ready clean.", "price": "300", "priceCurrency": "USD", "priceSpecification": { "@type": "PriceSpecification", "minPrice": "300", "maxPrice": "600", "priceCurrency": "USD" }, "itemOffered": { "@type": "Service", "name": "Move In/Out Cleaning", "serviceType": "Move Out Cleaning" } },
      { "@type": "Offer", "name": "Carpet Cleaning", "description": "Professional deep extraction carpet cleaning for all carpet types. Includes stain treatment and odor elimination.", "itemOffered": { "@type": "Service", "name": "Carpet Cleaning", "serviceType": "Carpet Cleaning" } },
      { "@type": "Offer", "name": "Upholstery Cleaning", "description": "Expert furniture and fabric cleaning for sofas, chairs, and all upholstered items.", "itemOffered": { "@type": "Service", "name": "Upholstery Cleaning", "serviceType": "Upholstery Cleaning" } }
    ]
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Ashleigh Craig" },
      "reviewBody": "I used Tidywise to do a deep clean of my home, and I couldn't be happier with the results! The team arrived on time, fully equipped, and ready to work. They paid attention to every detail—baseboards, windows, inside appliances—nothing was missed."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Sallie Sutherland" },
      "reviewBody": "Tidy Wise in less than 12 hours got two women to my home over a holiday weekend. They were the most efficient, fast, capable young women I've ever met. It really saved my day."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Charlie Dubb" },
      "reviewBody": "The ladies cleaned my 30 year, unoccupied house FLAWLESSLY. Sadly, the Florida 'critters' had completely taken the place over, but you'd never know it now! THANK YOU!"
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${WEBSITE}/#website`,
  "url": WEBSITE,
  "name": BUSINESS_NAME,
  "description": "Professional house cleaning in Fort Lauderdale, Boca Raton, West Palm Beach & 40+ South Florida cities",
  "publisher": { "@id": `${WEBSITE}/#business` },
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${WEBSITE}/service-areas?q={search_term_string}` },
    "query-input": "required name=search_term_string"
  }
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "TIDYWISE House Cleaning Service — South Florida",
  "description": "See how TIDYWISE delivers professional home cleaning across Fort Lauderdale, Boca Raton, and 40+ South Florida cities.",
  "thumbnailUrl": `${WEBSITE}/og-image.webp`,
  "uploadDate": "2025-01-01",
  "duration": "PT2M30S",
  "publisher": { "@id": `${WEBSITE}/#business` }
};

const SEOSchema = ({ 
  pageTitle, 
  pageDescription, 
  canonicalUrl,
  pageType = 'home',
  county,
  cityName,
  blogMeta,
  faqItems,
  breadcrumbs
}: SEOSchemaProps) => {
  const isHome = pageType === 'home';

  // Build breadcrumb schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  } : pageType !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": WEBSITE },
      ...(county && pageType === 'city' ? [
        { "@type": "ListItem", "position": 2, "name": `${county} Cleaning`, "item": `${WEBSITE}/${county.toLowerCase().replace(/\s+/g, '-').replace('county', 'county-cleaning')}` },
        { "@type": "ListItem", "position": 3, "name": cityName ? `${cityName} Cleaning` : pageTitle, "item": canonicalUrl }
      ] : [
        { "@type": "ListItem", "position": 2, "name": pageTitle.replace(' | TIDYWISE', ''), "item": canonicalUrl }
      ])
    ]
  } : null;

  // FAQ schema
  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  } : null;

  // Blog schema
  const blogPostingSchema = pageType === 'blog' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "image": `${WEBSITE}/og-image.webp`,
    "datePublished": blogMeta?.datePublished || "2025-01-15",
    "dateModified": blogMeta?.dateModified || "2025-03-08",
    "author": { "@type": "Organization", "name": BUSINESS_NAME, "url": WEBSITE },
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS_NAME,
      "logo": { "@type": "ImageObject", "url": `${WEBSITE}/logo.webp` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    ...(blogMeta?.category && { "articleSection": blogMeta.category }),
    ...(blogMeta?.readTime && { "timeRequired": `PT${blogMeta.readTime.replace(/\D/g, '')}M` })
  } : null;

  // Service schema
  const serviceSchema = pageType === 'service' ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageTitle.replace(' | TIDYWISE', ''),
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": { "@id": `${WEBSITE}/#business` },
    "areaServed": { "@type": "AdministrativeArea", "name": "South Florida" },
    "termsOfService": `${WEBSITE}/faq`
  } : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType === 'blog' ? 'article' : 'website'} />
      <meta property="og:image" content={`${WEBSITE}/og-image.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TIDYWISE professional cleaning service in South Florida" />
      <meta property="og:site_name" content={BUSINESS_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${WEBSITE}/og-image.webp`} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Deerfield Beach" />
      <meta name="geo.position" content="26.3182;-80.0944" />
      <meta name="ICBM" content="26.3182, -80.0944" />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en-us" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* Homepage schemas */}
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(cleaningServiceSchema)}
        </script>
      )}
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      )}

      {/* Non-home pages get a simplified business reference */}
      {!isHome && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CleaningService",
            "@id": `${WEBSITE}/#business`,
            "name": BUSINESS_NAME,
            "url": WEBSITE,
            "telephone": PHONE
          })}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {blogPostingSchema && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOSchema;
