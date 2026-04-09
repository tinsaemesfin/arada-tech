export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
  technologies: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    shortTitle: 'Websites',
    tagline: 'High-performance websites that convert visitors into customers',
    description:
      'We design and develop fast, responsive, SEO-optimized websites that represent your brand with precision and drive measurable business results. From corporate sites to e-commerce platforms, every website we build is engineered for performance and growth.',
    icon: 'globe',
    href: '/services/website-development/',
    features: [
      'Custom responsive design',
      'SEO-optimized architecture',
      'Performance-first development',
      'Content management systems',
      'E-commerce integration',
      'Analytics and tracking setup',
    ],
    technologies: ['React', 'Next.js', 'Astro', 'WordPress', 'Tailwind CSS', 'TypeScript'],
    process: [
      { step: 1, title: 'Discovery & Strategy', description: 'We analyze your business goals, target audience, and competitive landscape to define a clear website strategy.' },
      { step: 2, title: 'Design & Prototyping', description: 'We create wireframes and high-fidelity mockups, iterating until the design perfectly represents your brand.' },
      { step: 3, title: 'Development & Testing', description: 'We build your website with clean, maintainable code and thoroughly test across all devices and browsers.' },
      { step: 4, title: 'Launch & Optimization', description: 'We deploy your website, set up analytics, and provide ongoing optimization to ensure peak performance.' },
    ],
    faqs: [
      { question: 'How long does it take to build a website?', answer: 'A typical website project takes 4-8 weeks from kickoff to launch, depending on complexity. Simple brochure sites can be completed in 3-4 weeks, while complex e-commerce or multi-language sites may take 8-12 weeks.' },
      { question: 'Do you provide website hosting?', answer: 'We can help you choose and set up the best hosting solution for your needs. We work with providers that offer reliable performance for businesses in Ethiopia and globally.' },
      { question: 'Will my website be mobile-friendly?', answer: 'Absolutely. Every website we build is mobile-first and responsive, ensuring a seamless experience across all screen sizes from smartphones to large desktop monitors.' },
      { question: 'Can I update the website content myself?', answer: 'Yes. We build websites with user-friendly content management systems that allow you to update text, images, and other content without any technical knowledge.' },
    ],
    metaTitle: 'Website Development Services in Addis Ababa | Arada Tech',
    metaDescription: 'Professional website development in Addis Ababa, Ethiopia. We build fast, responsive, SEO-optimized websites that drive business growth. Get a free consultation.',
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    shortTitle: 'Web Apps',
    tagline: 'Scalable web applications that power your business operations',
    description:
      'We build powerful, scalable web applications that streamline your business processes and deliver exceptional user experiences. From SaaS platforms to internal tools, our web apps are built to handle real-world complexity.',
    icon: 'code',
    href: '/services/web-application-development/',
    features: [
      'Custom SaaS platform development',
      'Business process automation',
      'Real-time data dashboards',
      'API development and integration',
      'Role-based access control',
      'Cloud-native architecture',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    process: [
      { step: 1, title: 'Requirements Analysis', description: 'We work closely with your team to map business requirements, user workflows, and technical specifications.' },
      { step: 2, title: 'Architecture & Design', description: 'We design the system architecture and user interface, ensuring scalability, security, and usability.' },
      { step: 3, title: 'Agile Development', description: 'We build your application in iterative sprints, delivering working features regularly for your feedback.' },
      { step: 4, title: 'Deployment & Support', description: 'We deploy to production, monitor performance, and provide ongoing maintenance and feature development.' },
    ],
    faqs: [
      { question: 'What is the difference between a website and a web application?', answer: 'A website primarily displays information, while a web application lets users interact, input data, and perform tasks. Web apps include features like dashboards, user accounts, data processing, and real-time updates.' },
      { question: 'Can you integrate with our existing systems?', answer: 'Yes. We specialize in building web applications that integrate with existing databases, APIs, ERP systems, and third-party services. We design clean APIs that connect seamlessly with your current infrastructure.' },
      { question: 'How do you ensure the application is secure?', answer: 'Security is built into every layer. We implement authentication, authorization, input validation, encryption, and regular security audits. We follow OWASP guidelines and industry best practices.' },
      { question: 'Can the application scale as our business grows?', answer: 'Absolutely. We design applications with scalability in mind from day one, using cloud-native architectures, microservices where appropriate, and efficient database design to handle growth.' },
    ],
    metaTitle: 'Web Application Development in Addis Ababa | Arada Tech',
    metaDescription: 'Custom web application development in Addis Ababa, Ethiopia. We build scalable SaaS platforms, business tools, and cloud-native web apps. Contact us today.',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Native and cross-platform mobile apps that users love',
    description:
      'We develop high-quality mobile applications for iOS and Android that engage users and drive business results. Whether you need a native app or a cross-platform solution, we deliver polished products that perform flawlessly.',
    icon: 'smartphone',
    href: '/services/mobile-app-development/',
    features: [
      'iOS and Android development',
      'Cross-platform with React Native & Flutter',
      'Offline-first architecture',
      'Push notifications',
      'App Store optimization',
      'Backend API development',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js'],
    process: [
      { step: 1, title: 'Product Strategy', description: 'We define your app\'s core value proposition, target users, and key features through collaborative workshops.' },
      { step: 2, title: 'UX/UI Design', description: 'We design intuitive interfaces following platform-specific guidelines for iOS and Android, ensuring a native feel.' },
      { step: 3, title: 'Development & Testing', description: 'We build your app with clean architecture, automated testing, and continuous integration for reliable quality.' },
      { step: 4, title: 'Launch & Growth', description: 'We handle app store submission, monitor performance, and iterate based on user feedback and analytics.' },
    ],
    faqs: [
      { question: 'Should I build a native or cross-platform app?', answer: 'It depends on your requirements. Cross-platform frameworks like React Native and Flutter let you ship on both iOS and Android from a single codebase, reducing cost and time. Native development is ideal when you need maximum performance or deep platform integration.' },
      { question: 'How long does mobile app development take?', answer: 'A typical mobile app takes 8-16 weeks from design to launch. Simple apps with core features can be delivered in 6-8 weeks, while complex apps with real-time features, payments, or offline support may take 12-20 weeks.' },
      { question: 'Do you handle app store submission?', answer: 'Yes. We manage the entire submission process for both Apple App Store and Google Play Store, including preparing store listings, screenshots, and ensuring compliance with store guidelines.' },
      { question: 'Can you build the backend for the app too?', answer: 'Absolutely. We build complete solutions including the mobile app, backend API, database, and cloud infrastructure. This ensures everything works together seamlessly.' },
    ],
    metaTitle: 'Mobile App Development in Addis Ababa | Arada Tech',
    metaDescription: 'Professional mobile app development in Addis Ababa, Ethiopia. iOS, Android, and cross-platform apps built with React Native and Flutter. Get started today.',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    tagline: 'Tailored software solutions for your unique business challenges',
    description:
      'Off-the-shelf software doesn\'t always fit. We build custom software systems designed around your specific workflows, data requirements, and business rules — giving you a competitive advantage through technology built just for you.',
    icon: 'cpu',
    href: '/services/custom-software-development/',
    features: [
      'Enterprise resource planning (ERP)',
      'Inventory and supply chain management',
      'Customer relationship management (CRM)',
      'Workflow automation systems',
      'Data analytics and reporting',
      'Legacy system modernization',
    ],
    technologies: ['Python', 'Java', '.NET', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes'],
    process: [
      { step: 1, title: 'Business Analysis', description: 'We study your operations, identify pain points, and define exactly how custom software will solve your specific challenges.' },
      { step: 2, title: 'Solution Design', description: 'We architect the software system, including data models, integrations, and user workflows, ensuring it fits your organization.' },
      { step: 3, title: 'Iterative Development', description: 'We build in phases, delivering working modules regularly so you can provide feedback and guide the direction.' },
      { step: 4, title: 'Training & Deployment', description: 'We deploy the system, train your team, and provide documentation and ongoing support to ensure successful adoption.' },
    ],
    faqs: [
      { question: 'When should a business consider custom software?', answer: 'When off-the-shelf solutions don\'t fit your workflows, when you spend too much time on manual processes, when you need to integrate multiple systems, or when you want technology to be a competitive advantage rather than a constraint.' },
      { question: 'How much does custom software cost?', answer: 'Cost depends on complexity, features, and integration requirements. We provide detailed proposals after understanding your needs. Custom software is an investment — it reduces operational costs, eliminates manual work, and scales with your business.' },
      { question: 'Can you modernize our existing legacy system?', answer: 'Yes. We specialize in modernizing legacy systems — migrating from outdated technologies, improving performance, adding new features, and ensuring your system can grow with your business.' },
      { question: 'Do you provide ongoing maintenance?', answer: 'Absolutely. We offer maintenance and support packages that include bug fixes, security updates, performance monitoring, and feature enhancements to keep your software running optimally.' },
    ],
    metaTitle: 'Custom Software Development in Addis Ababa | Arada Tech',
    metaDescription: 'Custom software development in Addis Ababa, Ethiopia. We build ERP, CRM, automation, and enterprise systems tailored to your business. Request a consultation.',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX Design',
    tagline: 'User-centered design that makes digital products intuitive and delightful',
    description:
      'Great design is invisible — it just works. We create user interfaces and experiences that are beautiful, intuitive, and conversion-focused. Our design process is research-driven and iterative, ensuring every pixel serves a purpose.',
    icon: 'palette',
    href: '/services/ui-ux-design/',
    features: [
      'User research and personas',
      'Information architecture',
      'Wireframing and prototyping',
      'High-fidelity UI design',
      'Design system creation',
      'Usability testing',
    ],
    technologies: ['Figma', 'Adobe XD', 'Framer', 'Principle', 'Maze', 'Hotjar'],
    process: [
      { step: 1, title: 'Research & Discovery', description: 'We study your users, analyze competitors, and identify opportunities through interviews, surveys, and data analysis.' },
      { step: 2, title: 'Information Architecture', description: 'We structure your content and features into logical, intuitive navigation patterns and user flows.' },
      { step: 3, title: 'Design & Iteration', description: 'We create wireframes and high-fidelity designs, testing and iterating based on user feedback until the design is proven.' },
      { step: 4, title: 'Handoff & Support', description: 'We deliver production-ready design files with detailed specifications, and support your development team during implementation.' },
    ],
    faqs: [
      { question: 'What is the difference between UI and UX design?', answer: 'UX (User Experience) design focuses on how a product works — the flow, structure, and logic. UI (User Interface) design focuses on how it looks — the visual elements, typography, colors, and animations. Both are essential for a great digital product.' },
      { question: 'Do you design for both web and mobile?', answer: 'Yes. We design responsive interfaces that work beautifully across web, tablet, and mobile devices. We follow platform-specific design guidelines to ensure a native feel on every device.' },
      { question: 'Can you redesign our existing product?', answer: 'Absolutely. We frequently help businesses improve their existing digital products through UX audits, redesigns, and incremental improvements based on user data and feedback.' },
      { question: 'How do you measure design success?', answer: 'We measure design success through usability metrics, conversion rates, task completion rates, user satisfaction scores, and business KPIs. Good design is measurable and directly impacts your bottom line.' },
    ],
    metaTitle: 'UI/UX Design Services in Addis Ababa | Arada Tech',
    metaDescription: 'Professional UI/UX design services in Addis Ababa, Ethiopia. User research, wireframing, prototyping, and high-fidelity design for web and mobile. Let\'s talk.',
  },
];
