import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {getDocument} from 'pdfjs-dist/legacy/build/pdf.mjs';
const require=createRequire(import.meta.url),pdfRequire=createRequire(require.resolve('pdfjs-dist/package.json'));
const {createCanvas}=pdfRequire('@napi-rs/canvas');
for(const [name,pages] of [['GuidorizziVol1.pdf',940],['Stewart_1_ptbr.pdf',661],['UERJ.pdf',452]]){
 const task=getDocument({data:new Uint8Array(readFileSync('/workspace/scratch/2b9b65b2ee78/upload/'+name)),standardFontDataUrl:process.cwd()+'/public/pdfjs/standard_fonts/',cMapUrl:process.cwd()+'/public/pdfjs/cmaps/',cMapPacked:true,wasmUrl:process.cwd()+'/public/pdfjs/wasm/'});const doc=await task.promise;
 assert.equal(doc.numPages,pages);const page=await doc.getPage(100),view=page.getViewport({scale:1});const canvas=createCanvas(Math.ceil(view.width),Math.ceil(view.height));await page.render({canvas,canvasContext:canvas.getContext('2d'),viewport:view}).promise;
 console.log(name+': '+pages+' pages; page 100 rendered successfully.');await task.destroy();
}
