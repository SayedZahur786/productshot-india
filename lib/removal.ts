'use client';
let sessionPromise:Promise<import('onnxruntime-web').InferenceSession>|undefined;
export async function removeBackground(file:File,onProgress:(message:string)=>void){
 const bitmap=await createImageBitmap(file);if(bitmap.width*bitmap.height>24_000_000){bitmap.close();throw new Error('Use a photo smaller than 24 megapixels.');}
 const ratio=Math.min(1,1400/Math.max(bitmap.width,bitmap.height));const width=Math.round(bitmap.width*ratio),height=Math.round(bitmap.height*ratio);
 const source=document.createElement('canvas');source.width=width;source.height=height;const ctx=source.getContext('2d')!;ctx.drawImage(bitmap,0,0,width,height);bitmap.close();
 const small=document.createElement('canvas');small.width=320;small.height=320;const smallCtx=small.getContext('2d')!;smallCtx.drawImage(source,0,0,320,320);const pixels=smallCtx.getImageData(0,0,320,320).data;
 const input=new Float32Array(3*320*320);let max=1;for(let i=0;i<pixels.length;i++)if(i%4!==3)max=Math.max(max,pixels[i]);const mean=[.485,.456,.406],std=[.229,.224,.225];for(let c=0;c<3;c++)for(let i=0;i<320*320;i++)input[c*320*320+i]=(pixels[i*4+c]/max-mean[c])/std[c];
 onProgress('Loading the background-removal model. First use downloads about 16 MB.');
 const ort=await import('onnxruntime-web/wasm');ort.env.wasm.numThreads=1;ort.env.wasm.proxy=false;ort.env.wasm.wasmPaths='/';
 if(!sessionPromise)sessionPromise=ort.InferenceSession.create('/u2netp.onnx',{executionProviders:['wasm'],graphOptimizationLevel:'all'}).catch(e=>{sessionPromise=undefined;throw e;});
 const session=await sessionPromise;onProgress('Finding the product edges…');const output=await session.run({[session.inputNames[0]]:new ort.Tensor('float32',input,[1,3,320,320])});const mask=output[session.outputNames[0]].data as Float32Array;let min=Infinity,peak=-Infinity;for(const value of mask){min=Math.min(min,value);peak=Math.max(peak,value);}
 const maskData=smallCtx.createImageData(320,320);for(let i=0;i<mask.length;i++){const alpha=Math.round((mask[i]-min)/(peak-min||1)*255);maskData.data[i*4]=255;maskData.data[i*4+1]=255;maskData.data[i*4+2]=255;maskData.data[i*4+3]=alpha;}smallCtx.putImageData(maskData,0,0);
 const cutout=document.createElement('canvas');cutout.width=width;cutout.height=height;const cutCtx=cutout.getContext('2d')!;cutCtx.drawImage(source,0,0);cutCtx.globalCompositeOperation='destination-in';cutCtx.drawImage(small,0,0,width,height);
 const blob=(canvas:HTMLCanvasElement,type:string)=>new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Could not prepare this image.')),type,.9));
 const original=await blob(source,'image/jpeg'),result=await blob(cutout,'image/png');if(original.size+result.size>4_000_000)throw new Error('This photo is too detailed to upload. Try a smaller image.');return{original,cutout:result};
}
