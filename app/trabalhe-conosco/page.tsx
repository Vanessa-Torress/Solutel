"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, FileType, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PageTransition } from "@/components/PageTransition";


const formSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve conter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Insira um endereço de e-mail válido." }),
  telefone: z.string().min(10, { message: "Telefone deve conter DDD e número válido." }),
  area: z.string().min(1, { message: "Selecione uma área de interesse." }),
  vaga: z.string().min(2, { message: "Informe a vaga desejada." }),
  mensagem: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function TrabalheConosco() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      area: "",
      vaga: "",
      mensagem: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Formato inválido. Apenas PDF, DOC, DOCX ou Imagens (JPG, PNG) são permitidos.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("O arquivo excede o limite de 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      toast.error("Por favor, anexe seu currículo antes de enviar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("type", "currículo");
      formData.append("nome", data.nome);
      formData.append("email", data.email);
      formData.append("telefone", data.telefone);
      formData.append("area", data.area);
      formData.append("vaga", data.vaga);
      formData.append("mensagem", data.mensagem || "");
      formData.append("curriculo", selectedFile);

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Falha ao enviar e-mail.");
      }

      toast.success("Candidatura enviada com sucesso!", {
        description: `Seu currículo foi enviado para ${siteConfig.contact.email}.`,

        icon: <CheckCircle2 className="text-green-500" />
      });

      reset();
      removeFile();

    } catch (error: unknown) {
      console.error("Erro no envio:", error);
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error("Erro ao enviar a candidatura.", {
        description: message || "Ocorreu um problema ao conectar com o servidor. Tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/network-bg.jpg" alt="Fundo Tecnológico" fill className="object-cover opacity-40 mix-blend-screen" priority />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />

        <main className="flex-1 pt-28 pb-16">
          <PageTransition>
            <div className="container max-w-4xl xl:max-w-5xl mx-auto px-6 md:px-12">
            <div className="mb-12 text-center">
              <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                Trabalhe Conosco
              </h1>
              <p className="text-white/80 text-xl drop-shadow-md max-w-2xl mx-auto">
                Faça parte da nossa equipe de especialistas em telecomunicações e infraestrutura de TI.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-white/90">Nome Completo <span className="text-red-400">*</span></Label>
                    <Input
                      id="nome"
                      placeholder="João da Silva"
                      className="bg-black/60 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary backdrop-blur-sm"
                      {...register("nome")}
                    />
                    {errors.nome && <p className="text-red-400 text-sm mt-1">{errors.nome.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">E-mail <span className="text-red-400">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@exemplo.com"
                      className="bg-black/60 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary backdrop-blur-sm"
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-white/90">Telefone / WhatsApp <span className="text-red-400">*</span></Label>
                    <Input
                      id="telefone"
                      placeholder="(11) 98765-4321"
                      className="bg-black/60 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary backdrop-blur-sm"
                      {...register("telefone")}
                    />
                    {errors.telefone && <p className="text-red-400 text-sm mt-1">{errors.telefone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-white/90">Área de Interesse <span className="text-red-400">*</span></Label>
                    <Select onValueChange={(value) => setValue("area", value, { shouldValidate: true })} value={watch("area")}>
                      <SelectTrigger className="bg-black/60 border-white/20 text-white focus:ring-primary backdrop-blur-sm">
                        <SelectValue placeholder="Selecione uma área" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value="redes">Engenharia de Redes</SelectItem>
                        <SelectItem value="suporte">Suporte Técnico</SelectItem>
                        <SelectItem value="cabeamento">Cabeamento Estruturado</SelectItem>
                        <SelectItem value="seguranca">Segurança da Informação</SelectItem>
                        <SelectItem value="vendas">Comercial / Vendas</SelectItem>
                        <SelectItem value="administrativo">Administrativo</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.area && <p className="text-red-400 text-sm mt-1">{errors.area.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vaga" className="text-white/90">Vaga Desejada <span className="text-red-400">*</span></Label>
                    <Input
                      id="vaga"
                      placeholder="Ex: Técnico de Redes"
                      className="bg-black/60 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary backdrop-blur-sm"
                      {...register("vaga")}
                    />
                    {errors.vaga && <p className="text-red-400 text-sm mt-1">{errors.vaga.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="mensagem" className="text-white/90 text-sm md:text-base">Apresentação Resumida</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Conte um pouco sobre suas habilidades e por que deseja trabalhar na Solutel..."
                    className="bg-black/60 border-white/20 text-white placeholder:text-white/30 min-h-[160px] focus-visible:ring-primary backdrop-blur-sm text-base"
                    {...register("mensagem")}
                  />
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  <Label className="text-white/90 block">Currículo (PDF, DOCX ou Imagem - Máx 5MB) <span className="text-red-400">*</span></Label>

                  <div
                    className={`border-2 border-dashed rounded-xl p-6 transition-all text-center backdrop-blur-sm
                      ${selectedFile ? 'border-primary/50 bg-primary/10' : 'border-white/20 hover:border-white/40 hover:bg-white/10 bg-black/40'}`
                    }
                  >
                    <Input
                      type="file"
                      id="curriculo"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    {!selectedFile ? (
                      <label htmlFor="curriculo" className="cursor-pointer flex flex-col items-center justify-center gap-3">
                        <div className="bg-white/10 p-4 rounded-full">
                          <Upload className="h-6 w-6 text-white/70" />
                        </div>
                        <div>
                          <p className="text-primary font-medium hover:underline">Clique para selecionar</p>
                          <p className="text-xs text-white/50 mt-1">ou arraste e solte o arquivo aqui</p>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between bg-black/60 p-3 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 truncate">
                          <FileType className="h-8 w-8 text-primary flex-shrink-0" />
                          <div className="text-left truncate">
                            <p className="text-sm font-medium text-white truncate max-w-[200px] md:max-w-md">{selectedFile.name}</p>
                            <p className="text-xs text-white/50">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={removeFile}
                          className="text-white/50 hover:text-red-400 hover:bg-red-400/10"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-lg font-bold py-8 rounded-xl glow-box shadow-xl hover:shadow-primary/30"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando Candidatura...
                      </span>
                    ) : "Enviar Candidatura"}
                  </Button>
                </div>

              </form>
            </div>
          </div>
          </PageTransition>
        </main>

        <Footer />
      </div>
    </div>
  );
}
