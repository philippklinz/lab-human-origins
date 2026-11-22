/* Responsive regression checks: real Chromium, all standalone pages, 320–1600px. */
import {chromium} from 'playwright';
import {readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const pages=readdirSync(root).filter(x=>x==='index.html'||/^\d{2}_[a-z_]+\.html$/.test(x));
const widths=[320,360,375,390,480,650,768,900,1024,1180,1440,1600];
const browser=await chromium.launch({headless:true});
let fail=[];
try{
 for(const f of pages){
  const page=await browser.newPage({viewport:{width:320,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(pathToFileURL(join(root,f)).href,{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  for(const width of widths){
   await page.setViewportSize({width,height:900});
   const s=await page.evaluate(()=>{
    const w=document.documentElement.clientWidth,sw=document.documentElement.scrollWidth;
    const wrappers=[...document.querySelectorAll('.ho-wrap')].map(e=>{
      const c=getComputedStyle(e),r=e.getBoundingClientRect();
      return {left:parseFloat(c.paddingLeft),right:parseFloat(c.paddingRight),x:r.left,end:r.right};
    });
    const offenders=[...document.querySelectorAll('body *')].flatMap(e=>{
      const r=e.getBoundingClientRect();
      return r.width>0&&(r.left < -1.2 || r.right>w+1.2)
      ? [{name:e.tagName,cls:String(e.className).slice(0,70),left:Math.round(r.left),right:Math.round(r.right)}]:[];
    }).slice(0,6);
    return {w,sw,wrappers,offenders};
   });
   if(s.sw>width+1||s.w!==width||s.wrappers.some(x=>x.left<17||x.right<17||x.x<-1||x.end>width+1))
    fail.push({f,width,scrollWidth:s.sw,wrappers:s.wrappers,offenders:s.offenders});
  }
  if(errors.length)fail.push({f,jsErrors:errors});
  console.log('Checked',f,'at',widths.length,'widths');
  await page.close();
 }
}finally{await browser.close()}
if(fail.length){console.error('LAYOUT FAILURES:',JSON.stringify(fail,null,2));process.exitCode=1}
else console.log('PASS:',pages.length,'pages x',widths.length,'viewport sizes; no page overflow; gutters preserved.');
