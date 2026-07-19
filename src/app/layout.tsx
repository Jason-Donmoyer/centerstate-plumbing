import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google'
import "./globals.css";
import FloatingEmergencyButton from '../components/site/FloatingEmergencyButton'
import { Toaster } from 'sonner'
import Nav from '../components/site/Nav'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const title = "Plumber Contractor | Union Beach, NJ"
const description = "Plumber Contractor, residential new and renovations, commercial ground up and fit out, RO - DI and chemical waste systems, sump pumps, water heaters"
const images = "/og-image.jpg"

const ldJsonObject = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Centerstate Plumbing and Heating LLC",
  "telephone": "7323339508",
  "address": {
    "@type": "PostalAddress",
    // "streetAddress": "115 Ash Street",
    "addressLocality": "Union Beach",
    "addressRegion": "New Jersey",
    "postalCode": "07735"
  },
  "url": "https://centerstateplumbingnj.com"
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
