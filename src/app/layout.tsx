import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "CORSFIXER | Decode & Fix CORS Errors Instantly",
  description: "A lightweight, ultra-fast tool to decode, explain, and fix CORS errors for developers. Get framework-specific solutions in seconds.",
  keywords: ["cors error", "blocked by cors policy", "cors fix", "how to fix cors", "cors nodejs", "cors react", "cors flask"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey="pk_test_Y3VycmVudC1sZW11ci03OC5jbGVyay5hY2NvdW50cy5kZXYk">
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
