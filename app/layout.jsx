// app/layout.jsx - Updated with accessibility and SEO improvements
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import SkipNav from "@/components/SkipNav";
import ErrorBoundary from "@/components/ErrorBoundary";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
  display: 'swap', // Improve font loading performance
});

export const metadata = {
  title: {
    default: "Mohammed Naeem Ahmed - Portfolio",
    template: "%s | Mohammed Naeem Ahmed"
  },
  description: "First-class Computer & Data Science graduate specializing in AI/ML, full-stack development, and creating impactful digital solutions.",
  keywords: "Mohammed Naeem Ahmed, Portfolio, Full Stack Developer, AI/ML Engineer, Computer Science, Birmingham City University, React, Next.js, Python, TensorFlow",
  authors: [{ name: "Mohammed Naeem Ahmed", url: "https://naeemcodes.com" }],
  creator: "Mohammed Naeem Ahmed",
  publisher: "Mohammed Naeem Ahmed",
  metadataBase: new URL('https://naeemcodes.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naeemcodes.com",
    title: "Mohammed Naeem Ahmed - Portfolio",
    description: "First-class Computer & Data Science graduate specializing in AI/ML, full-stack development, and creating impactful digital solutions.",
    siteName: "Mohammed Naeem Ahmed Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Mohammed Naeem Ahmed - Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Naeem Ahmed - Portfolio",
    description: "First-class Computer & Data Science graduate specializing in AI/ML, full-stack development, and creating impactful digital solutions.",
    images: ["/og-image.jpg"],
    creator: "@your_twitter_handle" // Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add when you set up Google Search Console
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-primary text-white">
        <SkipNav />
        <ErrorBoundary fallbackMessage="Something went wrong with the page. Please refresh to try again.">
          <Header />
          <StairTransition />
          <main id="main-content" tabIndex={-1}>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}