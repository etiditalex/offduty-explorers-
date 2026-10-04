import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteUrl } from "@/data/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Offduty Explorers — Group journeys in Kenya and beyond",
    template: "%s · Offduty Explorers",
  },
  description:
    "Offduty Explorers takes people out in groups to unwind. Kenya and beyond, beginning with Lamu and Arusha. Cofounded by Kibandi Esther.",
  applicationName: "Offduty Explorers",
  authors: [{ name: "Kibandi Esther" }],
  icons: { icon: "/logo.jpg" },
  openGraph: {
    siteName: "Offduty Explorers",
    type: "website",
    locale: "en_KE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
