import sitemap from sitemap;
import fs from fs;

const hostname = `${process.env.REACT_APP_WEBSITE_URL}`;

const urls = [
  { url: '/', changefreq: 'monthly', priority: 1 },
  { url: '/#works', changefreq: 'monthly', priority: 0.8 },
  { url: '/#about', changefreq: 'monthly', priority: 0.8 },
  { url: '/#contact', changefreq: 'monthly', priority: 0.8 },
];

const sitemapInstance = sitemap.createSitemap({
  hostname,
  urls,
});

// Write sitemap to public directory
fs.writeFileSync('./public/sitemap.xml', sitemapInstance.toString());
