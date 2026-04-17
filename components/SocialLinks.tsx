"use client";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

export const SocialLinks = () => {
  const { socialLinks } = siteConfig;

  const links = [
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      href: socialLinks.whatsapp,
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: socialLinks.instagram,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: socialLinks.facebook,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: socialLinks.linkedin,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Acessar ${link.name}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white transition-colors duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon className="h-6 w-6 relative z-10 transition-transform duration-300" />

            {/* Glow effect matching tailwind config styling */}
            <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_2px_hsl(var(--primary))] bg-glow/20 blur-md pointer-events-none"></span>
          </motion.a>
        );
      })}
    </div>
  );
};
