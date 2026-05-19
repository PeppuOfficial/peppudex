import { readFileSync, writeFileSync } from "node:fs";
const p = process.argv[2];
const buf = readFileSync(p);
if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
  writeFileSync(p, buf.subarray(3));
  console.log("BOM stripped from", p);
} else {
  console.log("no BOM in", p);
}
