import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import handler from "serve-handler";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "../dist");

// Your real public routes that need correct SEO
const routes = [
  "/",
  "/app/faqs",
  "/app/app-features",
  "/app/tracking",
  "/app/our-company",
];

async function prerender() {
  // Start a static server on the built dist folder
  const server = http.createServer((req, res) => {
    return handler(req, res, {
      public: DIST,
      rewrites: [{ source: "**", destination: "/index.html" }], // important for SPA
    });
  });

  await new Promise((resolve) => server.listen(4173, resolve));
  console.log("→ Static server running at http://localhost:4173");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Optional: set a realistic viewport
  await page.setViewport({ width: 1280, height: 800 });

  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering → ${route}`);

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Give Helmet + React time to fully inject meta tags
    await new Promise((r) => setTimeout(r, 1000));

    const html = await page.content();

    // Decide where to save the file
    let filePath;
    if (route === "/") {
      filePath = path.join(DIST, "index.html");
    } else {
      // e.g. /app/faqs → dist/app/faqs/index.html
      const folder = path.join(DIST, route.slice(1));
      fs.mkdirSync(folder, { recursive: true });
      filePath = path.join(folder, "index.html");
    }

    fs.writeFileSync(filePath, html);
    console.log(`✓ Saved → ${filePath}`);
  }

  await browser.close();
  server.close();
  console.log("\n✅ Prerender completed successfully!");
}

prerender().catch((err) => {
  console.error("❌ Prerender failed:", err);
  process.exit(1);
});
