/// <reference types="node" />
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL: string = 'https://accractkcu.co';

// Strongly typed static routes array
const routes: string[] = [
  '/',
  '/terms-of-service'
];

// Get today's date in YYYY-MM-DD format
const today: string = new Date().toISOString().split('T')[0];

// 1. Build the Sitemap XML using pure template literals
const sitemapRows: string[] = routes.map((route: string) => {
  const url: string = `${BASE_URL}${route === '/' ? '' : route}`;
  const priority: string = route === '/' ? '1.0' : '0.8';

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://sitemaps.org">
${sitemapRows.join('\n')}
</urlset>`;

// Safely write directly to Vite's build directory
const outDir: string = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Write the sitemap file
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml.trim());
console.log('✅ sitemap.xml successfully generated in /dist using TypeScript!');

// 2. Build and write the robots.txt file
const robotsContent: string = [
  'User-agent: *',
  'Allow: /',
  '',
  `Host: ${BASE_URL}`,
  `Sitemap: ${BASE_URL}/sitemap.xml`
].join('\n');

fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsContent);
console.log('✅ robots.txt successfully generated in /dist!');
