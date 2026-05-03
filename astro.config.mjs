import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const site = 'https://www.aradatech.com';

const primaryNavPaths = new Set([
  '/',
  '/about/',
  '/services/',
  '/portfolio/',
  '/blog/',
  '/contact/',
]);

const serviceNavPaths = new Set([
  '/services/website-development/',
  '/services/web-application-development/',
  '/services/mobile-app-development/',
  '/services/custom-software-development/',
  '/services/ui-ux-design/',
]);

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url, site).pathname;

        if (path === '/') {
          return { ...item, priority: 1, changefreq: 'weekly' };
        }

        if (primaryNavPaths.has(path)) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }

        if (serviceNavPaths.has(path)) {
          return { ...item, priority: 0.85, changefreq: 'monthly' };
        }

        return { ...item, priority: 0.7, changefreq: 'monthly' };
      },
    }),
  ],
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ['gsap'],
            three: ['three'],
          },
        },
      },
    },
  },
});
