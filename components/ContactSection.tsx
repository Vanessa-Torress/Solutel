"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, LucideIcon } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";


const contactSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  assunto: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  mensagem: z.string().min(10, "Mensagem muito curta"),
});

type ContactValues = z.infer<typeof contactSchema>;

const ContactInfoItem = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
    <div className="rounded-lg bg-primary/10 p-3 text-primary">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-sm text-white/40">{label}</div>
      <div className="font-medium text-white">{value}</div>
    </div>
  </div>
);

const FormInput = ({ type = "text", placeholder, error, className = "", isTextArea = false, register, name }: { 
  type?: string; 
  placeholder: string; 
  error?: string; 
  className?: string; 
  isTextArea?: boolean; 
  register: UseFormRegister<ContactValues>; 
  name: keyof ContactValues; 
}) => {
  const commonClasses = "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all focus:bg-white/10 " + (error ? "border-red-500/50" : "") + " " + className;
  
  return (
    <div className="space-y-1 w-full">
      {isTextArea ? (
        <textarea {...register(name)} rows={5} placeholder={placeholder} className={commonClasses + " resize-none"} />
      ) : (
        <input {...register(name)} type={type} placeholder={placeholder} className={commonClasses} />
      )}
      {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
    </div>
  );
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        type: "orçamento",
        nome: data.nome,
        email: data.email,
        assunto: data.assunto,
        mensagem: data.mensagem,
      };

      const endpoint = "/api/send-email";
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(errorData.error || "Erro ao enviar e-mail.");
      }

      toast.success("Mensagem enviada com sucesso!", {
        description: `Sua solicitação de orçamento foi enviada para ${siteConfig.contact.email}.`,

      });
      reset();
    } catch (error: unknown) {
      console.error("Erro no contato:", error);
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error("Erro ao enviar mensagem", {
        description: message || "Ocorreu um problema ao conectar com o serviço de e-mail local.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Phone, label: "Telefone", value: siteConfig.contact.phone },
    { icon: Mail, label: "E-mail", value: siteConfig.contact.email },
    { icon: MapPin, label: "Endereço", value: siteConfig.contact.address },
  ];

  return (
    <section id="contato" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container relative z-10 px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Contato</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-4 text-white">
            Vamos <span className="text-gradient">conversar</span>?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Entre em contato e receba um orçamento personalizado para o seu projeto de TI.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            {contactItems.map((item) => (
              <ContactInfoItem key={item.label} {...item} />
            ))}
          </motion.div>

          {/* Form Side */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 space-y-6 backdrop-blur-sm"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput name="nome" register={register} error={errors.nome?.message} placeholder="Seu Nome" />
              <FormInput name="email" register={register} error={errors.email?.message} type="email" placeholder="Seu E-mail" />
            </div>
            <FormInput name="assunto" register={register} error={errors.assunto?.message} placeholder="Assunto" />
            <FormInput isTextArea name="mensagem" register={register} error={errors.mensagem?.message} placeholder="Descreva seu projeto ou necessidade..." />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg bg-primary px-10 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-box disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensagem
                  <Send size={18} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

