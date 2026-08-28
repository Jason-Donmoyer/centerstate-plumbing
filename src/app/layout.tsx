import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import FloatingEmergencyButton from '../components/site/FloatingEmergencyButton'
import { Toaster } from 'sonner'
import Script from 'next/script'


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const title = "Monmouth County NJ Plumber | New Construction & Renovations | Centerstate Plumbing"
const description = "Licensed NJ Master Plumber serving Monmouth County, NJ. Specializing in new construction, renovations, residential and commercial plumbing, water heaters, gas piping and more."
const images = "/og-image.jpg"

const ldJsonObject = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Centerstate Plumbing and Heating",
  "legalName": "Centerstate Plumbing and Heating LLC",
  "telephone": "+17323339508",
  "priceRange": "$$",
  "description": "Licensed NJ Master Plumber specializing in new construction, renovations, residential and commercial plumbing throughout Monmouth County, NJ.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Union Beach",
    "addressRegion": "NJ",
    "postalCode": "07735",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.4476,
    "longitude": -74.1902
  },
  "url": "https://www.centerstateplumbingnj.com",
  "sameAs": [
  "https://www.google.com/maps/place/Centerstate+Plumbing+and+Heating/@40.2991125,-74.249818,10z/data=!3m1!4b1!4m6!3m5!1s0x430c10e37ba8b97:0x5ecffa7f523f7f57!8m2!3d40.2991125!4d-74.249818!16s%2Fg%2F11zdtfffjn"
],
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "Monmouth County, NJ"
    }
  ],
  "hasCredential": {
  "@type": "EducationalOccupationalCredential",
  "credentialCategory": "NJ Master Plumber License",
  "name": "NJ Master Plumber License #13826"
},
  "knowsAbout": [
  "New Construction Plumbing",
  "Plumbing Renovations",
  "Residential Plumbing",
  "Commercial Plumbing",
  "Bathroom Renovation Plumbing",
  "Kitchen Renovation Plumbing",
  "Gas Piping",
  "Water Heaters",
  "Tankless Water Heaters",
  "Boilers",
  "Water Filtration"
]
}

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://www.centerstateplumbingnj.com'),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    images,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonObject) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {/* <Nav /> */}
        {children}
        <FloatingEmergencyButton></FloatingEmergencyButton>
        <Toaster position="top-right" />

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18415299924"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18415299924');
          `}
        </Script>
      </body>
    </html>
  );
}
