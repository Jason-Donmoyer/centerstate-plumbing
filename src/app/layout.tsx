import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingEmergencyButton from '../components/site/FloatingEmergencyButton'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Plumber Contractor | Union Beach, NJ"
const description = "Plumber Contractor, residential new and renovations, commercial ground up and fit out, RO - DI and chemical waste systems, sump pumps, water heaters"
const images = "/og-image.jpg"

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingEmergencyButton></FloatingEmergencyButton>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
