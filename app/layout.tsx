import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./redesign.css";

export const viewport: Viewport = {width:"device-width",initialScale:1,viewportFit:"cover",interactiveWidget:"resizes-content"};

export const metadata: Metadata = {
  title: "Estude Erem — Seu espaço de estudos",
  description: "Suas matérias, seu ritmo. Organize a rotina, pratique e acompanhe sua evolução.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
