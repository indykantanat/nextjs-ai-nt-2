// สร้างไฟล์รูป placeholder สไตล์ RawBlock ให้สินค้าทุกตัวใน product_images
//
//   node scripts/generate-placeholder-images.mjs
//
// อ่านรายชื่อรูปจากฐานข้อมูล แล้วเขียนไฟล์ PNG ขาว-ดำลง public/product-image/
// (เขียนทับของเดิมเฉพาะไฟล์ที่ตัวเองสร้าง — ไฟล์รูปจริงที่ชื่อไม่ตรงจะไม่ถูกแตะ)
// รันซ้ำได้เรื่อย ๆ เมื่อเพิ่มสินค้าใหม่

import "dotenv/config";
import { deflateSync } from "node:zlib";
import { writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import mariadb from "mariadb";

const OUT_DIR = path.join(process.cwd(), "public", "product-image");
const SIZE = 800;
const WHITE = 255;
const BLACK = 0;

// ---------------------------------------------------------------- PNG encoder

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const out = Buffer.alloc(body.length + 8);
  out.writeUInt32BE(data.length, 0);
  body.copy(out, 4);
  out.writeUInt32BE(crc32(body), body.length + 4);
  return out;
}

/** เข้ารหัส buffer สีเทา 8 บิต (1 ไบต์ต่อพิกเซล) เป็น PNG */
function encodePng(pixels, width, height) {
  const raw = Buffer.alloc((width + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width + 1)] = 0; // filter type: none
    pixels.copy(raw, y * (width + 1) + 1, y * width, (y + 1) * width);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 0; // colour type: greyscale
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ------------------------------------------------------------ 5x7 bitmap font

const GLYPHS = {
  "0": ".###.|#...#|#..##|#.#.#|##..#|#...#|.###.",
  "1": "..#..|.##..|..#..|..#..|..#..|..#..|.###.",
  "2": ".###.|#...#|....#|...#.|..#..|.#...|#####",
  "3": "#####|...#.|..#..|...#.|....#|#...#|.###.",
  "4": "...#.|..##.|.#.#.|#..#.|#####|...#.|...#.",
  "5": "#####|#....|####.|....#|....#|#...#|.###.",
  "6": "..##.|.#...|#....|####.|#...#|#...#|.###.",
  "7": "#####|....#|...#.|..#..|.#...|.#...|.#...",
  "8": ".###.|#...#|#...#|.###.|#...#|#...#|.###.",
  "9": ".###.|#...#|#...#|.####|....#|...#.|.##..",
  A: "..#..|.#.#.|#...#|#...#|#####|#...#|#...#",
  B: "####.|#...#|#...#|####.|#...#|#...#|####.",
  C: ".###.|#...#|#....|#....|#....|#...#|.###.",
  D: "###..|#..#.|#...#|#...#|#...#|#..#.|###..",
  E: "#####|#....|#....|####.|#....|#....|#####",
  F: "#####|#....|#....|####.|#....|#....|#....",
  G: ".###.|#...#|#....|#.###|#...#|#...#|.####",
  H: "#...#|#...#|#...#|#####|#...#|#...#|#...#",
  I: ".###.|..#..|..#..|..#..|..#..|..#..|.###.",
  J: "..###|...#.|...#.|...#.|...#.|#..#.|.##..",
  K: "#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#",
  L: "#....|#....|#....|#....|#....|#....|#####",
  M: "#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#",
  N: "#...#|##..#|#.#.#|#.#.#|#..##|#...#|#...#",
  O: ".###.|#...#|#...#|#...#|#...#|#...#|.###.",
  P: "####.|#...#|#...#|####.|#....|#....|#....",
  Q: ".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#",
  R: "####.|#...#|#...#|####.|#.#..|#..#.|#...#",
  S: ".####|#....|#....|.###.|....#|....#|####.",
  T: "#####|..#..|..#..|..#..|..#..|..#..|..#..",
  U: "#...#|#...#|#...#|#...#|#...#|#...#|.###.",
  V: "#...#|#...#|#...#|#...#|#...#|.#.#.|..#..",
  W: "#...#|#...#|#...#|#.#.#|#.#.#|##.##|#...#",
  X: "#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
  Y: "#...#|#...#|.#.#.|..#..|..#..|..#..|..#..",
  Z: "#####|....#|...#.|..#..|.#...|#....|#####",
  " ": ".....|.....|.....|.....|.....|.....|.....",
  ".": ".....|.....|.....|.....|.....|.##..|.##..",
  "-": ".....|.....|.....|#####|.....|.....|.....",
  "+": ".....|..#..|..#..|#####|..#..|..#..|.....",
  "/": "....#|....#|...#.|..#..|.#...|#....|#....",
};

const GLYPH_W = 5;
const GLYPH_H = 7;

// ------------------------------------------------------------- drawing canvas

function createCanvas(width, height, fill) {
  const pixels = Buffer.alloc(width * height, fill);
  return {
    width,
    height,
    pixels,
    rect(x, y, w, h, colour) {
      const x0 = Math.max(0, x);
      const y0 = Math.max(0, y);
      const x1 = Math.min(width, x + w);
      const y1 = Math.min(height, y + h);
      for (let row = y0; row < y1; row++) {
        pixels.fill(colour, row * width + x0, row * width + x1);
      }
    },
  };
}

function textWidth(text, scale) {
  if (text.length === 0) return 0;
  return text.length * (GLYPH_W + 1) * scale - scale;
}

function drawText(canvas, text, x, y, scale, colour) {
  let cursor = x;
  for (const char of text.toUpperCase()) {
    const glyph = GLYPHS[char];
    if (glyph) {
      const rows = glyph.split("|");
      for (let row = 0; row < GLYPH_H; row++) {
        for (let col = 0; col < GLYPH_W; col++) {
          if (rows[row][col] === "#") {
            canvas.rect(cursor + col * scale, y + row * scale, scale, scale, colour);
          }
        }
      }
    }
    cursor += (GLYPH_W + 1) * scale;
  }
}

function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ------------------------------------------------------------------- the card

function renderPlaceholder({ productId, productName, view }) {
  const canvas = createCanvas(SIZE, SIZE, WHITE);

  // แถบหัวสีดำ
  const bandH = 110;
  canvas.rect(0, 0, SIZE, bandH, BLACK);
  drawText(canvas, `NO.${String(productId).padStart(3, "0")}`, 32, 36, 6, WHITE);
  const viewLabel = view.slice(0, 10);
  drawText(canvas, viewLabel, SIZE - 32 - textWidth(viewLabel, 5), 42, 5, WHITE);

  // เลขสินค้าตัวใหญ่กลางภาพ
  const bigText = String(productId).padStart(2, "0");
  const bigScale = 42;
  drawText(
    canvas,
    bigText,
    Math.round((SIZE - textWidth(bigText, bigScale)) / 2),
    250,
    bigScale,
    BLACK
  );

  // เส้นคั่นหนา 5px ตามระบบ
  canvas.rect(48, 616, SIZE - 96, 5, BLACK);

  // ชื่อสินค้า
  const nameScale = 5;
  const maxChars = Math.floor((SIZE - 96) / ((GLYPH_W + 1) * nameScale));
  const lines = wrap(productName, maxChars).slice(0, 3);
  lines.forEach((line, index) => {
    drawText(canvas, line, 48, 664 + index * (GLYPH_H * nameScale + 16), nameScale, BLACK);
  });

  return encodePng(canvas.pixels, SIZE, SIZE);
}

// ----------------------------------------------------------------------- main

function viewFromFileName(fileName) {
  const base = fileName.replace(/\.[a-z0-9]+$/i, "");
  const suffix = base.split("-").pop() ?? "";
  return /^[a-z]+$/i.test(suffix) ? suffix : "image";
}

async function main() {
  const url = new URL(process.env.DATABASE_URL);
  const pool = mariadb.createPool({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.slice(1),
    connectionLimit: 2,
  });

  const rows = await pool.query(
    `SELECT pi.image_name, p.id AS product_id, p.name AS product_name
       FROM product_images pi
       JOIN products p ON p.id = pi.product_id
      ORDER BY pi.id`
  );
  await pool.end();

  await mkdir(OUT_DIR, { recursive: true });
  const existing = new Set(await readdir(OUT_DIR));

  let written = 0;
  let skipped = 0;

  for (const row of rows) {
    const fileName = row.image_name.replace(/\.[a-z0-9]+$/i, ".png");

    // ไฟล์รูปจริงที่มีอยู่แล้วจะไม่ถูกเขียนทับ
    if (existing.has(fileName)) {
      skipped++;
      continue;
    }

    const png = renderPlaceholder({
      productId: row.product_id,
      productName: row.product_name ?? "UNTITLED",
      view: viewFromFileName(row.image_name),
    });
    await writeFile(path.join(OUT_DIR, fileName), png);
    written++;
  }

  console.log(`สร้างรูป placeholder ${written} ไฟล์ (ข้ามไฟล์ที่มีอยู่แล้ว ${skipped} ไฟล์)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
