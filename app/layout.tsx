import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "DisparoHQ — Mensageria Pro para WhatsApp e SMS",
  description:
    "Envie mensagens em massa e transacionais, gerencie grupos e agende disparos em um painel amigável. Feito para negócios e operações que precisam de velocidade e simplicidade.",
  metadataBase: new URL("https://disparohq.local")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}