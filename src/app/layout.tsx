import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { unstable_ViewTransition as ViewTransition } from 'react'
import { Toaster } from "@/components/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  height: 'device-height'
}

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_HOST}`),
  title: "Miguel Gonçalves",
  description: "Miguel Gonçalves Software Engineer",
  keywords: 'Software Engineer portfolio next.js typescript react.js javascript tailwind supabase craftercms',
  creator: 'Miguel Gonçalves',
  robots: `${process.env.NEXT_PUBLIC_APP_HOST}/robots.txt`,
  openGraph: {
    locale: 'en_US',
    siteName: "Miguel Gonçalves",
    description: "Miguel Gonçalves Software Engineer",
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_APP_HOST}`
  },
  twitter: {
    title: "Miguel Gonçalves",
    creator: 'Miguel Gonçalves',
    site: '@Miguel Gonçalves',
    card: 'summary_large_image',
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
        <Analytics/>
        <SpeedInsights />
        <Toaster/>
        <div className="min-h-screen">
          <Header/>
          <ViewTransition>
            {children}  
          </ViewTransition>  
        </div>
        <Footer/>
      </body>
    </html>
  );
}
