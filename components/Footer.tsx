"use client";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-black py-12">
      <div className="container px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/#inicio" className="relative flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 h-16">
              <Image src="/logo.png" alt={`${siteConfig.name} Logo`} width={400} height={400} className="w-auto h-full object-contain" />
            </Link>
            <p className="text-sm text-white/60">
              © {currentYear} {siteConfig.name} — Todos os direitos reservados.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {siteConfig.navLinks.map((link) => {
              const resolveHref = link.href.startsWith('#') ? `/${link.href}` : link.href;
              return (
                <Link
                  key={link.label}
                  href={resolveHref}
                  className="text-sm text-white/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            {siteConfig.description}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


