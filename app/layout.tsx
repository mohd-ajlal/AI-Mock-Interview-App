import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI MOCK INTERVIEW",
  description: "By Mohd Ajlal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
      <Toaster/>
        
        {children}</body>
    </html>
    
    </ClerkProvider>
  );
}
