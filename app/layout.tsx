import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "BuildVision | From Drawings to Procurement in Minutes",
  description: "AI-powered tools for mechanical contractors. Equipment detection, spec writing, and procurement workflows that structure your MEP equipment decisions.",
  keywords: ["MEP", "construction", "equipment", "procurement", "AI", "mechanical contractors", "HVAC", "electrical"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
