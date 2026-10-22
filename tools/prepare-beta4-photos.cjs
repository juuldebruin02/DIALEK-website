// Web delivery only: resize and encode supplied press photos, no retouching.
// Originals remain in Pressfoto's. Requires Sharp (or DIALEK_SHARP_PATH).
const sharp = require(process.env.DIALEK_SHARP_PATH || 'sharp');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
(async () => {
  for (const [source, target] of [
    ['Opgeschaoren Troubadours Persfoto.jpg', 'opgeschaoren-troubadours.webp'],
    ['Melton.jpg', 'melton.webp']
  ]) {
    const info = await sharp(path.join(root, "Pressfoto's", source))
      .rotate().resize({ width:1800, withoutEnlargement:true })
      .webp({ quality:88, effort:6 })
      .toFile(path.join(root, 'Dialek-master/assets/artists', target));
    console.log(target, info);
  }
})().catch(error => { console.error(error); process.exitCode=1; });
