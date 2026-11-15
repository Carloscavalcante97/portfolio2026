export type Lang = "pt" | "en";

export const LINKS = {
  whatsapp: "https://wa.me/5511947832280",
  email: "mailto:antonio.developer@icloud.com",
  github: "https://github.com/Carloscavalcante97",
  linkedin: "https://www.linkedin.com/in/antonio-dev-/",
  pipelineRepo: "https://github.com/Carloscavalcante97/pipeline-Claude",
} as const;

export interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  caption: string;
}

/** Sistema real em produção — clientes nunca são citados */
export interface WorkProject {
  domain: string;
  title: string;
  summary: string;
  points: string[];
  role: string;
  tags: string[];
  metric?: Metric;
}

export interface Role {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
}

export interface Project {
  name: string;
  pitch: string;
  tags: string[];
  url: string;
}

/** O que faço além de escrever código */
export interface BeyondItem {
  area: string;
  title: string;
  body: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SiteContent {
  hero: {
    label: string;
    status: string;
    title: string;
    sub: string;
    ctaTalk: string;
    ctaProjects: string;
    photoAlt: string;
    metrics: Metric[];
  };
  about: { label: string; heading: string; body: string[]; facts: { k: string; v: string }[] };
  projects: { label: string; heading: string; intro: string; roleLabel: string; items: WorkProject[] };
  beyond: { label: string; heading: string; intro: string; items: BeyondItem[] };
  pipeline: {
    label: string;
    heading: string;
    title: string;
    body: string;
    points: string[];
    metric: Metric;
    linkLabel: string;
    terminal: { command: string; done: string };
    ossHeading: string;
    oss: Project[];
    all: string;
  };
  experience: { label: string; heading: string; current: string; items: Role[] };
  skills: { label: string; heading: string; groups: SkillGroup[]; also: string };
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

const OSS_URLS = {
  stackCli: "https://github.com/Carloscavalcante97/stack-cli",
  portfolio: "https://github.com/Carloscavalcante97/portfolio2026",
  produtos: "https://github.com/Carloscavalcante97/Gerenciamento-De-Produtos",
} as const;

export const site: Record<Lang, SiteContent> = {
  pt: {
    hero: {
      label: "Início",
      status: "Engenheiro de Software Pleno na Souv · Recife, BR",
      title: "Engenheiro de software full-stack, de ponta a ponta",
      sub: "APIs em NestJS, apps em Next.js e React Native, dados em Python e agentes de IA que entregam código revisado e testado.",
      ctaTalk: "Entrar em contato",
      ctaProjects: "Ver projetos",
      photoAlt: "Foto de Antônio Cavalcante",
      metrics: [
        { value: 75, prefix: "−", suffix: "%", caption: "tempo de correção com meu pipeline de IA" },
        { value: 70, prefix: "−", suffix: "%", caption: "perdas de material com um sistema unificado" },
        { value: 35, prefix: "+", suffix: "%", caption: "eficiência operacional no mesmo sistema" },
        { value: 15, prefix: "+", suffix: "%", caption: "satisfação do cliente (CSAT) com automação" },
      ],
    },
    about: {
      label: "Sobre",
      heading: "Quem sou",
      body: [
        "Sou engenheiro de software pleno na Souv e responsável técnico por módulos de ponta a ponta, do levantamento de requisitos ao deploy.",
        "Trabalho no produto (NestJS, Next.js, React Native), nos dados (ETL em Python, otimização e process mining para a indústria) e no jeito como o time entrega: criei um pipeline de agentes de IA, usado todo dia, que cortou ~75% do tempo gasto em correções.",
      ],
      facts: [
        { k: "cargo", v: "Software Engineer (Pleno) · Souv" },
        { k: "base", v: "Recife, PE · Brasil" },
        { k: "formação", v: "Análise e Desenv. de Sistemas · Estácio (previsão 2027)" },
        { k: "idiomas", v: "Português nativo · Inglês avançado" },
      ],
    },
    projects: {
      label: "Projetos",
      heading: "Sistemas em produção",
      intro: "Projetos reais entregues na Souv para clientes de saúde, indústria e varejo. Os nomes ficam de fora por confidencialidade.",
      roleLabel: "meu papel",
      items: [
        {
          domain: "Saúde · Gestão estratégica",
          title: "Plataforma de OKRs e indicadores para uma rede hospitalar",
          summary: "Diretores, gestores de unidade e equipes conduzem ciclos, resultados-chave, reuniões e painéis de indicadores em um só lugar.",
          points: [
            "Assistente com LLM que só enxerga os dados que a permissão do usuário alcança, com saída estruturada.",
            "Fechamento de ciclo transacional e seguro sob concorrência, com encerramento automático por cron.",
            "Conector ETL idempotente que traz indicadores do ERP hospitalar (Oracle) por túnel SSH, sem dados de pacientes.",
            "CI com testes de integração contra um PostgreSQL real.",
          ],
          role: "full-stack · autor principal",
          tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "OpenAI", "Oracle"],
        },
        {
          domain: "Saúde · IA",
          title: "Secretária de IA no WhatsApp e plataforma de saúde preventiva",
          summary: "Painel web para médicos e app para pacientes, com consultas, prontuário e adesão a medicamentos.",
          points: [
            "Agente Gemini com function calling que agenda, cancela e remarca; a verificação por OTP é garantida no código, não no prompt.",
            "Estratificação de risco com LLM a partir de um checkup digital.",
          ],
          role: "full-stack · web, mobile e agente",
          tags: ["Next.js", "React Native", "Firebase", "Gemini", "WhatsApp API"],
        },
        {
          domain: "Indústria · Dados",
          title: "Programação da produção e process mining para injeção plástica",
          summary: "Transforma dados do ERP e do chão de fábrica em um plano máquina × molde para o PCP.",
          points: [
            "ETL em Python com snapshots versionados e API NestJS com Redis e WebSocket; otimizador genético feito em time.",
            "Process mining com PM4Py mostrou que a matriz oficial de compatibilidade estava desatualizada.",
          ],
          role: "front, API, ETL e process mining",
          tags: ["Python", "pandas", "PM4Py", "NestJS", "Next.js"],
          metric: { value: 96, prefix: "~", suffix: "k", caption: "eventos de produção analisados" },
        },
        {
          domain: "Indústria · Qualidade",
          title: "Certificação de qualidade e expedição para uma fábrica de embalagens",
          summary: "Liberações de máquina, medições por cavidade, certificados e conferência de pallets integrados ao ERP.",
          points: [
            "Certificados imutáveis: os valores agregados ficam congelados em snapshot.",
            "Numeração sequencial transacional e bipagem de pallets dentro de transação.",
            "Integração com o ERP da fábrica saindo por IP fixo, com monitoramento no Sentry.",
          ],
          role: "full-stack · autor principal",
          tags: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Sentry"],
        },
        {
          domain: "Saúde · Marketplace",
          title: "Marketplace de salas para profissionais de saúde",
          summary: "Profissionais reservam salas pelo tempo de uso, com confirmação de pacientes, check-in no local e fechamento mensal.",
          points: [
            "Cobrança calculada no relógio do servidor, com tarifa mínima e hora extra.",
            "Conduzi uma auditoria de segurança da plataforma e o plano de correção.",
          ],
          role: "full-stack · web e mobile",
          tags: ["Next.js", "React Native", "Firebase", "Pagamentos"],
        },
        {
          domain: "B2B · Marketplace",
          title: "Marketplace B2B entre indústrias, varejo e representantes",
          summary: "Oportunidades, chat, insights, planos pagos e eventos com agenda de rodadas de negócio.",
          points: [
            "Matchmaking de reuniões por interesse mútuo, com alocação de horários e alertas de conflito.",
            "Regras do Firestore endurecidas e testadas por script; assinaturas com controle de acesso PRO.",
          ],
          role: "full-stack · contribuidor principal",
          tags: ["Next.js", "Firebase", "Cloud Functions", "Pagamentos"],
        },
      ],
    },
    beyond: {
      label: "Além do código",
      heading: "Como eu ajudo o time a crescer",
      intro: "Boa parte do meu trabalho não está no código que eu escrevo, e sim em como o time contrata, entrega e aprende.",
      items: [
        {
          area: "Contratação",
          title: "Processo seletivo de desenvolvedores",
          body: "Desenhei e conduzo o processo de contratação de devs: desafio técnico com bugs plantados, gabarito automatizado, rubrica que avalia inclusive o uso de IA e entrevistas focadas em raciocínio lógico.",
        },
        {
          area: "Processo de engenharia",
          title: "Spec-driven development e pipeline de agentes",
          body: "Levei para o time o desenvolvimento guiado por especificação e um pipeline de agentes de IA com aprovação humana, hoje usado no dia a dia e com ~75% menos tempo gasto em correções.",
        },
        {
          area: "Pílulas técnicas",
          title: "Treinamentos curtos para o time",
          body: "Apresento pílulas técnicas sobre práticas e ferramentas que vejo trazendo resultado para o time, como o uso de agentes de IA no fluxo de desenvolvimento.",
        },
        {
          area: "Clientes",
          title: "Propostas técnicas",
          body: "Participo do desenho e da apresentação de propostas para clientes, como uma automação com RPA atuando em duas plataformas para cadastro e gestão de abastecimento.",
        },
        {
          area: "Mentoria",
          title: "Code review e acompanhamento de juniores",
          body: "Defino padrões de arquitetura e código com o time e acompanho devs juniores no dia a dia e nos code reviews.",
        },
      ],
    },
    pipeline: {
      label: "Pipeline",
      heading: "Como eu entrego",
      title: "Pipeline de entrega com agentes de IA",
      body: "Um comando transforma a descrição de uma feature em código revisado e testado, passando por 7 agentes especializados com gates entre cada estágio. Em uso diário pelo time.",
      points: [
        "Spec antes de código: pergunta em aberto para tudo até um humano responder.",
        "Quem escreve não se avalia: testers não corrigem código e o reviewer só lê.",
        "Testes E2E contra o sistema rodando: Playwright na web, supertest na API e Maestro no mobile.",
        "Nada é commitado sem aprovação humana explícita.",
      ],
      metric: { value: 75, prefix: "−", suffix: "%", caption: "no tempo de correção" },
      linkLabel: "Ver no GitHub",
      terminal: { command: '/pipeline "rate limiting em POST /login"', done: "branch pronta para revisão humana" },
      ossHeading: "Outros projetos abertos",
      oss: [
        {
          name: "stack-cli",
          pitch: "CLI que gera projetos full-stack prontos para trabalho real: auth, validação, health check e infra local.",
          tags: ["NestJS", "Express", "FastAPI", "Next.js", "Docker"],
          url: OSS_URLS.stackCli,
        },
        {
          name: "portfolio2026",
          pitch: "Este site: Next.js, shader Three.js e i18n sem dependências, construído com o meu próprio pipeline.",
          tags: ["Next.js", "Three.js", "Framer Motion"],
          url: OSS_URLS.portfolio,
        },
        {
          name: "Gerenciamento-De-Produtos",
          pitch: "Monorepo full-stack entregue em um desafio técnico de 2 dias.",
          tags: ["Java 17", "Spring Boot", "React", "Docker Compose"],
          url: OSS_URLS.produtos,
        },
      ],
      all: "Ver todos no GitHub",
    },
    experience: {
      label: "Experiência",
      heading: "Onde construí isso",
      current: "atual",
      items: [
        {
          role: "Engenheiro de Software Pleno",
          company: "Souv",
          period: "ago 2026 — hoje",
          current: true,
          points: [
            "Responsável técnico por módulos end-to-end em web, mobile, dados e IA.",
            "Arquitetura e padrões do time, code review e mentoria de devs júniores.",
            "Desenhei o desafio técnico do processo seletivo, com bugs plantados, gabarito automatizado e rubrica que avalia até o uso de IA.",
            "CI/CD com GitHub Actions e Docker; deploy em Vercel e VMs Linux (Nginx, SSL).",
          ],
        },
        {
          role: "Engenheiro de Software Júnior",
          company: "Souv",
          period: "out 2025 — ago 2026",
          points: [
            "APIs REST em NestJS, Firebase e Prisma consumidas por apps web e mobile.",
            "Aplicações em React e Next.js e refatoração contínua visando performance.",
          ],
        },
        {
          role: "Desenvolvedor Full Stack",
          company: "Denzel Eventos",
          period: "jan — mai 2025",
          points: [
            "Sistema unificado que reduziu perdas de material em mais de 70% e aumentou a eficiência em 35%.",
            "Modelagem relacional, SQL otimizado, testes automatizados, CI/CD e deploy na Azure.",
          ],
        },
        {
          role: "Estagiário de Desenvolvimento",
          company: "Pontes Hotéis",
          period: "jan — out 2025",
          points: ["Automação de atendimento com chatbots, elevando o CSAT em 15%."],
        },
      ],
    },
    skills: {
      label: "Stack",
      heading: "Com o que trabalho",
      groups: [
        { name: "Produto", items: ["TypeScript", "NestJS", "Express", "Node.js", "Next.js", "React", "React Native", "Tailwind"] },
        { name: "Dados", items: ["Python", "pandas", "PM4Py", "Algoritmos genéticos", "PostgreSQL", "Prisma", "SQL Server", "Oracle", "Firebase"] },
        { name: "IA e automação", items: ["Claude Code", "Agentes", "OpenAI", "Gemini", "MCP", "n8n", "WhatsApp API"] },
        { name: "Plataforma", items: ["Docker", "GitHub Actions", "Vercel", "Azure", "Nginx", "Linux", "Sentry"] },
      ],
      also: "Também: C# / .NET · Java / Spring Boot · MySQL",
    },
    contact: {
      label: "Contato",
      heading: "Aberto a novas oportunidades",
      sub: "Para vagas e conversas técnicas, o caminho mais rápido é e-mail ou LinkedIn.",
      whatsapp: "WhatsApp",
      email: "Enviar e-mail",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      madeWith: "feito com Next.js + Three.js, entregue pelo meu pipeline de agentes",
    },
  },
  en: {
    hero: {
      label: "Intro",
      status: "Mid-level Software Engineer at Souv · Recife, BR",
      title: "Full-stack software engineer, end to end",
      sub: "NestJS APIs, Next.js and React Native apps, Python data work and AI agents that ship reviewed, tested code.",
      ctaTalk: "Get in touch",
      ctaProjects: "See projects",
      photoAlt: "Photo of Antônio Cavalcante",
      metrics: [
        { value: 75, prefix: "−", suffix: "%", caption: "fix time with my AI delivery pipeline" },
        { value: 70, prefix: "−", suffix: "%", caption: "material losses with a unified system" },
        { value: 35, prefix: "+", suffix: "%", caption: "operational efficiency, same system" },
        { value: 15, prefix: "+", suffix: "%", caption: "customer satisfaction (CSAT) via automation" },
      ],
    },
    about: {
      label: "About",
      heading: "Who I am",
      body: [
        "I'm a mid-level software engineer at Souv and the technical owner of end-to-end modules, from requirements to production deploy.",
        "I work on the product (NestJS, Next.js, React Native), on data (Python ETL, optimization and process mining for manufacturing) and on how the team ships: I built an AI agent pipeline, used every day, that cut ~75% of the time spent on fixes.",
      ],
      facts: [
        { k: "role", v: "Software Engineer (Mid-level) · Souv" },
        { k: "based", v: "Recife, PE · Brazil" },
        { k: "degree", v: "Systems Analysis & Development · Estácio (expected 2027)" },
        { k: "languages", v: "Portuguese native · English advanced" },
      ],
    },
    projects: {
      label: "Projects",
      heading: "Systems in production",
      intro: "Real projects shipped at Souv for healthcare, manufacturing and retail clients. Names are left out for confidentiality.",
      roleLabel: "my role",
      items: [
        {
          domain: "Healthcare · Strategy",
          title: "OKR and KPI platform for a hospital network",
          summary: "Directors, unit managers and staff run cycles, key results, meetings and KPI dashboards in one place.",
          points: [
            "LLM assistant that only sees the data the user's permissions reach, with structured output.",
            "Transactional, concurrency-safe cycle closing with automatic close on a cron.",
            "Idempotent ETL connector pulling KPIs from the hospital ERP (Oracle) over an SSH tunnel, with no patient data.",
            "CI with integration tests against a real PostgreSQL.",
          ],
          role: "full-stack · main author",
          tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "OpenAI", "Oracle"],
        },
        {
          domain: "Healthcare · AI",
          title: "AI WhatsApp secretary and preventive-health platform",
          summary: "Web panel for doctors and an app for patients, with appointments, medical records and medication adherence.",
          points: [
            "Gemini agent with function calling that books, cancels and reschedules; OTP verification is enforced in code, not in the prompt.",
            "LLM risk stratification from a digital checkup.",
          ],
          role: "full-stack · web, mobile and agent",
          tags: ["Next.js", "React Native", "Firebase", "Gemini", "WhatsApp API"],
        },
        {
          domain: "Manufacturing · Data",
          title: "Production scheduling and process mining for plastic injection",
          summary: "Turns ERP and shop-floor data into a machine × mold plan for the planning team.",
          points: [
            "Python ETL with versioned snapshots and a NestJS API with Redis and WebSocket; genetic optimizer built as a team.",
            "Process mining with PM4Py showed the official compatibility matrix was out of date.",
          ],
          role: "front end, API, ETL and process mining",
          tags: ["Python", "pandas", "PM4Py", "NestJS", "Next.js"],
          metric: { value: 96, prefix: "~", suffix: "k", caption: "production events analyzed" },
        },
        {
          domain: "Manufacturing · Quality",
          title: "Quality certification and shipping for a packaging plant",
          summary: "Machine releases, per-cavity measurements, certificates and pallet checks integrated with the ERP.",
          points: [
            "Immutable certificates: aggregated values are frozen in a snapshot.",
            "Transactional sequential numbering and pallet scanning inside transactions.",
            "Integration with the plant's ERP egressing through a fixed IP, monitored with Sentry.",
          ],
          role: "full-stack · main author",
          tags: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Sentry"],
        },
        {
          domain: "Healthcare · Marketplace",
          title: "Room marketplace for health professionals",
          summary: "Professionals book rooms by time used, with patient confirmations, on-site check-in and a monthly billing close.",
          points: [
            "Charges computed on the server clock, with a minimum fee and overtime.",
            "Ran a security audit of the platform and led the remediation plan.",
          ],
          role: "full-stack · web and mobile",
          tags: ["Next.js", "React Native", "Firebase", "Payments"],
        },
        {
          domain: "B2B · Marketplace",
          title: "B2B marketplace for brands, retailers and sales reps",
          summary: "Opportunities, chat, insights, paid plans and events with business-meeting scheduling.",
          points: [
            "Mutual-interest meeting matchmaking with slot allocation and conflict alerts.",
            "Hardened Firestore rules tested by script; subscriptions with PRO access control.",
          ],
          role: "full-stack · main contributor",
          tags: ["Next.js", "Firebase", "Cloud Functions", "Payments"],
        },
      ],
    },
    beyond: {
      label: "Beyond code",
      heading: "How I help the team grow",
      intro: "A good part of my work isn't the code I write, but how the team hires, ships and learns.",
      items: [
        {
          area: "Hiring",
          title: "Developer hiring process",
          body: "I designed and run the developer hiring process: a technical challenge with planted bugs, an automated answer key, a rubric that also grades how candidates use AI, and interviews focused on logical reasoning.",
        },
        {
          area: "Engineering process",
          title: "Spec-driven development and an agent pipeline",
          body: "I brought spec-driven development and an AI agent pipeline with human approval to the team. It's used daily and cut time spent on fixes by ~75%.",
        },
        {
          area: "Tech talks",
          title: "Short training sessions for the team",
          body: "I give short internal talks on practices and tools I see paying off for the team, such as using AI agents in the development workflow.",
        },
        {
          area: "Clients",
          title: "Technical proposals",
          body: "I help design and present technical proposals to clients, such as an RPA automation working across two platforms for registration and fuel management.",
        },
        {
          area: "Mentoring",
          title: "Code review and junior mentoring",
          body: "I set architecture and code standards with the team and support junior developers day to day and through code reviews.",
        },
      ],
    },
    pipeline: {
      label: "Pipeline",
      heading: "How I ship",
      title: "AI agent delivery pipeline",
      body: "One command turns a feature description into reviewed, tested code through 7 specialized agents, with gates between every stage. Used daily by the team.",
      points: [
        "Spec before code: an open question stops everything until a human answers.",
        "Whoever writes doesn't grade: testers never fix code and the reviewer is read-only.",
        "E2E tests against the running system: Playwright for web, supertest for APIs and Maestro for mobile.",
        "Nothing is committed without explicit human approval.",
      ],
      metric: { value: 75, prefix: "−", suffix: "%", caption: "in fix time" },
      linkLabel: "View on GitHub",
      terminal: { command: '/pipeline "rate limiting on POST /login"', done: "branch ready for human review" },
      ossHeading: "More open-source work",
      oss: [
        {
          name: "stack-cli",
          pitch: "CLI that scaffolds full-stack projects ready for real work: auth, validation, health check and local infra.",
          tags: ["NestJS", "Express", "FastAPI", "Next.js", "Docker"],
          url: OSS_URLS.stackCli,
        },
        {
          name: "portfolio2026",
          pitch: "This site: Next.js, a Three.js shader and dependency-free i18n, built with my own pipeline.",
          tags: ["Next.js", "Three.js", "Framer Motion"],
          url: OSS_URLS.portfolio,
        },
        {
          name: "Gerenciamento-De-Produtos",
          pitch: "Full-stack monorepo delivered in a 2-day technical challenge.",
          tags: ["Java 17", "Spring Boot", "React", "Docker Compose"],
          url: OSS_URLS.produtos,
        },
      ],
      all: "See everything on GitHub",
    },
    experience: {
      label: "Experience",
      heading: "Where I built it",
      current: "now",
      items: [
        {
          role: "Software Engineer (Mid-level)",
          company: "Souv",
          period: "Aug 2026 — now",
          current: true,
          points: [
            "Technical owner of end-to-end modules across web, mobile, data and AI.",
            "Team architecture and standards, code reviews and mentoring of junior developers.",
            "Designed the hiring challenge: planted bugs, an automated answer key and a rubric that even grades how candidates use AI.",
            "CI/CD with GitHub Actions and Docker; deploys on Vercel and Linux VMs (Nginx, SSL).",
          ],
        },
        {
          role: "Software Engineer (Junior)",
          company: "Souv",
          period: "Oct 2025 — Aug 2026",
          points: [
            "REST APIs in NestJS, Firebase and Prisma consumed by web and mobile apps.",
            "React and Next.js applications and continuous refactoring for performance.",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Denzel Eventos",
          period: "Jan — May 2025",
          points: [
            "Unified system that cut material losses by over 70% and raised efficiency by 35%.",
            "Relational modeling, optimized SQL, automated tests, CI/CD and deploy on Azure.",
          ],
        },
        {
          role: "Development Intern",
          company: "Pontes Hotéis",
          period: "Jan — Oct 2025",
          points: ["Customer-service automation with chatbots, raising CSAT by 15%."],
        },
      ],
    },
    skills: {
      label: "Stack",
      heading: "What I work with",
      groups: [
        { name: "Product", items: ["TypeScript", "NestJS", "Express", "Node.js", "Next.js", "React", "React Native", "Tailwind"] },
        { name: "Data", items: ["Python", "pandas", "PM4Py", "Genetic algorithms", "PostgreSQL", "Prisma", "SQL Server", "Oracle", "Firebase"] },
        { name: "AI & automation", items: ["Claude Code", "Agents", "OpenAI", "Gemini", "MCP", "n8n", "WhatsApp API"] },
        { name: "Platform", items: ["Docker", "GitHub Actions", "Vercel", "Azure", "Nginx", "Linux", "Sentry"] },
      ],
      also: "Also: C# / .NET · Java / Spring Boot · MySQL",
    },
    contact: {
      label: "Contact",
      heading: "Open to new opportunities",
      sub: "For roles and technical conversations, email or LinkedIn is the fastest way to reach me.",
      whatsapp: "WhatsApp",
      email: "Send an email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      madeWith: "built with Next.js + Three.js, shipped by my agent pipeline",
    },
  },
};
