/**
 * Arada Tech's own software products. Each one lives on its own subdomain; the copy here should match
 * the product site word for word so search engines and AI assistants see one consistent description.
 */
export interface Product {
  name: string;
  slug: string;
  url: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  audience: string;
  illustration?: 'rent-facade' | 'receipt' | 'pipeline';
  /** Colours taken from the product's own design tokens, so each card looks like the product it links to. */
  brand: {
    /** Main accent (buttons, paid states). */
    accent: string;
    /** Darker accent for text on light backgrounds (AA contrast). */
    ink: string;
    /** Flat tinted surface behind the illustration. */
    soft: string;
    /** Secondary highlight. */
    highlight: string;
  };
  /** App icon, copied from the product repo into /public/products. */
  mark: string;
}

export const products: Product[] = [
  {
    name: 'AradaRent',
    slug: 'aradarent',
    url: 'https://rent.aradatech.com/',
    category: 'Rent management system',
    tagline: 'Rent and property management software for buildings in Addis Ababa and across Ethiopia.',
    description:
      'AradaRent is rent and property management software for apartment, office, commercial and mixed-use buildings in Addis Ababa and across Ethiopia, made by Arada Tech.',
    features: [
      'Leases, automatic rent invoices, late fees and numbered receipts',
      'Telebirr, bank transfer and cash payments recorded with tenant proof uploads',
      'Tenant portal for payments, maintenance requests and announcements',
      'Rent roll, arrears, occupancy and income reports in birr',
    ],
    audience: 'Owners and managers of apartment, office, commercial and mixed-use (G+) buildings',
    illustration: 'rent-facade',
    brand: { accent: '#047857', ink: '#065f46', soft: '#ecfdf5', highlight: '#10b981' },
    mark: '/products/aradarent.svg',
  },
  {
    name: 'Arada Mart',
    slug: 'arada-mart',
    url: 'https://mart.aradatech.com/',
    category: 'Shop register and stock',
    tagline: 'The receipt that runs the shop.',
    description:
      'Arada Mart is a phone register and shelf-stock system for Ethiopian mini-markets. Sell when the internet drops, then sync. Cashiers never see buying price.',
    features: [
      'Phone register with several customers open at once',
      'Shelf and back-store stock, with FIFO batches',
      'Cash, Telebirr, and CBE splits on the receipt',
      'Offline sales that queue on the phone and sync later',
    ],
    audience: 'Owners and cashiers of mini-markets, kiosks, and small shops in Ethiopia',
    illustration: 'receipt',
    brand: { accent: '#4f46e5', ink: '#3730a3', soft: '#eef2ff', highlight: '#a5b4fc' },
    mark: '/products/arada-mart.svg',
  },
  {
    name: 'Arada Agency',
    slug: 'arada-agency',
    url: 'https://agency.aradatech.com/',
    category: 'Real estate agency CRM',
    tagline: 'Every lead, unit and commission, finally in one place.',
    description:
      'Arada Agency is the all-in-one CRM for Ethiopian real estate sales agencies: leads and pipelines, developer inventory and reservations, agreements, exact ETB commission calculation, buyer payments, agent payouts and reports, in English and Amharic.',
    features: [
      'Lead pipelines with round-robin and weighted routing to agents',
      'Developer projects, floors and unit inventory with reservations',
      'Versioned commission agreements and exact ETB commission splits',
      'Buyer payments, receipt verification and agent payouts',
    ],
    audience: 'Owners, managers, finance staff and agents of real estate sales agencies in Ethiopia',
    illustration: 'pipeline',
    brand: { accent: '#345e4f', ink: '#284a3e', soft: '#eff3ec', highlight: '#c6d5a5' },
    mark: '/products/arada-agency.svg',
  },
];
