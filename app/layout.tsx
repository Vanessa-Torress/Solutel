import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Solutel - Engenharia de Redes e Infraestrutura de TI",
  description: "Especialistas em projetos de redes, cabeamento estruturado e soluções de TI para sua empresa.",
  keywords: ["Redes", "TI", "Infraestrutura", "Telecomunicações", "Solutel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#02050A] selection:bg-primary/30`}
      >
        <SmoothScroll>
          <TooltipProvider>
            <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col bg-background shadow-2xl border-x border-white/5 relative overflow-x-hidden">
              {children}
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
