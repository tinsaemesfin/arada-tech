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
  },
];
