import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL("https://rochesterfoamdartleague.com"),
  title: {
    default: "Rochester Foam Dart League | Foam Dart Nation Est. 2015",
    template: "%s | Rochester Foam Dart League",
  },
  description:
    "The Rochester Foam Dart League offers Nerf birthday parties, weekly play, fundraisers, school programs, and special events in Rochester, Buffalo, and Syracuse. We partner with Dart Zone blasters!",
  keywords: [
    "Nerf",
    "foam dart",
    "Rochester",
    "Buffalo",
    "Syracuse",
    "birthday party",
    "Dart Zone",
    "foam dart league",
    "nerf party",
    "nerf battles",
  ],
  authors: [{ name: "Rochester Foam Dart League" }],
  creator: "Rochester Foam Dart League",
  publisher: "Foam Dart Nation",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rochesterfoamdartleague.com",
    siteName: "Rochester Foam Dart League",
    title: "Rochester Foam Dart League | Foam Dart Nation Est. 2015",
    description:
      "The Rochester Foam Dart League offers Nerf birthday parties, weekly play, fundraisers, school programs, and special events in Rochester, Buffalo, and Syracuse.",
    images: [
      {
        url: "/pictures/hero-logo.png",
        width: 800,
        height: 600,
        alt: "Rochester Foam Dart League",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rochester Foam Dart League | Foam Dart Nation Est. 2015",
    description:
      "Nerf birthday parties, weekly play, and special events in Rochester, Buffalo, and Syracuse.",
    images: ["/pictures/hero-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

