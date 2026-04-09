# Arada Tech Website - Deployment Guide

## Quick Deploy

1. Run `npm run build` to generate the `dist/` folder
2. Upload everything inside `dist/` to your cPanel `public_html/` directory
3. Ensure `.htaccess` is uploaded (it may be hidden by default in file managers)

## Build

```bash
npm run build
```

This produces a `dist/` folder containing only static files:
- HTML pages
- CSS and JavaScript bundles
- PHP contact form handler
- sitemap-index.xml and sitemap-0.xml
- robots.txt
- .htaccess

No Node.js runtime is needed on the server.

## Upload to cPanel

### Option A: File Manager
1. Log in to cPanel
2. Open File Manager
3. Navigate to `public_html/`
4. Delete existing WordPress files (back up first if needed)
5. Upload the contents of `dist/` (not the dist folder itself -- the files inside it)
6. Make sure `.htaccess` is present (enable "Show Hidden Files" in File Manager settings)

### Option B: FTP
1. Connect via FTP (FileZilla or similar)
2. Navigate to `public_html/`
3. Upload all contents of `dist/`

### Option C: ZIP Upload
1. Compress `dist/` contents into a ZIP file
2. Upload the ZIP to `public_html/`
3. Extract using cPanel File Manager's "Extract" feature

## Contact Form Setup (Resend)

The contact form uses [Resend](https://resend.com) for reliable email delivery. Free tier: 3,000 emails/month, no credit card required.

### Step 1: Create a Resend account
1. Go to [resend.com](https://resend.com) and sign up (free)
2. No credit card needed

### Step 2: Add and verify your domain
1. In the Resend dashboard, go to **Domains** → **Add Domain**
2. Enter `aradatech.com`
3. Resend will give you DNS records to add (MX, TXT for SPF/DKIM)
4. Add these records in your **cPanel → Zone Editor** (or wherever you manage DNS)
5. Click **Verify** in Resend — it may take a few minutes to propagate

### Step 3: Get your API key
1. In the Resend dashboard, go to **API Keys** → **Create API Key**
2. Give it a name like "Arada Tech Contact Form"
3. Copy the key (starts with `re_`)

### Step 4: Update contact.php
1. Open `contact.php` in `public_html/`
2. Replace `YOUR_RESEND_API_KEY` with your actual API key
3. Update `$TO_EMAIL` if you want to receive emails at a different address
4. Test the form by submitting from the contact page

## SSL Certificate

Ensure HTTPS is enabled:
1. Go to cPanel > SSL/TLS or Let's Encrypt
2. Install a free SSL certificate for aradatech.com and www.aradatech.com
3. The `.htaccess` will automatically redirect HTTP to HTTPS

## DNS Configuration

Ensure these DNS records are set:
- A record: `aradatech.com` → your server IP
- A record: `www.aradatech.com` → your server IP (or CNAME to aradatech.com)

## Google Analytics 4 Setup

1. Create a GA4 property at https://analytics.google.com
2. Get your Measurement ID (starts with `G-`)
3. Add this script to `src/components/global/SEOHead.astro` before the closing of the head section:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Rebuild and re-upload

## Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add property: `https://www.aradatech.com`
3. Verify via HTML tag method (add meta tag to SEOHead.astro) or DNS verification
4. Submit sitemap: `https://www.aradatech.com/sitemap-index.xml`

## Bing Webmaster Tools Setup

1. Go to https://www.bing.com/webmasters
2. Add your site URL
3. Verify via meta tag or DNS
4. Submit sitemap: `https://www.aradatech.com/sitemap-index.xml`

## Google Business Profile

1. Go to https://business.google.com
2. Claim or create your business profile for "Arada Tech"
3. Fill in all details:
   - Business name: Arada Tech
   - Category: Software Company
   - Address: Bole Atlas, Addis Ababa, Ethiopia
   - Phone: +251 937 925 582
   - Website: https://www.aradatech.com
   - Hours: Mon-Fri 9:00-19:00, Sat 10:00-14:00
4. Add photos of your office and team
5. Encourage clients to leave reviews

## Bing Places Setup

1. Go to https://www.bingplaces.com
2. Claim your business or create new listing
3. Use the same information as Google Business Profile
4. Verify your business

## Post-Launch Checklist

- [ ] Verify all pages load correctly on mobile and desktop
- [ ] Test contact form sends emails successfully
- [ ] Confirm HTTPS redirect works (http → https)
- [ ] Confirm www redirect works (aradatech.com → www.aradatech.com)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Business Profile
- [ ] Set up Google Analytics 4
- [ ] Add your logo files to `/images/` (logo.svg, logo-icon.svg, favicon.svg, favicon-32x32.png, apple-touch-icon.png, og-default.jpg)
- [ ] Update social media URLs in `src/data/company.ts` when profiles are created
- [ ] Monitor Core Web Vitals in Search Console after 1-2 weeks

## Logo and Image Placeholders

The following images need to be provided and placed in `public/images/`:

| File | Usage | Recommended Size |
|------|-------|-----------------|
| `logo.svg` | Header and footer logo (full logo + name) | Vector SVG |
| `logo-icon.svg` | Mobile header, favicon source | Vector SVG |
| `favicon.svg` | Browser tab icon | 32x32 or vector |
| `favicon-32x32.png` | Fallback favicon | 32x32 px |
| `apple-touch-icon.png` | iOS home screen icon | 180x180 px |
| `og-default.jpg` | Default social sharing image | 1200x630 px |

## Updating Content

- **Blog posts:** Add `.md` files to `src/content/blog/` and rebuild
- **Services:** Edit `src/data/services.ts` and rebuild
- **Portfolio:** Edit `src/data/portfolio.ts` and add new case study pages
- **Company info:** Edit `src/data/company.ts` for contact details, social links, etc.

After any content change, run `npm run build` and re-upload the `dist/` folder.
