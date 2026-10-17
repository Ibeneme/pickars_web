#!/usr/bin/env node
/**
 * Verifies that every static asset referenced for SEO (Open Graph images,
 * logo, app screenshot…) actually exists in /public, so social previews and
 * structured data never point at a 404.
 *
 *   npm run check:seo
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "utils"];
const ASSET_PATTERN =
  /["'`](\/(?:opengraphs\/)?[\w./-]+\.(?:png|jpe?g|webp|svg))["'`]/g;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if ([".ts", ".tsx"].includes(extname(full))) yield full;
  }
}

const referenced = new Map(); // asset path -> files that mention it

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const source = readFileSync(file, "utf8");
    for (const [, assetPath] of source.matchAll(ASSET_PATTERN)) {
      if (!referenced.has(assetPath)) referenced.set(assetPath, new Set());
      referenced.get(assetPath).add(file.replace(`${ROOT}/`, ""));
    }
  }
}

// Only check files that are meant to be served from /public.
const publicAssets = [...referenced].filter(
  ([assetPath]) =>
    assetPath.startsWith("/opengraphs/") ||
    ["/logo.svg", "/mockup.png", "/card.png"].includes(assetPath)
);

const missing = publicAssets.filter(
  ([assetPath]) => !existsSync(join(ROOT, "public", assetPath))
);

if (missing.length === 0) {
  console.log(`✔ All ${publicAssets.length} SEO assets exist in /public.`);
  process.exit(0);
}

console.error(`✖ ${missing.length} SEO asset(s) are referenced but missing from /public:\n`);
for (const [assetPath, files] of missing) {
  console.error(`  ${assetPath}\n    used in: ${[...files].join(", ")}`);
}
process.exit(1);
