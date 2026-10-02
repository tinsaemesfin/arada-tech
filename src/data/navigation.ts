import { products } from './products';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

const productLinks: NavItem[] = products.map((p) => ({
  label: `${p.name}: ${p.category}`,
  href: p.url,
  external: true,
}));

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Website Development', href: '/services/website-development/' },
      { label: 'Web App Development', href: '/services/web-application-development/' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development/' },
      { label: 'Custom Software Development', href: '/services/custom-software-development/' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design/' },
    ],
  },
  { label: 'Products', href: '/#products', children: productLinks },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  services: [
    { label: 'Website Development', href: '/services/website-development/' },
    { label: 'Web App Development', href: '/services/web-application-development/' },
    { label: 'Mobile App Development', href: '/services/mobile-app-development/' },
    { label: 'Custom Software', href: '/services/custom-software-development/' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design/' },
  ],
  products: productLinks,
  company: [
    { label: 'About Us', href: '/about/' },
    { label: 'Portfolio', href: '/portfolio/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'FAQ', href: '/faq/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms of Service', href: '/terms/' },
  ],
};
