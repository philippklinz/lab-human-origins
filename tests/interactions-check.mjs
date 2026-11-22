/* Actual browser functional tests. All six LAB05 modules, scientific model limits, and UI. */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const browser=await chromium.launch({headless:true});
const failures=[];let passed=0;
async function check(file,fn){
 const p=await browser.newPage({viewport:{width:1280,height:850}});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 try{
  await p.goto(pathToFileURL(join(root,file)).href,{waitUntil:'load'});
  await fn(p);if(errors.length)throw new Error('JavaScript exceptions: '+errors.join('; '));
  console.log('PASS',file);passed++;
 }catch(err){failures.push({file,reason:String(err.stack||err),errors});console.error('FAIL',file,String(err))}
 finally{await p.close()}
}
async function assert(p,fn,message){if(!(await p.evaluate(fn)))throw new Error(message)}
async function slide(p,id,value){await p.locator('#'+id).evaluate((el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}))},value)}
try{
 await check('01_zeitleiste.html',async p=>{
  await assert(p,()=>window.HumanTimeline.species.length===8,'8 timeline species');
  await assert(p,()=>window.HumanTimeline.countAt(.2)>=2,'Sapiens-Neanderthal temporal coexistence');
  await slide(p,'time-age','200');
  await assert(p,()=>Number(document.querySelector('#time-overlap').textContent)>=2,'Temporal slider updates');
  await p.locator('[data-species="sapiens"]').click();
  await assert(p,()=>document.querySelector('#time-title').textContent==='Homo sapiens','Species details update');
  await p.locator('#time-quiz button').nth(1).click();
  await assert(p,()=>document.querySelector('#time-quiz-feedback').dataset.ok==='true','Temporal quiz');
 });
 await check('02_stammbaum.html',async p=>{
  await p.locator('[data-layer="genomes"]').click();
  await assert(p,()=>document.querySelector('#tree-mode').textContent.includes('DNA'),'DNA layer');
  await p.locator('[data-layer="admixture"]').click();
  await assert(p,()=>document.querySelectorAll('#kin-chart [data-network="admixture"]').length===2,'Geneflow additional connections');
  await p.locator('[data-layer="admixture"]').click();
  await assert(p,()=>document.querySelectorAll('#kin-chart [data-network="admixture"]').length===0,'Geneflow removal');
  await p.locator('#tree-quiz button').nth(2).click();
  await assert(p,()=>document.querySelector('#tree-quiz-feedback').dataset.ok==='true','Kinship quiz');
 });
 await check('03_aufrechter_gang.html',async p=>{
  await assert(p,()=>window.HumanGaitMath.distance(20,50)===10,'Distance math');
  await p.locator('[data-walk="lucy"]').click();
  await assert(p,()=>document.querySelector('#walk-name').textContent.includes('Lucy'),'Lucy evidence');
  await slide(p,'walk-steps','40');await slide(p,'walk-length','75');
  await assert(p,()=>document.querySelector('#walk-distance').textContent==='30,0 m','Editable stride times steps');
  await p.locator('[data-walk="erectus"]').click();
  await assert(p,()=>document.querySelector('#walk-name').textContent.includes('erectus'),'Body proportions');
 });
 await check('04_werkzeuge.html',async p=>{
  await p.locator('[data-tool="acheulean"]').click();
  await assert(p,()=>document.querySelector('#tool-name').textContent.includes('Acheuléen'),'Acheulean card');
  await p.locator('[data-tool="msa"]').click();
  await assert(p,()=>document.querySelector('#tool-age').textContent.includes('315'),'MSA dating');
  await p.locator('#tool-quiz button').nth(1).click();
  await assert(p,()=>document.querySelector('#tool-quiz-feedback').dataset.ok==='true','Stone tool quiz');
 });
 await check('05_ausbreitung.html',async p=>{
  await assert(p,()=>window.HumanMigration.siteCount===7,'Seven sites');

  const svgAsset=readFileSync(join(root,'assets/world-natural-earth-110m.svg'),'utf8');
  if(!svgAsset.includes('Natural Earth')||(svgAsset.match(/<path /g)||[]).length<100)throw new Error('Natural Earth SVG incomplete');
  await assert(p,()=>document.querySelector('#migration-art image[data-map-baselayer="natural-earth"]')?.getAttribute('href')==='assets/world-natural-earth-110m.svg','Natural Earth image is embedded');
  await assert(p,()=>Math.abs(window.HumanMigration.project(34.226,109.477).x-771.94)<.2&&Math.abs(window.HumanMigration.project(34.226,109.477).y-148.73)<.2,'Geographic projection at Shangchen');
  await assert(p,()=>window.HumanMigration.sites.length===7&&window.HumanMigration.sites.every(s=>Number.isFinite(s.lat)&&Number.isFinite(s.lon)),'All sites have coordinates');
  await assert(p,()=>document.querySelectorAll('#migration-art [data-site-pin]').length===7,'Seven map pins');
  await p.locator('#migration-art [data-site-pin="denisova"]').click();
  await assert(p,()=>document.querySelector('#migration-name').textContent.includes('Denisova'),'Map markers are interactive');

  await p.locator('[data-site="omo"]').click();
  await assert(p,()=>document.querySelector('#migration-text').textContent.includes('Mindestalter'),'Minimum age Omo');
  await p.locator('#migration-routes').click();await p.locator('#migration-genes').click();
  await assert(p,()=>document.querySelector('#migration-routes').getAttribute('aria-pressed')==='true'&&document.querySelector('#migration-genes').getAttribute('aria-pressed')==='true','Layer toggles');
  await assert(p,()=>document.querySelectorAll('#migration-art [data-map-overlay]').length===2,'Both optional map overlays are rendered');
  await p.locator('#migration-quiz button').nth(2).click();
  await assert(p,()=>document.querySelector('#migration-quiz-feedback').dataset.ok==='true','Denisovan genetic exchange quiz');
 });
 await check('06_evidenz.html',async p=>{
  await assert(p,()=>window.HumanEvidence.count===6,'Six evidence cases');
  for(const i of [0,1,2,0,1,2]){
   await p.locator('#ev-answers button').nth(i).click();
   await assert(p,()=>document.querySelector('#ev-feedback').dataset.ok==='true','Evidence answer grounded');
   await p.locator('#ev-next').click();
  }
  await assert(p,()=>document.querySelector('#ev-question').textContent.includes('6 / 6'),'Evidence completed');
  await p.locator('#ev-reset').click();
  await assert(p,()=>document.querySelector('#ev-score').textContent==='0 / 6','Evidence reset');
 });
}finally{await browser.close()}
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1}
else console.log('PASS:',passed,'human-origins learning modules exercised in Chromium.');
