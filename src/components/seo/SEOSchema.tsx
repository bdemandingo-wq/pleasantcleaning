import { Helmet } from 'react-helmet-async';

interface SEOSchemaProps {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  pageType?: 'home' | 'county' | 'blog' | 'service';
  county?: string;
  /** Blog-specific fields for BlogPosting schema */
  blogMeta?: {
    datePublished?: string;
    dateModified?: string;
    readTime?: string;
    category?: string;
  };
}

const SEOSchema = ({ 
  pageTitle, 
  pageDescription, 
  canonicalUrl,
  pageType = 'home',
  county,
  blogMeta
}: SEOSchemaProps) => {
  const businessName = "TIDYWISE Cleaning Services";
  const businessAddress = {
    streetAddress: "65 SW 12th Ave",
    addressLocality: "Deerfield Beach",
    addressRegion: "FL",
    postalCode: "33442",
    addressCountry: "US"
  };
  const phoneNumber = "+1-561-571-8725";
  const website = "https://tidywisecleaning.com";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${website}/#organization`,
    "name": businessName,
    "description": "Professional cleaning services for homes and businesses in South Florida. Serving Broward County, Miami-Dade County, and Palm Beach County.",
    "url": website,
    "telephone": phoneNumber,
    "email": "support@tidywisecleaning.com",
    "priceRange": "$$",
    "image": `${website}/og-image.webp`,
    "logo": `${website}/logo.webp`,
    "address": {
      "@type": "PostalAddress",
      ...businessAddress
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.3182,
      "longitude": -80.0944
    },
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 26.3182,
          "longitude": -80.0944
        },
        "geoRadius": "80467"
      },
      { "@type": "AdministrativeArea", "name": "Broward County, Florida" },
      { "@type": "AdministrativeArea", "name": "Miami-Dade County, Florida" },
      { "@type": "AdministrativeArea", "name": "Palm Beach County, Florida" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Cleaning",
            "description": "Regular maintenance cleaning for homes and offices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Deep Cleaning",
            "description": "Thorough deep cleaning for every corner of your space"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Move In/Out Cleaning",
            "description": "Complete cleaning for moving transitions"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/tidywisecleaning",
      "https://www.instagram.com/tidywisecleaning"
    ]
  };

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Ashleigh Craig"
        },
        "reviewBody": "I used Tidywise to do a deep clean of my home, and I couldn't be happier with the results! From the moment I booked, the communication was professional and prompt. The team arrived on time, fully equipped, and ready to work. They paid attention to every detail—baseboards, windows, inside appliances—nothing was missed. My home looked and smelled amazing afterward. Highly recommend Tidywise if you're looking for reliable, trustworthy, and high-quality service!"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sallie Sutherland"
        },
        "reviewBody": "I had an emergency due to the five men that entered my home to put up ductwork and there was failure everywhere. Tidy Wise in less than 12 hours got two women to my home over a holiday weekend. They were the most efficient, fast, capable young women I've ever met. It really saved my day. Saved my home."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Charlie Dubb"
        },
        "reviewBody": "OMGoodness! The ladies cleaned my 30 year, unoccupied house FLAWLESSLY. Sadly, the Florida 'critters' had completely taken the place over, but you'd never know it now! THANK YOU!"
      }
    ]
  };

  const breadcrumbSchema = pageType !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": website
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": county ? `${county} Cleaning Services` : pageTitle,
        "item": canonicalUrl
      }
    ]
  } : null;

  const blogPostingSchema = pageType === 'blog' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "image": `${website}/og-image.webp`,
    "datePublished": blogMeta?.datePublished || "2025-01-15",
    "dateModified": blogMeta?.dateModified || blogMeta?.datePublished || "2025-01-15",
    "author": {
      "@type": "Organization",
      "name": businessName,
      "url": website
    },
    "publisher": {
      "@type": "Organization",
      "name": businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${website}/logo.webp`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    ...(blogMeta?.category && { "articleSection": blogMeta.category }),
    ...(blogMeta?.readTime && { "timeRequired": `PT${blogMeta.readTime.replace(/\D/g, '')}M` })
  } : null;

  const serviceSchema = pageType === 'service' ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageTitle.replace(' | TIDYWISE', ''),
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${website}/#organization`
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Broward County, Florida" },
      { "@type": "AdministrativeArea", "name": "Miami-Dade County, Florida" },
      { "@type": "AdministrativeArea", "name": "Palm Beach County, Florida" }
    ]
  } : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType === 'blog' ? 'article' : 'website'} />
      <meta property="og:image" content={`${website}/og-image.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={businessName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${website}/og-image.webp`} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Deerfield Beach" />
      <meta name="geo.position" content="26.3182;-80.0944" />
      <meta name="ICBM" content="26.3182, -80.0944" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(reviewsSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
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
