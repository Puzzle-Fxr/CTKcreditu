/// <reference types="node" />
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL: string = 'https://accractkcu.co';

// Strongly typed static routes array
const routes: string[] = [
  '/',
  '/terms-of-service'
];

// Get today's date in YYYY-MM-DD format safely
const today: string = new Date().toISOString().substring(0, 10);

// Map over the routes array to build out your XML nodes dynamically
const sitemapRows: string[] = routes.map((route: string) => {
  // Ensure the root path doesn't get a trailing slash, but subpages keep theirs
  const url: string = `${BASE_URL}${route === '/' ? '' : route}`;
  const priority: string = route === '/' ? '1.0' : '0.8';

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

// Construct the complete clean XML document
const xml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRows.join('\n')}
</urlset>`;

// Safely write directly to Vite's build directory
const outDir: string = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Write the sitemap file
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml.trim());
console.log('✅ sitemap.xml successfully generated with the correct schema and paths!');

// Build and write the optimized robots.txt file
const robotsContent: string = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${BASE_URL}/sitemap.xml`
].join('\n');

fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsContent);
console.log('✅ robots.txt successfully generated in /dist!');

