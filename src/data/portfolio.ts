export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { metric: string; value: string; description: string }[];
  technologies: string[];
  testimonial?: { quote: string; author: string; role: string };
  metaTitle: string;
  metaDescription: string;
  /** Hero / card image under `public/` (e.g. `/images/portfolio/slug.png`). */
  coverImage?: string;
  /** Homepage portfolio: order 1–3 shows this project in the featured row (first three slots). */
  featuredRank?: 1 | 2 | 3;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'arada-clear',
    title: 'Arada Clear',
    client: 'Arada Clear',
    industry: 'FinTech / Clearing',
    services: ['Custom Software', 'Web App Development', 'Backend and APIs'],
    challenge:
      'Organizations handling large volumes of invoices need a clearinghouse that can ingest heterogeneous invoice formats, normalize data, and apply consistent business rules before settlement. Manual checks do not scale, and generic tools rarely match local regulatory and operational needs.',
    solution:
      'We built Arada Clear as a dedicated invoice clearing platform: bulk upload and ingestion pipelines, validation and normalization, and a configurable clearing engine that applies Arada’s own algorithms to match, score, and route invoices toward the appropriate clearing outcome. The system is designed for high batch throughput, audit trails, and integration with downstream settlement or ERP systems.',
    results: [
      { metric: 'Processing model', value: 'Batch + API', description: 'Upload many invoices or feed them programmatically' },
      { metric: 'Clearing logic', value: 'Configurable', description: 'Rules and scoring tuned to your workflow' },
      { metric: 'Traceability', value: 'End to end', description: 'Audit trail from upload to cleared result' },
      { metric: 'Integration', value: 'Service ready', description: 'Built to connect with settlement and back office systems' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'REST APIs', 'Docker'],
    metaTitle: 'Arada Clear Invoice Platform | Arada Tech',
    metaDescription:
      'Arada Clear: a clearinghouse platform for bulk invoice upload, validation, and algorithm driven clearing built by Arada Tech.',
    coverImage: '/images/portfolio/Arada-clear.png',
    featuredRank: 1,
  },
  {
    slug: 'hrms-human-resource-management',
    title: 'Human Resource Management System (HRMS)',
    client: 'Enterprise HRMS',
    industry: 'Enterprise / HR Tech',
    services: ['Custom Software', 'Web App Development', 'Enterprise Integration'],
    challenge:
      'Mid sized and large organizations often juggle separate tools for attendance, payroll, performance, and employee records. That fragmentation causes errors, delays, and poor visibility for HR and finance teams.',
    solution:
      'We delivered a full HRMS: centralized employee records and org structure, customizable attendance and leave policies, and payroll that adapts to different pay rules and approval flows. The product includes performance management cycles, goals and reviews where needed, and role based access so HR, managers, and staff each see the right data.',
    results: [
      { metric: 'Payroll', value: 'Customizable', description: 'Pay rules and components aligned to your policies' },
      { metric: 'Attendance', value: 'Configurable', description: 'Shifts, policies, and approvals in one place' },
      { metric: 'Performance', value: 'Built in', description: 'Cycles, goals, and review workflows' },
      { metric: 'Single system', value: 'One source', description: 'HR data connected across modules' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'Role based access control'],
    metaTitle: 'HRMS Platform Case Study | Arada Tech',
    metaDescription:
      'End to end HRMS with customizable payroll, attendance, performance management, and employee lifecycle tools by Arada Tech.',
    coverImage: '/images/portfolio/HRMS.png',
    featuredRank: 2,
  },
  {
    slug: 'real-estate-after-sales',
    title: 'Real Estate After Sales Management',
    client: 'Real Estate After Sales',
    industry: 'Real Estate',
    services: ['Custom Software', 'Web App Development', 'CRM & Workflow'],
    challenge:
      'Developers and agencies excel at selling units but often lack a dedicated system for what happens after handover: defect reports, warranty requests, service fees, and ongoing resident communication. Spreadsheets and generic ticketing tools rarely map to real estate workflows.',
    solution:
      'We built an after sales management system tailored to property operations: structured complaint and work order intake, assignment and SLA tracking, collections linked to service charges or agreed fees, and dashboards so management can see open issues, aging cases, and financial follow up in one place.',
    results: [
      { metric: 'After sales', value: 'Centralized', description: 'Complaints and tasks in a single pipeline' },
      { metric: 'Collections', value: 'Tracked', description: 'Visibility into charges and follow up' },
      { metric: 'Reporting', value: 'Operational', description: 'What is open, overdue, and resolved' },
      { metric: 'Fit for sector', value: 'Real estate', description: 'Workflows aligned to handover and warranty' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'Notification workflows'],
    metaTitle: 'Real Estate After Sales | Arada Tech',
    metaDescription:
      'After sales platform for real estate: complaint handling, collections, and operational control beyond the sales website.',
    coverImage: '/images/portfolio/realstate-manegemnt.png',
    featuredRank: 3,
  },
  {
    slug: 'local-loop-mercy',
    title: 'Local Loop Mercy',
    client: 'Local Loop Mercy',
    industry: 'FinTech / Document Services',
    services: ['Custom Software', 'Integration', 'Web App Development'],
    challenge:
      'Invoice data arrives in inconsistent formats and quality from many sources. Before invoices can be cleared or settled, they need to be collected, cleaned, and handed off reliably to a downstream clearing service.',
    solution:
      'Local Loop Mercy is an invoice cleaning service: it ingests invoices, validates and enriches fields, resolves duplicates and obvious errors where possible, and packages clean payloads for the clearing service. Arada Tech was involved in building and integrating this pipeline so handoff to clearing is predictable and traceable.',
    results: [
      { metric: 'Pipeline', value: 'Collect → clean', description: 'Structured path from intake to handoff' },
      { metric: 'Quality', value: 'Validation first', description: 'Checks before clearing receives data' },
      { metric: 'Handoff', value: 'Clearing ready', description: 'Output aligned to downstream clearing APIs' },
      { metric: 'Ownership', value: 'End to end', description: 'Designed for operational monitoring' },
    ],
    technologies: ['Node.js', 'PostgreSQL', 'REST APIs', 'Message queues', 'ETL patterns'],
    metaTitle: 'Local Loop Mercy | Arada Tech',
    metaDescription:
      'Local Loop Mercy: invoice collection, cleaning, and handoff to a clearing service, engineered with Arada Tech.',
    coverImage: '/images/portfolio/local-loop.png',
  },
  {
    slug: 'clinic-hospital-management',
    title: 'Clinic & Hospital Management System',
    client: 'Healthcare Provider',
    industry: 'Healthcare',
    services: ['Custom Software', 'Healthcare IT', 'Integration'],
    challenge:
      'Clinics and hospitals need patient scheduling, clinical documentation, billing, and inventory in one coherent system, while laboratory orders and results, and broader medical records, must stay accurate and connected.',
    solution:
      'We developed a clinic and hospital management platform that covers patient registration and visits, scheduling, and core administrative workflows. It integrates with laboratory systems for orders and results, supports medical record data in line with operational needs, and gives staff a single place to manage patients across front desk, care, and ancillary services.',
    results: [
      { metric: 'Patients', value: 'Unified record', description: 'Registration through visit history' },
      { metric: 'Laboratory', value: 'Integrated', description: 'Orders and results tied to encounters' },
      { metric: 'Clinical data', value: 'Structured', description: 'Medical information managed in context' },
      { metric: 'Operations', value: 'One system', description: 'Less duplicate entry across departments' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'HL7/FHIR ready interfaces', 'REST APIs'],
    metaTitle: 'Clinic & Hospital Platform | Arada Tech',
    metaDescription:
      'Hospital and clinic management with patient workflows, laboratory integration, and medical data management by Arada Tech.',
    coverImage: '/images/portfolio/clinic-manegemnt.png',
  },
  {
    slug: 'viatech-electromechanical',
    title: 'Viatech Electro Mechanical',
    client: 'Viatech Electro Mechanical',
    industry: 'Engineering & Construction',
    services: ['Website Development', 'UI/UX Design'],
    challenge:
      'Viatech Electro Mechanical, a leading engineering firm in Addis Ababa, needed a professional web presence that showcased their technical expertise and large scale projects. Their existing site was outdated, slow, and failed to communicate the quality of their work to potential B2B clients and international partners.',
    solution:
      'We designed and built a modern, performance optimized website that positions Viatech as a premium engineering partner. The site features an interactive project gallery with filterable categories, detailed case studies for their major projects, a responsive design that works flawlessly on all devices, and integrated contact forms that route inquiries to the right department.',
    results: [
      { metric: 'Page Load Time', value: '1.8s', description: 'Down from 8+ seconds on the old site' },
      { metric: 'Inquiry Volume', value: '+180%', description: 'Increase in qualified B2B inquiries within 3 months' },
      { metric: 'Bounce Rate', value: '-45%', description: 'Reduction in homepage bounce rate' },
      { metric: 'Mobile Traffic', value: '+210%', description: 'Growth in mobile visitors after responsive redesign' },
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS', 'Vercel'],
    testimonial: {
      quote: 'Arada Tech transformed our digital presence. The new website has directly contributed to winning two major contracts with international partners who found us through online search.',
      author: 'Daniel Bekele',
      role: 'Managing Director, Viatech Electro Mechanical',
    },
    metaTitle: 'Viatech Electro Mechanical | Arada Tech',
    metaDescription:
      'Viatech Electro Mechanical website: faster performance, stronger B2B inquiries, modern UX. Engineering firm case study by Arada Tech, Addis Ababa.',
    coverImage: '/images/portfolio/viatech.png',
  },
  {
    slug: 'yeha-dental-clinic',
    title: 'Yeha Dental Clinic',
    client: 'Yeha Dental Clinic',
    industry: 'Healthcare',
    services: ['Website Development', 'UI/UX Design'],
    challenge:
      'Yeha Dental Clinic, a growing dental practice in Addis Ababa, needed a website that would help patients find them online, understand their services, and book appointments easily. They also needed a brand identity that conveyed trust, professionalism, and modern healthcare standards.',
    solution:
      'We created a clean, trustworthy website with a strong local SEO foundation that helps Yeha rank for dental services in Addis Ababa. The site includes an online appointment request system, detailed service pages optimized for local search, patient testimonials, and a blog section for dental health education. We also refined their brand identity with a professional logo and consistent visual language.',
    results: [
      { metric: 'Google Rankings', value: 'Top 3', description: 'For "dental clinic Addis Ababa" and related terms' },
      { metric: 'Online Appointments', value: '+320%', description: 'Increase in appointment requests through the website' },
      { metric: 'New Patients', value: '+65%', description: 'Growth in new patient registrations attributed to the website' },
      { metric: 'Page Speed Score', value: '95/100', description: 'Google PageSpeed Insights performance score' },
    ],
    technologies: ['Astro', 'Tailwind CSS', 'PHP', 'Google Business Profile'],
    testimonial: {
      quote: 'Our new website has become our most effective marketing channel. Patients tell us they chose Yeha because the website made us look professional and trustworthy.',
      author: 'Dr. Yohannes Tadesse',
      role: 'Founder, Yeha Dental Clinic',
    },
    metaTitle: 'Yeha Dental Clinic Website | Arada Tech',
    metaDescription:
      'Yeha Dental Clinic: local SEO, online appointments, and a trustworthy healthcare website. Case study by Arada Tech in Addis Ababa, Ethiopia.',
    coverImage: '/images/portfolio/yeha-dental.png',
  },
  {
    slug: 'getpros-platform',
    title: 'GetPros Platform',
    client: 'GetPros',
    industry: 'Technology / Marketplace',
    services: ['UI/UX Design', 'Web App Development', 'Mobile App Development'],
    challenge:
      'GetPros, an ambitious Ethiopian startup, envisioned a marketplace platform connecting service professionals with clients. They needed a complete digital product from concept to launch, including a web platform, mobile apps for both iOS and Android, and a backend system to handle matching, payments, reviews, and real time communication.',
    solution:
      'We served as GetPros\' end to end technology partner, designing and building the entire platform from the ground up. This included comprehensive UX research and UI design, a responsive web application for clients and professionals, native feel mobile apps built with React Native, a robust backend with real time messaging, a review and rating system, and an admin dashboard for platform management.',
    results: [
      { metric: 'Time to Market', value: '14 weeks', description: 'From concept to MVP launch on both platforms' },
      { metric: 'User Registrations', value: '2,500+', description: 'Professionals and clients in the first 2 months' },
      { metric: 'App Store Rating', value: '4.7/5', description: 'Average rating across iOS and Android' },
      { metric: 'Booking Completion', value: '78%', description: 'Of initiated service requests completed successfully' },
    ],
    technologies: ['React Native', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Figma'],
    testimonial: {
      quote: 'Arada Tech didn\'t just build our app; they helped us shape the product. Their technical expertise and understanding of our market were invaluable in getting GetPros off the ground.',
      author: 'Meron Alemu',
      role: 'CEO, GetPros',
    },
    metaTitle: 'GetPros Marketplace | Arada Tech',
    metaDescription:
      'GetPros marketplace: web app, mobile apps, and backend shipped in 14 weeks. Ethiopian startup case study by Arada Tech, Addis Ababa.',
    coverImage: '/images/portfolio/getpros.png',
  },
];
