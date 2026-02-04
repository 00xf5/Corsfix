import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Hardcoded Clerk credentials
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??= 'pk_test_Y3VycmVudC1sZW11ci03OC5jbGVyay5hY2NvdW50cy5kZXYk';
process.env.CLERK_SECRET_KEY ??= 'sk_test_KSfBTF7RZ3sUQtv2NDXtk70OVoyPqq9KGHs7nZgE5K';

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
