export type Lang = "pt" | "en";

export const LINKS = {
  whatsapp: "https://wa.me/5511947832280",
  email: "mailto:antonio.developer@icloud.com",
  github: "https://github.com/Carloscavalcante97",
  // TODO: confirmar URL real do LinkedIn antes do lançamento
  linkedin: "https://www.linkedin.com/in/SEU-LINKEDIN",
  pipelineRepo: "https://github.com/Carloscavalcante97/pipeline-Claude",
} as const;

/** Stack completa — badges mono, iguais nas duas línguas */
export const STACK_BADGES = [
  "TypeScript", "C#", ".NET", "Java", "Spring Boot", "NestJS", "Node.js",
  "React", "Next.js", "PostgreSQL", "SQL Server", "EF Core", "Docker",
  "CI/CD", "LLM APIs",
] as const;

export interface Project {
  name: string;
  pitch: string;
  tags: string[];
  url: string;
}

export interface Highlight {
  title: string;
  body: string;
}

export interface SiteContent {
  hero: { label: string; title: string; ctaTalk: string; ctaProjects: string };
  about: { label: string; heading: string; body: string };
  highlights: {
    label: string;
    heading: string;
    quality: Highlight;
    pipeline: Highlight & { metricCaption: string; linkLabel: string };
    events: Highlight;
    dotnet: Highlight;
  };
  projects: { label: string; heading: string; items: Project[] };
  skills: { label: string; heading: string; top: string[]; rest: string[] };
  contact: {
    label: string;
    heading: string;
    sub: string;
    whatsapp: string;
    email: string;
    github: string;
    linkedin: string;
  };
  footer: { madeWith: string };
}

export const site: Record<Lang, SiteContent> = {
  pt: {
    hero: {
      label: "Início",
      title: "Full-stack Engineer, backend em C#, Java e NestJS",
      ctaTalk: "Fale comigo",
      ctaProjects: "Ver projetos",
    },
    about: {
      label: "Sobre",
      heading: "Quem sou",
      body: "Sou engenheiro full-stack com alma de backend. Construo sistemas em produção de ponta a ponta, com C#, Java e NestJS no servidor e Next.js na frente, e me importo com código que sobrevive ao contato com usuários reais. Meu diferencial é um pipeline de desenvolvimento assistido por IA com 4 agentes (planner, coder, tester, reviewer) que reduziu meu tempo de correção em ~75%. Hoje mantenho e evoluo sistemas .NET e Node.js em produção, do banco ao deploy.",
    },
    highlights: {
      label: "Entregas",
      heading: "O que venho entregando",
      quality: {
        title: "Gestão da qualidade industrial",
        body: "Módulo full-stack em NestJS + PostgreSQL com registros imutáveis e numeração sequencial atômica. Auditoria sem furos, concorrência sob controle.",
      },
      pipeline: {
        title: "Pipeline de dev com 4 agentes de IA",
        body: "Spec-driven: planner, coder, tester e reviewer com contextos isolados, passando o bastão por arquivos. O resultado no tempo de correção:",
        metricCaption: "no tempo de correção",
        linkLabel: "Ver no GitHub",
      },
      events: {
        title: "Plataforma B2B de eventos",
        body: "Refatoração de backend, integração com WhatsApp e esteira de CI/CD para uma plataforma B2B de eventos.",
      },
      dotnet: {
        title: ".NET em produção",
        body: "Manutenção e evolução de sistemas .NET + SQL Server em produção, o tipo de código que não pode parar.",
      },
    },
    projects: {
      label: "Projetos",
      heading: "Projetos selecionados",
      items: [
        {
          name: "Gerenciamento-De-Produtos",
          pitch: "Monorepo full-stack entregue em desafio técnico de 2 dias.",
          tags: ["Java 17", "Spring Boot", "React", "Docker Compose"],
          url: "https://github.com/Carloscavalcante97/Gerenciamento-De-Produtos",
        },
        {
          name: "CashFlow",
          pitch: "API de controle financeiro com relatórios e validações de integridade.",
          tags: ["C#", ".NET"],
          url: "https://github.com/Carloscavalcante97/CashFlow",
        },
        {
          name: "BarberBoss",
          pitch: "API para gestão de barbearias com arquitetura DDD.",
          tags: [".NET 8", "DDD"],
          url: "https://github.com/Carloscavalcante97/BarberBoss",
        },
        {
          name: "CSharp-TechLibrary",
          pitch: "API de biblioteca técnica com DDD, EF e documentação Swagger.",
          tags: [".NET 9", "EF Core", "FluentValidation", "Swagger"],
          url: "https://github.com/Carloscavalcante97/CSharp-TechLibrary",
        },
        {
          name: "Api-Eventos",
          pitch: "API REST de venda de ingressos com validação robusta.",
          tags: ["TypeScript", "REST"],
          url: "https://github.com/Carloscavalcante97/Api-Eventos",
        },
        {
          name: "pipeline-Claude",
          pitch: "Pipeline de dev com 4 agentes de IA, o diferencial em código aberto.",
          tags: ["IA", "Agentes", "Spec-driven"],
          url: "https://github.com/Carloscavalcante97/pipeline-Claude",
        },
      ],
    },
    skills: {
      label: "Stack",
      heading: "Skills",
      top: ["TypeScript", "AI Integration / LLM APIs", "Node.js", "Docker & Cloud", "Next.js"],
      rest: ["C#", ".NET", "Java", "Spring Boot", "NestJS", "React", "PostgreSQL", "SQL Server", "EF Core", "CI/CD", "Git", "Swagger/OpenAPI"],
    },
    contact: {
      label: "Contato",
      heading: "Precisa de alguém que entrega de ponta a ponta?",
      sub: "Sem formulário e sem fricção. Me chame direto no canal que preferir.",
      whatsapp: "Chamar no WhatsApp",
      email: "Enviar e-mail",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      madeWith: "feito com Next.js + Three.js",
    },
  },
  en: {
    hero: {
      label: "Intro",
      title: "Full-stack Engineer, backend in C#, Java and NestJS",
      ctaTalk: "Get in touch",
      ctaProjects: "See projects",
    },
    about: {
      label: "About",
      heading: "Who I am",
      body: "I'm a full-stack engineer with a backend soul. I build production systems end to end, with C#, Java and NestJS on the server and Next.js up front, and I care about code that survives contact with real users. My edge is an AI-assisted development pipeline with 4 agents (planner, coder, tester, reviewer) that cut my fix time by ~75%. Today I maintain and evolve .NET and Node.js systems in production, from database to deploy.",
    },
    highlights: {
      label: "Work",
      heading: "What I've been shipping",
      quality: {
        title: "Industrial quality management",
        body: "Full-stack module in NestJS + PostgreSQL with immutable records and atomic sequential numbering. Airtight auditing, concurrency under control.",
      },
      pipeline: {
        title: "Dev pipeline with 4 AI agents",
        body: "Spec-driven: planner, coder, tester and reviewer with isolated contexts, handing off through files. The impact on fix time:",
        metricCaption: "in fix time",
        linkLabel: "View on GitHub",
      },
      events: {
        title: "B2B events platform",
        body: "Backend refactoring, WhatsApp integration and a CI/CD pipeline for a B2B events platform.",
      },
      dotnet: {
        title: ".NET in production",
        body: "Maintenance and evolution of .NET + SQL Server systems in production, the kind of code that can't go down.",
      },
    },
    projects: {
      label: "Projects",
      heading: "Selected projects",
      items: [
        {
          name: "Gerenciamento-De-Produtos",
          pitch: "Full-stack monorepo delivered in a 2-day technical challenge.",
          tags: ["Java 17", "Spring Boot", "React", "Docker Compose"],
          url: "https://github.com/Carloscavalcante97/Gerenciamento-De-Produtos",
        },
        {
          name: "CashFlow",
          pitch: "Personal finance API with reports and integrity validations.",
          tags: ["C#", ".NET"],
          url: "https://github.com/Carloscavalcante97/CashFlow",
        },
        {
          name: "BarberBoss",
          pitch: "Barbershop management API built on DDD.",
          tags: [".NET 8", "DDD"],
          url: "https://github.com/Carloscavalcante97/BarberBoss",
        },
        {
          name: "CSharp-TechLibrary",
          pitch: "Tech library API with DDD, EF and Swagger docs.",
          tags: [".NET 9", "EF Core", "FluentValidation", "Swagger"],
          url: "https://github.com/Carloscavalcante97/CSharp-TechLibrary",
        },
        {
          name: "Api-Eventos",
          pitch: "Ticket-sales REST API with robust validation.",
          tags: ["TypeScript", "REST"],
          url: "https://github.com/Carloscavalcante97/Api-Eventos",
        },
        {
          name: "pipeline-Claude",
          pitch: "Dev pipeline with 4 AI agents, the differentiator in the open.",
          tags: ["IA", "Agentes", "Spec-driven"],
          url: "https://github.com/Carloscavalcante97/pipeline-Claude",
        },
      ],
    },
    skills: {
      label: "Stack",
      heading: "Skills",
      top: ["TypeScript", "AI Integration / LLM APIs", "Node.js", "Docker & Cloud", "Next.js"],
      rest: ["C#", ".NET", "Java", "Spring Boot", "NestJS", "React", "PostgreSQL", "SQL Server", "EF Core", "CI/CD", "Git", "Swagger/OpenAPI"],
    },
    contact: {
      label: "Contact",
      heading: "Need someone who ships end to end?",
      sub: "No forms, no friction. Reach me on whichever channel you prefer.",
      whatsapp: "Message me on WhatsApp",
      email: "Send an email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      madeWith: "built with Next.js + Three.js",
    },
  },
};
