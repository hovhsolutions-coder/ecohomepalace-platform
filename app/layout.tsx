import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import Analytics from "./analytics";
import { FunnelDebug } from "@/components/FunnelDebug";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eco Home Palace | Find Trusted Home Professionals",
    template: "%s | Eco Home Palace",
  },
  description: "Find trusted professionals for renovation, repair, solar, plumbing, electrical work and more. Get 3 free quotes from verified installers in your area.",
  keywords: ["home improvement", "solar panels", "renovation", "plumbing", "electrical", "heat pumps", "insulation", "home professionals"],
  authors: [{ name: "Eco Home Palace" }],
  creator: "Eco Home Palace",
  publisher: "Eco Home Palace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ecohomepalace.com",
    siteName: "Eco Home Palace",
    title: "Eco Home Palace | Find Trusted Home Professionals",
    description: "Find trusted professionals for renovation, repair, solar, plumbing, electrical work and more. Get 3 free quotes from verified installers in your area.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Home Palace | Find Trusted Home Professionals",
    description: "Find trusted professionals for renovation, repair, solar, plumbing, electrical work and more. Get 3 free quotes from verified installers in your area.",
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
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <Analytics /> */}
        <FunnelDebug />
        {children}
      </body>
    </html>
  );
}
