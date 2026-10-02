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
  illustration?: 'rent-facade' | 'receipt';
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
  },
];
