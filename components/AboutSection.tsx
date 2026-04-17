"use client";
import { useEffect, useState, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-heading font-bold text-gradient">
      <AnimatedNumber value={value} />
    </div>
    <div className="text-sm text-muted-foreground mt-2">{label}</div>
  </div>
);

const HighlightItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={18} />
    <span className="text-sm text-foreground">{text}</span>
  </div>
);

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24">
      <div className="container px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Sobre nós</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 mb-6">
              A <span className="text-gradient">Solutel</span> é referência em redes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-justify">
              Há mais de 20 anos no mercado, com sede em Uberaba/MG, atuando nas Regiões Sul e Sudeste e com mais de 2.000 clientes, a <span className="text-blue-500 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">Solutel</span> Telecom vem se consolidando no seguimento de TI. Sempre focada na entrega e gestão de soluções com alta disponibilidade e considerável complexidade tecnológica, projetamos e executamos projetos de TI personalizados de acordo com a necessidade e particularidades do cliente. Sempre atualizados com novas tecnologias, buscamos e aprimoramos soluções para levar alta disponibilidade, grandes velocidades e redução de custos para nossos clientes.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {siteConfig.highlights.map((item) => (
                <HighlightItem key={item} text={item} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 glow-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {siteConfig.aboutStats.map((stat) => (
                  <StatItem key={stat.label} {...stat} />
                ))}
              </div>
            </div>
            {/* Glow decoration */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
