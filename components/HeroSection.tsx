"use client";
import { useEffect, useState, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { ArrowRight, Wifi, Shield, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(value);
      return;
    }

    const numStr = match[1].replace(',', '.');
    const targetNum = parseFloat(numStr);
    const suffix = match[2];
    const isFloat = numStr.includes('.');

    const controls = animate(0, targetNum, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (val) => {
        setDisplayValue(isFloat ? val.toFixed(1) + suffix : Math.round(val) + suffix);
      }
    });

    return controls.stop;
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#020817]">
        <Image src="/hero-background.jpg.png" alt="Fundo Solutel" fill className="object-cover opacity-70" quality={100} priority />

        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      <div className="container relative z-20 pt-24 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
              <Zap size={14} />
              Infraestrutura de rede de alta performance
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-black tracking-tighter leading-[1.05] mb-8 drop-shadow-2xl text-white">
              Conectamos o seu{" "}
              <span className="text-gradient drop-shadow-[0_0_20px_hsl(var(--primary)_/_0.5)]">negócio</span> ao{" "}
              <span className="text-gradient drop-shadow-[0_0_20px_hsl(var(--primary)_/_0.5)]">futuro</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Soluções completas em redes de computadores, <span className="text-white">cabeamento estruturado</span>,
              segurança de rede e infraestrutura de TI para empresas que exigem
              confiabilidade e performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contato"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-box"
              >
                Fale Conosco
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#servicos"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3.5 font-semibold text-secondary-foreground transition-all hover:bg-secondary/80"
              >
                Nossos Serviços
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-none md:max-w-lg"
          >
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 text-primary" size={20} />
                <div className="text-2xl font-heading font-bold text-foreground">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

