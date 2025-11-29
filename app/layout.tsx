import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guess Game",
  description: "A fun number guessing PWA game",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/gg-192.png",
    apple: "/icons/gg-192.png"
  },
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
