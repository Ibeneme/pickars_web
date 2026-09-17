import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { createReadStream, existsSync } from "fs";
import { extname } from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "../dist");

const routes = [
  "/",
  "/app/faqs",
  "/app/app-features",
  "/app/tracking",
  "/app/our-company",
];

const mimeTypes = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
};

async function prerender() {
  // Simple static file server (no SPA rewrite for assets)
  const server = createServer((req, res) => {
    let filePath = path.join(DIST, req.url === "/" ? "index.html" : req.url);

    // If it's a directory, try index.html
    if (existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    // SPA fallback only for HTML requests
    if (!existsSync(filePath) && !extname(req.url)) {
      filePath = path.join(DIST, "index.html");
    }

    if (existsSync(filePath)) {
      const ext = extname(filePath);
      res.setHeader("Content-Type", mimeTypes[ext] || "text/plain");
      createReadStream(filePath).pipe(res);
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(4173, resolve));
  console.log("→ Server running at http://localhost:4173");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const route of routes) {
    console.log(`Prerendering → ${route}`);

    await page.goto(`http://localhost:4173${route}`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Wait extra for Helmet
    await new Promise((r) => setTimeout(r, 1500));

    const html = await page.content();

    let filePath;
    if (route === "/") {
      filePath = path.join(DIST, "index.html");
    } else {
      const folder = path.join(DIST, route.slice(1));
      fs.mkdirSync(folder, { recursive: true });
      filePath = path.join(folder, "index.html");
    }

    fs.writeFileSync(filePath, html);
    console.log(`✓ Saved → ${filePath}`);
  }

  await browser.close();
  server.close();
  console.log("\n✅ Done!");
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
