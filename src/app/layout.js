import { Geist, Geist_Mono } from "next/font/google";
import SpaceBackground from "@/components/SpaceBackground";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ROOT_METADATA, ROOT_VIEWPORT } from "@/data/site";
import Footer from "@/components/Footer";
export const metadata = ROOT_METADATA;
export const viewport = ROOT_VIEWPORT;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#000119] text-white relative min-h-screen">
        <Navbar/>
        {/* Yeh background ab poori website par har page ke peeche fixed rahega */}
        <SpaceBackground />

        {/* Website ke baaki pages/content yahan render honge */}
        {children}
      <Footer />

      </body>
    </html>
  );
}
