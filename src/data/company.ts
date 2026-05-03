export const company = {
  name: 'Arada Tech',
  legalName: 'Arada Tech Software Development',
  tagline: 'We Build Digital Products That Drive Growth',
  description:
    'Arada Tech is a software development company in Addis Ababa, Ethiopia. Websites, web apps, mobile apps, custom software, and UI/UX design for businesses since 2016.',
  foundedYear: 2016,
  ceo: 'Tinsae Mesfin',
  email: 'qmesfin@gmail.com', // TODO: confirm email
  phone: '+251 937 925 582',
  phoneRaw: '+251937925582',
  address: {
    street: 'Bole Atlas',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    countryCode: 'ET',
    postalCode: '1000',
  },
  geo: {
    latitude: 9.0054,
    longitude: 38.7636,
  },
  url: 'https://www.aradatech.com',
  /**
   * Official profile URLs (https://…). Icons and Organization `sameAs` schema use these.
   * Paste your live links here when ready — leave '' until then.
   */
  social: {
    linkedin: 'https://www.linkedin.com/company/arada-tech/',
    twitter: 'https://x.com/tinsaemesfin',
    facebook: '',
    instagram: '',
    youtube: 'www.youtube.com/@aradatech7072',
    github: 'https://github.com/tinsaemesfin',
  },
  hours: 'Mo to Fr 09:00 to 19:00, Sa 10:00 to 14:00',
} as const;

/** Paths under `public/` — full logo (mark + wordmark), icon-only mark (favicons, compact UI). */
export const brandAssets = {
  fullLogo: '/images/full-logo.png',
  iconOnly: '/images/icon-only.png',
} as const;

export const siteConfig = {
  title: 'Arada Tech',
  /** Shorter homepage `<title>` for SEO tools that flag long titles */
  homePageTitle: 'Arada Tech | Software & Web Apps, Addis Ababa',
  titleTemplate: '%s | Arada Tech',
  defaultDescription: company.description,
  defaultOgImage: '/images/og-default.jpg',
  locale: 'en_ET',
  language: 'en',
} as const;
