/// <reference types="node" />
import * as fs from 'fs';
import * as path from 'path';
import { create } from 'xmlbuilder2'; 


const BASE_URL: string = 'https://accractkcu.co';

// Strongly typed static routes array
const routes: string[] = [
  '/',
  '/terms-of-service'
];

// Build the XML structure
const root = create({ version: '1.0', encoding: 'UTF-8' })
  .ele('urlset')
  .att('xmlns', 'http://sitemaps.org'); // Explicitly sets the proper schema

routes.forEach((route: string) => {
  root.ele('url')
    .ele('loc').txt(`${BASE_URL}${route}`).up()
    .ele('changefreq').txt('monthly').up()
    .ele('priority').txt(route === '/' ? '1.0' : '0.8').up();
});

const xml: string = root.end({ prettyPrint: true });

// Safely write directly to Vite's build directory
const outDir: string = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Write the sitemap file
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
console.log('✅ sitemap.xml successfully generated in /dist using TypeScript!');

// Build and write the robots.txt file
const robotsContent: string = [
  'User-agent: *',
  'Allow: /',
  '',
  `Host: ${BASE_URL}`,
  `Sitemap: ${BASE_URL}/sitemap.xml`
].join('\n');

fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsContent);
console.log('✅ robots.txt successfully generated in /dist!');
