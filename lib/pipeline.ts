import sharp from 'sharp';
import {presets,type Preset,type Scene,MAX_BYTES} from './presets';
export async function validateImage(bytes:Buffer) {
 if(bytes.length>MAX_BYTES) throw new Error('Image exceeds 10 MB.');
 const meta=await sharp(bytes,{limitInputPixels:24_000_000}).metadata();
 if(!['jpeg','png','webp'].includes(meta.format||'')||!meta.width||!meta.height||meta.pages&&meta.pages>1) throw new Error('Use a single JPEG, PNG or WebP image.');
 return meta;
}
export async function compose(cutout:Buffer,preset:Preset,scene:Scene){
 await validateImage(cutout);
 const {data,info}=await sharp(cutout,{limitInputPixels:24_000_000}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let left=info.width,top=info.height,right=-1,bottom=-1;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>12){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}
 if(right<0)throw new Error('No product found. Try a clearer photo.');
 const size=presets[preset].size, bound=Math.round(size*.86);
 const foreground=await sharp(cutout).extract({left,top,width:right-left+1,height:bottom-top+1}).resize(bound,bound,{fit:'inside'}).png().toBuffer();
 const fg=await sharp(foreground).metadata();
 const colors=scene==='warm'?['#f2e4d7','#d3b397']:['#e1eee7','#9ab5a5'];
 const background=scene==='white'?{create:{width:size,height:size,channels:3 as const,background:'#ffffff'}}:Buffer.from(`<svg width="${size}" height="${size}"><defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><path d="M0 ${size*.78}H${size}V${size}H0Z" fill="${colors[0]}"/><ellipse cx="${size/2}" cy="${size*.9}" rx="${size*.3}" ry="${size*.025}" fill="#24352d" opacity=".12"/></svg>`);
 return (Buffer.isBuffer(background)?sharp(background):sharp(background)).composite([{input:foreground,left:Math.round((size-fg.width!)/2),top:Math.round((size-fg.height!)/2)}]).jpeg({quality:92,mozjpeg:true}).toBuffer();
}
