// Add structured data to the page
document.addEventListener('DOMContentLoaded', function() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "InteriorDesignCompany",
        "name": "Kebly Interior Design",
        "alternateName": "قبلي للتصميم الداخلي",
        "description": "Professional interior design services, home renovation, and office design in Libya",
        "url": "https://kebly.co",
        "logo": "https://kebly.co/images/logo/logo.png",
        "image": "https://kebly.co/images/logo/logo.png",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shatt Road",
            "addressLocality": "Tripoli",
            "addressCountry": "Libya"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "32.8872",
            "longitude": "13.1913"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+218930810080",
            "contactType": "customer service",
            "email": "info@kebly.co",
            "availableLanguage": ["Arabic", "English"]
        },
        "sameAs": [
            "https://www.facebook.com/Keblypage/",
            "https://www.instagram.com/keblyco/"
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "priceRange": "$$",
        "areaServed": "Libya",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Interior Design Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Residential Interior Design"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Commercial Interior Design"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Home Renovation"
                    }
                }
            ]
        }
    };

    // Create script element for structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
}); 