const fs = require('fs');
const path = require('path');

const baseUrl = 'https://naeemcodes.com';
const currentDate = new Date().toISOString();

// Define your pages
const pages = [
  { url: '', priority: 1.0, changeFreq: 'monthly' }, // Home
  { url: '/about', priority: 0.8, changeFreq: 'monthly' },
  { url: '/projects', priority: 0.9, changeFreq: 'weekly' },
  { url: '/resume', priority: 0.7, changeFreq: 'monthly' },
  { url: '/guestbook', priority: 0.6, changeFreq: 'weekly' },
];

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

// Generate robots.txt (optional - since you can create it manually)
const generateRobots = () => {
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robots);
  console.log('Robots.txt generated successfully!');
};

// Run generators
generateSitemap();
generateRobots();