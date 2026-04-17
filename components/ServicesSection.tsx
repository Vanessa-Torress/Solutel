"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { CheckCircle2, LucideIcon } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, index }: { icon: LucideIcon, title: string, description: string | string[], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="group flex flex-col h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-all hover:glow-border hover:bg-card/80"
  >
    <div className="mb-5 inline-flex w-fit rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary/20 transition-colors">
      <Icon size={24} />
    </div>
    <h3 className={`text-xl font-heading font-semibold mb-3 ${title === "Cabeamento Estruturado" ? "text-white" : "text-foreground"}`}>{title}</h3>
    {Array.isArray(description) ? (
      <ul className="text-muted-foreground text-sm leading-relaxed space-y-3 flex-1">
        {description.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
    )}
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container relative z-10 px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Serviços</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-4">
            Soluções completas em <span className="text-gradient">redes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Da infraestrutura física à configuração lógica, cuidamos de toda a sua rede.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
