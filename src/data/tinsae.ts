/**
 * Content for the personal portfolio page at /tinsae/.
 * Kept separate from the Arada Tech company data on purpose: this page has its own voice and design.
 * Source of truth is the résumé at public/Tinsae_Mesfin_Resume.pdf; keep the two in step.
 */

export const profile = {
  name: 'Tinsae Mesfin',
  firstName: 'Tinsae',
  role: 'Product Engineer',
  roleAlt: 'React · Next.js · TypeScript · PostgreSQL',
  /** Used for the <title> and social cards. */
  titleLine: 'Product Engineer (React, Next.js, TypeScript, PostgreSQL)',
  headline: 'I turn messy business workflows into products people actually use.',
  intro:
    'Product engineer who has shipped SaaS for clinics, a national regulator and a UK invoicing platform. I take products from discovery and UX through full-stack delivery, so what ships matches what the business actually needed.',
  location: 'Addis Ababa, Ethiopia',
  timezone: 'Africa/Addis_Ababa',
  timezoneLabel: 'UTC+3',
  email: 'qmesfin@gmail.com',
  phone: '+251 937 925 582',
  phoneRaw: '+251937925582',
  linkedin: 'https://www.linkedin.com/in/tinsaemesfin/',
  github: 'https://github.com/tinsaemesfin',
  x: 'https://x.com/tinsaemesfin',
  resume: '/Tinsae_Mesfin_Resume.pdf',
  avatar: '/images/tinsae-avatar.webp',
  availability:
    'Open to remote product engineering roles. Based in Addis Ababa (UTC+3) with full overlap with UK and EU working hours.',
  ringText: 'open to remote roles · product engineer · full-stack ·',
} as const;

export const stats = [
  { value: 5, suffix: '+', label: 'Years shipping products' },
  { value: 12, suffix: '+', label: 'Products designed and built' },
  { value: 140, suffix: '', label: 'Live KPIs in the regulator dashboard I delivered' },
  { value: 4, suffix: '', label: 'Professional certifications' },
] as const;

export const manifesto =
  'Most software fails before the first line of code, in the gap between what a business needs and what gets written down. I live in that gap. I run discovery, draw the workflow, design the screens, then build them. The result is software that fits the way people already work, shipped by someone who understood the problem first.';

export interface SkillGroup {
  index: string;
  title: string;
  blurb: string;
  items: string[];
  accent: string;
}

export const skillGroups: SkillGroup[] = [
  {
    index: '01',
    title: 'Product & Discovery',
    blurb: 'Finding the real problem, then writing it down so a team can build it.',
    items: [
      'Product discovery',
      'Requirements analysis',
      'User stories & acceptance criteria',
      'Workflow design',
      'Backlog ownership',
      'Roadmap support',
      'Stakeholder management',
      'Scrum / Agile facilitation',
    ],
    accent: '#d9f94c',
  },
  {
    index: '02',
    title: 'UX & Design Systems',
    blurb: 'High-fidelity design that engineers can implement without guessing.',
    items: [
      'Figma',
      'Prototyping',
      'Design systems',
      'Usability audits',
      'Responsive UI',
      'Accessibility (WCAG)',
      'Design-to-dev handoff',
      'Enterprise Design Thinking',
    ],
    accent: '#ff7a59',
  },
  {
    index: '03',
    title: 'Frontend Engineering',
    blurb: 'Fast, accessible interfaces in the React ecosystem.',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Astro',
      'Storyblok',
      'GSAP motion',
    ],
    accent: '#7b61ff',
  },
  {
    index: '04',
    title: 'Backend & Data',
    blurb: 'Schemas, APIs and reporting queries that hold up under real data.',
    items: [
      'PostgreSQL & SQL',
      'Supabase',
      'Convex',
      'Node.js & Express',
      'REST APIs',
      'Auth & RBAC',
      'Multi-tenant architecture',
      'KPI & reporting pipelines',
    ],
    accent: '#4cc9f0',
  },
  {
    index: '05',
    title: 'AI Integrations & Agents',
    blurb: 'Putting language models to work inside real product workflows, with guardrails.',
    items: [
      'LLM API integration (Claude, OpenAI)',
      'AI agents & tool calling',
      'Agentic workflows & orchestration',
      'RAG & embeddings',
      'Structured outputs',
      'Prompt design & evals',
      'MCP & agent tooling',
      'AI-assisted engineering (Claude Code, Cursor)',
    ],
    accent: '#f5c842',
  },
  {
    index: '06',
    title: 'Tooling, Quality & Cloud',
    blurb: 'From repo to production, with the tests and pipelines to keep it there.',
    items: [
      'Git',
      'CI/CD',
      'Docker',
      'Jest',
      'Playwright',
      'AWS (Certified Cloud Practitioner)',
      'Vercel',
      'Code review & mentoring',
    ],
    accent: '#5ef0b0',
  },
];

export interface Project {
  index: string;
  title: string;
  org: string;
  year: string;
  role: string;
  summary: string;
  outcomes: { value: string; label: string }[];
  stack: string[];
  image?: string;
  imageAlt?: string;
  /** Drawn fallback when there is no screenshot. */
  art?: 'kpi' | 'rent';
  link?: { href: string; label: string; external?: boolean };
  tone: string;
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'EFDA Regulatory KPI Dashboard',
    org: 'BroadReach · remote',
    year: '2025 – now',
    role: 'Senior Software Engineer, end to end',
    summary:
      'Replaced manual spreadsheet reporting at the Ethiopian Food and Drug Authority with live measurement of 140 KPIs across 4 modules, with drill-downs into each one. I worked with domain experts to define the reporting logic, mapped the ERIS data, wrote the SQL reporting layer and built the Next.js interface managers use every day. It surfaces not just missed targets but the drivers behind them.',
    outcomes: [
      { value: '140', label: 'KPIs measured live across 4 modules' },
      { value: 'Root cause', label: 'Drivers shown next to every gap' },
      { value: 'End to end', label: 'Logic, data, SQL and UI by one person' },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'SQL', 'ERIS data'],
    art: 'kpi',
    tone: '#d9f94c',
  },
  {
    index: '02',
    title: 'LocalLoop',
    org: 'MCS Merseyside, UK · remote',
    year: '2024 – 2026',
    role: 'Product Engineer',
    summary:
      'An invoice intake and clearing platform for a UK business network. I built the clearing management system that takes invoices through intake, validation, matching and clearing, combined full-stack delivery on Next.js and Supabase with product and UX improvements, and built a reusable Storyblok component library on Web Awesome.',
    outcomes: [
      { value: 'Full-stack', label: 'Delivery plus product ownership' },
      { value: 'Clearing', label: 'Intake, validation, matching, clearing' },
      { value: 'WCAG', label: 'Accessibility raised across the product' },
    ],
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Storyblok', 'Web Awesome'],
    image: '/images/portfolio/local-loop.png',
    imageAlt: 'LocalLoop clearing dashboard with import, review and submit steps',
    link: { href: '/portfolio/local-loop-mercy/', label: 'Read the case study' },
    tone: '#7b61ff',
  },
  {
    index: '03',
    title: 'Clinic Management Platform',
    org: 'Suisse Clinic',
    year: '2021 – 2024',
    role: 'UI/UX Designer → Senior Full-Stack Developer',
    summary:
      'Designed and built the clinic’s management interface in React, translating clinical and administrative workflows into responsive screens for doctors, reception and admin staff. Patient queues, scheduling, records and reporting in one system.',
    outcomes: [
      { value: '+30%', label: 'Operational efficiency' },
      { value: '+25%', label: 'Patient satisfaction' },
      { value: '1 system', label: 'Replaced paper and separate tools' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    image: '/images/portfolio/clinic-manegemnt.png',
    imageAlt: 'Clinic management dashboard with doctor profiles and patient overview',
    link: { href: '/portfolio/clinic-hospital-management/', label: 'Read the case study' },
    tone: '#5ef0b0',
  },
  {
    index: '04',
    title: 'Multi-tenant HR Platform',
    org: 'Suisse Clinic · Acting CTO',
    year: '2023 – 2024',
    role: 'Architect and technical lead',
    summary:
      'Architected a multi-tenant HR platform covering onboarding, leave, payroll-related workflows and performance management. I defined the API and database design, deployments and engineering practices, mentored the developers and supported users through adoption.',
    outcomes: [
      { value: '−40%', label: 'Manual administrative overhead' },
      { value: 'Multi-tenant', label: 'One codebase, many organisations' },
      { value: 'CTO', label: 'Owned direction, APIs and deployments' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'RBAC', 'Multi-tenancy'],
    image: '/images/portfolio/HRMS.png',
    imageAlt: 'HR platform screens for attendance, payroll and performance',
    link: { href: '/portfolio/hrms-human-resource-management/', label: 'Read the case study' },
    tone: '#4cc9f0',
  },
  {
    index: '05',
    title: 'AradaRent',
    org: 'Arada Tech · own product',
    year: '2025 – 2026',
    role: 'Founder, product and engineering',
    summary:
      'A live multi-tenant rent management SaaS for buildings in Addis Ababa. Leases generate invoices, late fees and numbered receipts automatically. Tenants upload Telebirr or bank proof from a phone, staff verify in one click, owners see rent roll and arrears in birr. English and Amharic throughout.',
    outcomes: [
      { value: 'Live', label: 'rent.aradatech.com' },
      { value: 'Telebirr', label: 'Mobile money built in, not bolted on' },
      { value: 'EN / አማ', label: 'Bilingual from day one' },
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    art: 'rent',
    link: { href: 'https://rent.aradatech.com/', label: 'Visit the product', external: true },
    tone: '#10b981',
  },
  {
    index: '06',
    title: 'Arada Mart',
    org: 'Arada Tech · own product',
    year: '2026',
    role: 'Founder, product and engineering',
    summary:
      'A live tablet-first point of sale and inventory system for Ethiopian mini-markets. Several customers open at once, FIFO batch costing so profit is real, manager approvals with voice notes, and an offline queue that keeps selling when the signal drops and syncs when it returns.',
    outcomes: [
      { value: 'Offline-first', label: 'Idempotent sync with conflict review' },
      { value: 'FIFO', label: 'Profit tied to purchase batches' },
      { value: 'RBAC', label: 'Cashiers never see buying price' },
    ],
    stack: ['Next.js', 'Convex', 'TypeScript', 'IndexedDB', 'Tailwind CSS'],
    image: '/images/portfolio/arada-mart.png',
    imageAlt: 'Arada Mart point of sale with shelf stock and multiple open carts',
    link: { href: 'https://mart.arada.app/', label: 'Visit the product', external: true },
    tone: '#ff7a59',
  },
];

export const moreWork = [
  {
    title: 'Selamnew Operations',
    note: 'Product Owner for an enterprise operations platform of 7 modules (SCM, project management, finance, inventory, master data). Owned the backlog and aligned stakeholders with engineering.',
  },
  {
    title: 'Arada Clear',
    note: 'Bulk invoice ingestion, validation and a configurable clearing engine with full audit trail.',
    href: '/portfolio/arada-clear/',
  },
  {
    title: 'Fairway · Helsinki',
    note: '5+ React and Next.js applications, 30+ wireframes translated into WCAG-aware interfaces.',
  },
  {
    title: 'ERP SaaS platform',
    note: 'Business processes turned into functional requirements, user stories and technical workflows as Senior BA and Scrum Master.',
  },
];

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: 'BroadReach',
    location: 'Remote · full-time',
    role: 'Senior Software Engineer',
    period: 'Sep 2025 – Present',
    current: true,
    bullets: [
      'Delivered the EFDA Regulatory KPI Dashboard end to end, replacing manual spreadsheet reporting with live measurement of 140 KPIs, including drill-downs, across 4 modules.',
      'Defined reporting logic with domain experts, mapped ERIS data, wrote the SQL reporting layer and built the production Next.js interface used by managers.',
      'Designed the dashboard to surface not only missed targets but the underlying drivers, so performance gaps are easier to investigate and act on.',
    ],
  },
  {
    company: 'IE Network Solutions',
    location: 'Addis Ababa · on-site',
    role: 'Product Design Lead',
    period: 'Jul 2025 – Jun 2026',
    bullets: [
      'Product Owner for Selamnew Operations, an enterprise operations platform of 7 main modules including SCM, project management, finance, inventory and master data. Owned the backlog, prioritised requirements and aligned stakeholders with engineering.',
      'Led product design across CRM, talent, supply chain and other enterprise platforms, from discovery through high-fidelity design and handoff.',
      'Ran UX audits, prototyping and design-system work that gave engineering clearer implementation guidance.',
    ],
  },
  {
    company: 'IE Network Solutions',
    location: 'Addis Ababa · on-site',
    role: 'Senior Business Analyst & Scrum Master',
    period: 'Dec 2024 – Jun 2025',
    bullets: [
      'Drove design and delivery of an ERP SaaS platform by translating business processes into requirements, user stories and technical workflows.',
      'Facilitated agile ceremonies, clarified scope and dependencies, and kept product, design and engineering aligned on priorities.',
    ],
  },
  {
    company: 'MCS Merseyside',
    location: 'Merseyside, UK · remote, part-time',
    role: 'Product Engineer',
    period: 'Jan 2024 – Jun 2026',
    bullets: [
      'Built and refined LocalLoop, a Next.js and Supabase platform for invoice intake and clearing workflows.',
      'Built the invoice clearing management system covering intake, validation, matching and clearing.',
      'Developed a reusable Storyblok component library on Web Awesome, improving consistency and maintainability.',
    ],
  },
  {
    company: 'Suisse Clinic',
    location: 'Addis Ababa · on-site',
    role: 'Senior Full-Stack Developer, Acting CTO (started as UI/UX Designer)',
    period: 'Apr 2021 – Dec 2024',
    bullets: [
      'Designed and built the clinic management interface in React; improved operational efficiency by 30% and patient satisfaction by 25%.',
      'Architected a multi-tenant HR platform that cut manual administrative overhead by 40%.',
      'Defined technical direction, API and database design, deployments and engineering practices while mentoring developers.',
    ],
  },
  {
    company: 'Fairway',
    location: 'Helsinki, Finland · remote, contract',
    role: 'Frontend Engineer & UI/UX Designer',
    period: 'May 2023 – Feb 2024',
    bullets: [
      'Designed and developed 5+ React and Next.js web applications and translated 30+ wireframes into responsive, WCAG-aware interfaces.',
      'Improved load times by 35% and user engagement by 25%; cut delivery time by 15% by streamlining the design-to-development workflow.',
    ],
  },
];

export const education = {
  degree: 'BSc Computer Science',
  school: 'Mekelle University',
  period: '2016 – 2020',
  note: 'CGPA 3.7',
};

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'Agile Scrum Master', issuer: 'Scrum' },
  { name: 'Meta Certified React Developer', issuer: 'Meta' },
  { name: 'IBM Enterprise Design Thinking', issuer: 'IBM' },
];

export const marquee = [
  'Product discovery',
  'React',
  'Next.js',
  'TypeScript',
  'PostgreSQL',
  'Supabase',
  'Tailwind CSS',
  'LLM integration',
  'AI agents',
  'Design systems',
  'Playwright',
  'CI/CD',
  'Accessibility',
  'Multi-tenant SaaS',
];
