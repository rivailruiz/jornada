import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wandrly",
  description: "Collections of inspiring routes and destinations around the world."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-brand-black">{children}</body>
    </html>
  );
}
