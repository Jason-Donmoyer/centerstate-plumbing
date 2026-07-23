import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import FloatingEmergencyButton from '../components/site/FloatingEmergencyButton'
import { Toaster } from 'sonner'


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const title = "NJ Master Plumber | Renovations, New Construction & Commercial | Centerstate Plumbing"
const description = "Licensed NJ Master Plumber serving Monmouth, Middlesex and Ocean Counties. Specializing in residential renovations, new construction and commercial plumbing. 25+ years experience. Call (732) 333-9508."
const images = "/og-image.jpg"

const ldJsonObject = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Centerstate Plumbing and Heating LLC",
  "telephone": "+17323339508",
  "priceRange": "$$",
  "description": "Licensed NJ Master Plumber specializing in residential renovations, new construction and commercial plumbing throughout Monmouth, Middlesex and Ocean Counties.",
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
  "url": "https://centerstateplumbingnj.com",
  "sameAs": [
    "https://www.google.com/maps?cid=YOUR_GOOGLE_CID"
  ],
  "areaServed": [
    { "@type": "County", "name": "Monmouth County" },
    { "@type": "County", "name": "Middlesex County" },
    { "@type": "County", "name": "Ocean County" }
  ],
  "hasCredentials": "NJ Master Plumber License #13826",
  "knowsabout": [
    "Residential Plumbing",
    "Commercial Plumbing",
    "Industrial Plumbing",
    "New Construction Plumbing",
    "Renovations",
    "Fit-Outs",
    "Hydronic Heating",
    "Water Heaters"
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
      </body>
    </html>
  );
}
