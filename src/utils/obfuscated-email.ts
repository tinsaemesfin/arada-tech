/**
 * Human-readable obfuscation (no `user@domain` substring in markup for simple scrapers).
 * Display only — schema / server may still use the real {@link Company['email']} when needed.
 */
export function formatEmailObfuscated(email: string): string {
  const [user, domain] = email.split('@');
  if (!user || !domain) return '[email protected]';
  const [host, ...tldParts] = domain.split('.');
  const tld = tldParts.length ? tldParts.join('.') : '';
  const domainLabel = host && tld ? `${host} (dot) ${tld.replace(/\./g, ' (dot) ')}` : domain;
  return `${user} [at] ${domainLabel}`;
}
