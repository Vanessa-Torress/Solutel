"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface NavItemProps {
  label: string;
  href: string;
  onClick?: () => void;
}

const Logo = ({ isScrolled }: { isScrolled: boolean }) => {
  const lenis = useLenis();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      lenis?.scrollTo('#inicio', { offset: -80 });
    }
  };

  return (
    <Link href="/#inicio" onClick={handleClick} className={`relative flex-shrink-0 flex items-center justify-center mix-blend-screen transition-all duration-300 hover:scale-105 ${isScrolled ? 'h-9' : 'h-14'}`}>
      <Image src="/logo.jpg" alt={`${siteConfig.name} Logo`} width={400} height={400} className="w-auto h-full object-contain" priority />
    </Link>
  );
};

const NavItem = ({ label, href, onClick }: NavItemProps) => {
  const resolveHref = href.startsWith('#') ? `/${href}` : href;
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#') && typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      lenis?.scrollTo(href, { offset: -80 });
    }
    if (onClick) onClick();
  };
  
  return (
    <Link
      href={resolveHref}
      onClick={handleClick}
      className="text-sm font-medium text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-border/50 bg-black backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'border-b shadow-lg' : 'border-b-0'}`}>
      <div className={`container relative flex items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
        <div className="flex-shrink-0 z-50">
          <Logo isScrolled={isScrolled} />
        </div>

        {/* Desktop Navigation (Centered) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {siteConfig.navLinks.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </div>

        {/* Desktop Action Buttons (Right Aligned) */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-4 z-50">
          <Link
            href="/trabalhe-conosco"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-box"
          >
             Trabalhe Conosco
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container flex flex-col gap-4 py-6">
              {siteConfig.navLinks.map((link) => (
                <NavItem key={link.href} {...link} onClick={() => setOpen(false)} />
              ))}
              <Link
                href="/trabalhe-conosco"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground mt-2 glow-box"
              >
                Trabalhe Conosco
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

