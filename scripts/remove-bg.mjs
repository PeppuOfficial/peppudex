#!/usr/bin/env node
// Background-removal pass for PEPPUDEX cards.
// Strategy · flood-fill near-white pixels from the 4 corners, set alpha=0.
// Card itself is preserved (its colored border isolates interior white).
//
// Usage · node scripts/remove-bg.mjs            (process all *-v2-test.png in public/cards)
// Usage · node scripts/remove-bg.mjs <file.png> (single file)

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const CARDS_DIR = path.resolve(process.cwd(), "public/cards");
const WHITE_THRESHOLD = 235;     // near-white if R/G/B all >=
const EDGE_FEATHER = 2;          // soften edge by N px

async function removeBackground(inputPath, outputPath) {
  const img = sharp(inputPath);
  const meta = await img.metadata();
  const W = meta.width;
  const H = meta.height;

  const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);

  // BFS flood-fill from all 4 corners using a Uint8Array visited map.
  const visited = new Uint8Array(W * H);
  const stack = [
    [0, 0],
    [W - 1, 0],
    [0, H - 1],
    [W - 1, H - 1],
  ];

  function isNearWhite(idx) {
    const r = buf[idx];
    const g = buf[idx + 1];
    const b = buf[idx + 2];
    return r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;
  }

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const vIdx = y * W + x;
    if (visited[vIdx]) continue;
    const pIdx = vIdx * 4;
    if (!isNearWhite(pIdx)) continue;
    visited[vIdx] = 1;
    buf[pIdx + 3] = 0;            // alpha = 0
    stack.push([x + 1, y]);
    stack.push([x - 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }

  // Edge feather · soften the alpha within EDGE_FEATHER px of the cut.
  // Simple approach · for each pixel, if it's opaque but a neighbor is transparent,
  // halve its alpha to soften the rounded-corner anti-alias.
  if (EDGE_FEATHER > 0) {
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const idx = (y * W + x) * 4;
        if (buf[idx + 3] === 0) continue;
        const up = ((y - 1) * W + x) * 4 + 3;
        const dn = ((y + 1) * W + x) * 4 + 3;
        const lf = (y * W + (x - 1)) * 4 + 3;
        const rt = (y * W + (x + 1)) * 4 + 3;
        const neighbors = [buf[up], buf[dn], buf[lf], buf[rt]];
        const transparentCount = neighbors.filter((a) => a === 0).length;
        if (transparentCount >= 1) {
          buf[idx + 3] = Math.round(buf[idx + 3] * 0.6);
        }
      }
    }
  }

  await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return { width: W, height: H, outputBytes: fs.statSync(outputPath).size };
}

async function main() {
  const arg = process.argv[2];
  let files;
  if (arg) {
    files = [arg];
  } else {
    files = fs.readdirSync(CARDS_DIR).filter((f) => /-v\d+-test\.png$/.test(f));
  }

  for (const fname of files) {
    const inputPath = path.isAbsolute(fname) ? fname : path.join(CARDS_DIR, fname);
    const base = path.basename(fname);
    const outFname = /-v\d+-test\.png$/.test(base)
      ? base.replace(/-v\d+-test\.png$/, "-transparent.png")
      : base.replace(/\.png$/, "-transparent.png");
    const outputPath = path.join(CARDS_DIR, outFname);
    console.log(`Processing ${fname} -> ${outFname}`);
    const result = await removeBackground(inputPath, outputPath);
    console.log(`  ${result.width}x${result.height} · ${(result.outputBytes / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
