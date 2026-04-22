import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Point de départ du projet",
  description: "Formulaire de cadrage projet — arnaudcrestey.com"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
