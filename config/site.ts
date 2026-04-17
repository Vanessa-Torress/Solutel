import { Shield, Server, Wifi, Cable, PhoneCall, Zap, CheckCircle2, Briefcase, RadioTower } from "lucide-react";


export const siteConfig = {
  name: "Solutel",
  title: "Solutel - Redes de Computadores",
  description: "Soluções completas em redes de computadores, cabeamento estruturado e infraestrutura de TI.",
  contact: {
    email: "adm@solutel.com.br",
    phone: "(34) 3313-3333",
    address: "Av. João XXIII, 774 - Parque das Americas - Uberaba - MG, 38045-100",
  },
  navLinks: [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ],
  services: [
    {
      icon: Cable,
      title: "Cabeamento Estruturado",
      description: [
        "Instalação de redes padronizadas de acordo com as normas técnicas exigidas;",
        "Emissão de laudos certificados por ponto;",
        "Fusões de fibra óptica;",
        "Elaboração de projetos e As Built;"
      ],
    },
    {
      icon: Briefcase,
      title: "Consultoria",
      description: [
        "Os melhores planos de diferentes operadoras de acordo com o seu perfil;",
        "Conheça soluções que trarão otimização e novos recursos para sua empresa;",
        "Pague apenas se houver resultado real;"
      ],
    },
    {
      icon: Shield,
      title: "Firewall",
      description: [
        "Controle acessos à internet;",
        "Isole Rede fornecidas a seus visitantes;",
        "Tenha Portais de Autenticação;",
        "Conte com relatórios gerenciais;",
        "Tenha balanceamento e redundância de links;"
      ],
    },
    {
      icon: Wifi,
      title: "Wi-Fi Corporativo",
      description: [
        "Tenha equipamentos dimensionados para o local a ser coberto, garantindo assim uma irradiação plena em todos os ambientes;",
        "Tenha controle e aplique políticas para usuários conectados a sua rede;",
        "Esteja sempre on-line independentemente de onde estiver;"
      ],
    },
    {
      icon: RadioTower,
      title: "Enlaces",
      description: [
        "Mesmo em locais distantes, tenha acesso a mesma rede lógica, seja através de Fibra Óptica ou Enlaces de rádios digitais;"
      ],
    },
    {
      icon: PhoneCall,
      title: "Telefonia IP Corporativa",
      description: [
        "Melhore sua gestão com relatórios fáceis e modernos;",
        "Tenha quantidade ilimitada de ramais;",
        "Tenha mobilidade com ramais smartphones;",
        "Grave todas as suas ligações;",
        "Integre sistemas com sua telefonia;"
      ],
    },
  ],
  stats: [
    { icon: Wifi, label: "Redes instaladas", value: "2000+" },
    { icon: Shield, label: "Uptime garantido", value: "99.9%" },
    { icon: Zap, label: "Anos de experiência", value: "20+" },
  ],
  aboutStats: [
    { value: "2000+", label: "Projetos entregues" },
    { value: "250+", label: "Clientes ativos" },
    { value: "99.9%", label: "Disponibilidade" },
    { value: "8/5", label: "Suporte técnico" },
  ],
  highlights: [
    "Equipe certificada (Cisco, Ubiquiti, Mikrotik)",
    "Atendimento em todo o território nacional",
    "Suporte técnico com SLA garantido",
    "Projetos personalizados para cada cliente",
    "Materiais e equipamentos de primeira linha",
    "Garantia em todos os serviços executados",
  ],
  socialLinks: {
    instagram: "https://www.instagram.com/soluteltelecom/",
    facebook: "https://www.facebook.com/solutelsolucoes.telecomunicacoes",
    linkedin: "https://www.linkedin.com/in/soluteltelecom/",
    whatsapp: "https://api.whatsapp.com/send?phone=553433133333",
  },
};

