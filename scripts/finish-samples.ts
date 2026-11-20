import {readFile,writeFile}from 'node:fs/promises';import sharp from 'sharp';import {compose}from '../lib/pipeline';
async function main(){for(const name of ['bottle','mug','bag','shoe','jar']){const cutout=await readFile(`.local/source/${name}-cutout.png`);for(const scene of ['white','warm','mint']as const){const bytes=await compose(cutout,'amazon',scene);await writeFile(`public/samples/${name}-${scene==='white'?'after':scene}.jpg`,await sharp(bytes).resize(1000).jpeg({quality:87}).toBuffer());}}
}
main().catch(e=>{console.error(e);process.exit(1)});
