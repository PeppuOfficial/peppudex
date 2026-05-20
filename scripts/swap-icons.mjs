import sharp from "sharp";
import { copyFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC_DIR = "C:/_Forge/PEPPU/TIKTOK-IG/PEPPUDEX/social-test";
const OG_SRC = join(SRC_DIR, "banner-02-dominos.png");
const ICON_SRC = join(SRC_DIR, "pfp-09-encyclopedia.png");
const PUB = join(ROOT, "public");

// og-image · banner-02-dominos
await copyFile(OG_SRC, join(PUB, "og-default.png"));

// favicon stack · resized from pfp-09
const SIZES = [
  ["peppu-app-icon-192.png", 192],
  ["peppu-app-icon-512.png", 512],
  ["apple-touch-icon.png", 180],
  ["favicon.png", 64],
];

for (const [name, size] of SIZES) {
  await sharp(ICON_SRC).resize(size, size, { fit: "cover" }).png().toFile(join(PUB, name));
  console.log(`wrote ${name} · ${size}x${size}`);
}

console.log("done");
