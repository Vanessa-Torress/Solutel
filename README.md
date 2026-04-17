# Solutel - Conectando o Futuro

Bem-vindo ao repositório da **Solutel**, uma aplicação web de alta performance desenvolvida para apresentar soluções em infraestrutura de TI, redes de computadores e segurança corporativa.

![Solutel Logo](/public/logo.jpg)

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com o que há de mais moderno no ecossistema de desenvolvimento web:

- **React 18/19** - Biblioteca para interfaces de usuário.
- **Vite** - Build tool ultra-rápida.
- **TypeScript** - Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS** - Framework CSS utilitário para design responsivo e moderno.
- **Shadcn UI** - Componentes de UI acessíveis e altamente customizáveis.
- **Framer Motion** - Biblioteca para animações fluidas e interações premium.
- **Lucide React** - Set de ícones minimalistas e consistentes.

## ✨ Características (Features)

- **Design Premium**: Interface moderna com foco em estética e experiência do usuário (UX).
- **Totalmente Responsivo**: Otimizado para dispositivos móveis, tablets e desktops.
- **Arquitetura Limpa (Clean Code)**: Código modular, tipado e de fácil manutenção.
- **Configuração Centralizada**: Todos os textos e dados do site são gerenciados em um único arquivo (`src/config/site.ts`).
- **SEO Otimizado**: Metadados configurados para melhor visibilidade em motores de busca e redes sociais.

## 🛠️ Como Rodar Localmente

Siga os passos abaixo para preparar o ambiente de desenvolvimento:

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [npm](https://www.npmjs.com/) ou [Bun](https://bun.sh/)

### Passo a Passo

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/Vanessa-Torress/Solutel.git
   cd Solutel
   ```

2. **Instalar Dependências**
   Utilizando npm:
   ```bash
   npm install
   ```
   Ou utilizando Bun:
   ```bash
   bun install
   ```

3. **Executar o Servidor de Desenvolvimento**
   Utilizando npm:
   ```bash
   npm run dev
   ```
   Ou utilizando Bun:
   ```bash
   bun dev
   ```

4. **Acessar a Aplicação**
   Abra o seu navegador e acesse: `http://localhost:8080` (ou a porta indicada no terminal).

## 📁 Estrutura do Projeto

```text
Solutel/
├── public/              # Ativos estáticos (Logo, Ícones, Robots.txt)
├── src/
│   ├── assets/          # Imagens e recursos de mídia
│   ├── components/      # Componentes React (Navbar, Footer, Seções)
│   │   └── ui/          # Componentes de base (Shadcn UI)
│   ├── config/          # Configurações globais (site.ts)
│   ├── hooks/           # Custom Hooks
│   ├── lib/             # Utilitários e configurações de terceiros
│   ├── pages/           # Páginas da aplicação (Index, NotFound)
│   └── App.tsx          # Componente principal e rotas
├── tailwind.config.ts   # Configurações do Tailwind CSS
└── vite.config.ts       # Configurações do Vite
```

## ⚙️ Customização

Para alterar textos, serviços, fotos ou informações de contato, basta editar o arquivo:
`src/config/site.ts`

Este arquivo centraliza toda a inteligência de conteúdo do site, permitindo atualizações sem a necessidade de editar arquivos de estrutura `.tsx`.

---

Desenvolvido com foco em excelência e performance. 🌐
