/**
 * Media pipeline.
 *
 *   node tools/media.mjs
 *
 * 1. Converts any *.png dropped into public/media/images to optimised WebP.
 * 2. Re-encodes any *.raw.mp4 in public/media/video into two web-ready forms:
 *      - <name>.mp4        loop/ambient playback (sparse keyframes, small)
 *      - <name>.scrub.mp4  every frame a keyframe, so scroll-scrubbing can
 *                          seek to an arbitrary time without decode stalls
 *    and extracts <name>-poster.webp for the video's poster attribute.
 *
 * Scrub files are only produced for the clips named in SCRUB below — all-
 * keyframe encoding roughly triples file size, so it is reserved for the
 * clips the scroll actually scrubs.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const IMG_DIR = "public/media/images";
const VID_DIR = "public/media/video";
const SCRUB = new Set(["hero", "hero-vertical", "weld"]);

const run = (args) => execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...args]);
const kb = (p) => `${Math.round(statSync(p).size / 1024)}KB`;

// ---------------------------------------------------------------- images
for (const f of readdirSync(IMG_DIR).filter((f) => f.endsWith(".png"))) {
  const src = path.join(IMG_DIR, f);
  const out = src.replace(/\.png$/, ".webp");
  const meta = await sharp(src).metadata();
  const maxW = meta.width >= meta.height ? 1920 : 1280;
  await sharp(src)
    .resize({ width: Math.min(maxW, meta.width), withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  unlinkSync(src);
  console.log(`img  ${path.basename(out)}  ${kb(out)}`);
}

// ---------------------------------------------------------------- video
for (const f of readdirSync(VID_DIR).filter((f) => f.endsWith(".raw.mp4"))) {
  const src = path.join(VID_DIR, f);
  const name = f.replace(/\.raw\.mp4$/, "");

  // Ambient loop copy: good quality, small, streams progressively.
  const loop = path.join(VID_DIR, `${name}.mp4`);
  run([
    "-i", src,
    "-an",
    "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-crf", "27", "-preset", "slow",
    "-movflags", "+faststart",
    "-vf", "scale='min(1600,iw)':-2",
    loop,
  ]);
  console.log(`vid  ${name}.mp4  ${kb(loop)}`);

  // Scrub copy: -g 1 makes every frame an I-frame so currentTime seeks land
  // instantly. Much larger, so only for clips the scroll actually drives.
  if (SCRUB.has(name)) {
    const scrub = path.join(VID_DIR, `${name}.scrub.mp4`);
    run([
      "-i", src,
      "-an",
      "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-crf", "30", "-preset", "slow",
      "-g", "1", "-keyint_min", "1", "-sc_threshold", "0",
      "-movflags", "+faststart",
      "-vf", "scale='min(1400,iw)':-2",
      scrub,
    ]);
    console.log(`vid  ${name}.scrub.mp4  ${kb(scrub)}  (all-keyframe)`);
  }

  // Poster frame.
  const posterPng = path.join(VID_DIR, `${name}-poster.png`);
  run(["-i", src, "-vframes", "1", "-q:v", "2", posterPng]);
  const poster = path.join(VID_DIR, `${name}-poster.webp`);
  await sharp(posterPng).resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 70 }).toFile(poster);
  unlinkSync(posterPng);
  console.log(`vid  ${name}-poster.webp  ${kb(poster)}`);

  unlinkSync(src);
}

if (!existsSync(VID_DIR)) console.warn("no video dir");
