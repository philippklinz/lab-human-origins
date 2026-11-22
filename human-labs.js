/* LAB 05 – modules 01 to 03.
 * All intervals are approximate teaching windows, never exact first/last dates.
 * SVG drawings are symbolic; no external runtime or user persistence.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const module=document.body.dataset.module;
if(!['01','02','03'].includes(module))return;
const say=(id,value)=>{const el=$(id);if(el)el.textContent=String(value)};
const fmt=(n,d=1)=>new Intl.NumberFormat('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d}).format(n);
const background='<rect width="660" height="390" fill="#102832"/>';
const txt=(x,y,str,size=12,color='#c8e4db',anchor='middle')=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" text-anchor="'+anchor+'" font-family="Liberation Sans,Arial">'+str+'</text>';
function quiz(groupId,feedbackId,explanation){
 const group=$(groupId);if(!group)return;
 const buttons=[...group.querySelectorAll('button')],correct=Number(group.dataset.answer);
 buttons.forEach((b,i)=>b.addEventListener('click',()=>{
   buttons.forEach((n,j)=>{n.disabled=true;n.classList.toggle('correct',j===correct);n.classList.toggle('wrong',j===i&&i!==correct)});
   $(feedbackId).dataset.ok=String(i===correct);
   say(feedbackId,(i===correct?'Richtig. ':'Noch nicht. ')+explanation);
 }));
}
function timeline(){
 // Fossil record spans vary by source; use deliberately approximate pedagogical windows.
 const species=[
 {id:'ard',name:'Ardipithecus ramidus',label:'Ardipithecus',old:4.45,young:4.35,place:'Äthiopien',desc:'Ardi ist etwa 4,4 Millionen Jahre alt. Das Skelett weist eine ungewöhnliche Kombination aus Kletter- und möglichen Zweibeinigkeitsmerkmalen auf. Ein schmaler Markierungsbereich hier ist keine belegte Gesamtdauer der Art.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/ardipithecus-ramidus'},
 {id:'afarensis',name:'Australopithecus afarensis',label:'A. afarensis',old:3.85,young:2.95,place:'Ostafrika',desc:'Zu dieser Art wird Lucy (ca. 3,2 Millionen Jahre) gerechnet. Becken, Knie, Fuß und weitere Fossilien zeigen Zweibeinigkeit bei gleichzeitig anderen Körperproportionen als bei heutigen Menschen.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/australopithecus-afarensis'},
 {id:'africanus',name:'Australopithecus africanus',label:'A. africanus',old:3.3,young:2.1,place:'Südafrika',desc:'Eine südafrikanische Australopithecinen-Linie, die zeitlich teilweise neben anderen frühen Homininen existierte. Die genaue Verwandtschaft zu frühen Homo-Linien wird erforscht.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/australopithecus-africanus'},
 {id:'habilis',name:'Homo habilis',label:'H. habilis',old:2.4,young:1.4,place:'Ost- und Südafrika',desc:'Frühe Homo-Fossilien, deren Artabgrenzung und Stellung innerhalb der menschlichen Linie diskutiert werden. Steinwerkzeuge können nicht jedem Individuum dieser Art zugewiesen werden.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/homo-habilis'},
 {id:'boisei',name:'Paranthropus boisei',label:'P. boisei',old:2.3,young:1.2,place:'Ostafrika',desc:'Eine robuste, spezialisierte Linie mit kräftigem Kauapparat. Sie existierte zeitlich neben frühen Vertretern von Homo und gilt nicht als zwingender direkter Vorfahr heutiger Menschen.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/paranthropus-boisei'},
 {id:'erectus',name:'Homo erectus',label:'H. erectus',old:1.89,young:0.11,place:'Afrika und Asien',desc:'Eine langlebige, geographisch weit verbreitete Homo-Linie mit Fossilien aus Afrika und Asien. Die genaue Abgrenzung früher afrikanischer Formen (oft H. ergaster genannt) ist umstritten.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/homo-erectus'},
 {id:'neander',name:'Homo neanderthalensis',label:'Neandertaler',old:.43,young:.04,place:'Europa und Westasien',desc:'Neandertaler lebten zeitweise parallel zu Homo sapiens. Aus alten Genomen wissen wir von Verwandtschaft und Genfluss zwischen verschiedenen Menschengruppen.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/homo-neanderthalensis'},
 {id:'sapiens',name:'Homo sapiens',label:'H. sapiens',old:.30,young:0,place:'Afrika, später weltweit',desc:'Unsere Art ist fossil seit etwa 300.000 Jahren dokumentiert. Die frühen Funde aus Jebel Irhoud zeigen eine Mischung heutiger und älterer Merkmale; ihre Einordnung ist Teil wissenschaftlicher Debatten.',source:'https://www.nature.com/articles/nature22336'}
 ];
 const range=(age)=>age>=1?fmt(age,2)+' Ma':age===0?'heute':fmt(age*1000,0)+' ka';
 let selected='afarensis';
 const buttons=$('time-species'),age=$('time-age');
 const x=ma=>173+(7-ma)/7*450;
 function chart(){
   const now=Number(age.value)/1000;
   let svg='<rect width="660" height="390" fill="#102832"/>';
   for(let ma=7;ma>=0;ma--){
     const px=x(ma);
     svg+='<line x1="'+px+'" y1="32" x2="'+px+'" y2="332" stroke="#65918e" stroke-opacity=".26"/>'+txt(px,22,String(ma),11);
   }
   species.forEach((s,i)=>{
     const y=62+i*34,active=now<=s.old&&now>=s.young,chosen=s.id===selected;
     svg+=txt(162,y+4,s.label,11,chosen?'#f6c99f':'#d3e7df','end')+
      '<line x1="'+x(s.old)+'" y1="'+y+'" x2="'+x(s.young)+'" y2="'+y+'" stroke="'+(chosen?'#f4c290':active?'#86e1c5':'#5b9790')+'" stroke-width="'+(chosen?10:7)+'" stroke-linecap="round"/>';
     if(s.id==='ard')svg+='<circle cx="'+x(4.4)+'" cy="'+y+'" r="5" fill="#edbe8c"/>';
   });
   svg+='<line x1="'+x(now)+'" y1="36" x2="'+x(now)+'" y2="332" stroke="#f3c69f" stroke-width="2" stroke-dasharray="4 5"/>'+
    txt(x(now),350,'ZEIT: '+range(now),11,'#eec3a0');
   $('time-chart').innerHTML=svg;
   $('time-chart').setAttribute('aria-label','Fossil-Zeitfenster: Auswahl '+species.find(s=>s.id===selected).name+'. Eingestellter Zeitpunkt '+range(now));
   say('time-age-label',range(now));say('time-now',range(now));
   say('time-overlap',species.filter(s=>now<=s.old&&now>=s.young).length);
 }
 function select(id){
   const s=species.find(p=>p.id===id);if(!s)return;selected=id;
   say('time-title',s.name);say('time-description',s.desc);
   say('time-range',range(s.old)+' bis '+range(s.young));
   say('time-place',s.place);$('time-source').href=s.source;
   [...buttons.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.species===id)));
   chart();
 }
 species.forEach(s=>{
  const b=document.createElement('button');b.type='button';b.dataset.species=s.id;
  const title=document.createElement('strong');title.textContent=s.name;
  const small=document.createElement('small');small.textContent=range(s.old)+' – '+range(s.young);
  b.append(title,small);b.addEventListener('click',()=>select(s.id));buttons.append(b);
 });
 age.addEventListener('input',chart);
 quiz('time-quiz','time-quiz-feedback','Die fossil und genetisch rekonstruierbaren Zeiträume von Neandertalern und Homo sapiens überschneiden sich. Das allein bestimmt nicht die Richtung von Abstammung.');
 say('time-count',species.length);select(selected);
 window.HumanTimeline=Object.freeze({species:species.map(s=>Object.freeze({id:s.id,old:s.old,young:s.young})),countAt:ma=>species.filter(s=>ma<=s.old&&ma>=s.young).length});
}
function familyTree(){
 let fossils=true,genomes=false,admixture=false;
 const layers={
 fossils:{type:'FOSSILIEN / MORPHOLOGIE',name:'Skelette liefern ein Mosaik.',story:'Australopithecinen und frühe Homo-Formen sind aus verschieden vollständigen Fossilien bekannt. Die Zuordnung von Funden zu Arten und die genauen Verzweigungen sind nicht für alle Linien gesichert.',limit:'Aus zwei ähnlich aussehenden Schädeln folgt nicht automatisch eine direkte Eltern-Kind-Folge.'},
 genomes:{type:'ALTE DNA / VERWANDTSCHAFT',name:'DNA klärt einige jüngere Beziehungen.',story:'Genomanalysen stützen eine engere gemeinsame Evolutionsgeschichte der Neandertaler und Denisova-Menschen gegenüber der Linie heutiger Homo sapiens.',limit:'Für viele Millionen Jahre alte Australopithecinen verfügen wir nicht über vergleichbare alte DNA. Ein vollständiger genetischer Stammbaum aller Homininen ist nicht möglich.'},
 admixture:{type:'GENFLUSS / KONTAKTE',name:'Menschenlinien vermischten sich.',story:'Der Vergleich alter und heutiger Genome weist Gene aus Neandertaler- und Denisova-bezogenen Populationen in Vorfahren heutiger Menschen nach.',limit:'Die zusätzlichen Linien sind symbolische Hinweise auf genetischen Austausch, keine Routen einzelner Personen und keine Behauptung über Herkunft heutiger Individuen.'}
 };
 function paint(){
  const main=fossils?'fossils':genomes?'genomes':'admixture',info=layers[admixture?'admixture':genomes?'genomes':'fossils'];
  let paths='<rect width="640" height="375" fill="#102832"/>';
  paths+= '<path d="M75 318L165 265L215 231" stroke="#9cd5c5" stroke-width="4" fill="none" stroke-dasharray="6 6"/>'+
   '<path d="M215 231L300 178" stroke="#9cd5c5" stroke-width="4" fill="none" stroke-dasharray="6 6"/>'+
   '<path d="M300 178L413 102M300 178L413 224" stroke="#9bd0c3" stroke-width="4" fill="none" stroke-dasharray="6 6"/>';
  if(genomes||admixture){
    paths+='<path d="M413 224L486 182L564 142M486 182L564 253" stroke="#6fe0c8" stroke-width="4" fill="none"/>'+
      '<path d="M300 178L417 109L562 92" stroke="#91a9c0" stroke-width="2.5" fill="none"/>';
  }else paths+='<path d="M413 224L562 148M413 224L562 252" stroke="#668e8c" stroke-width="3" stroke-dasharray="5 9" fill="none"/>';
  if(admixture)paths+='<path data-network="admixture" d="M552 145 Q594 56 553 92" fill="none" stroke="#e5b48b" stroke-dasharray="7 6" stroke-width="3"/>'+
    '<path data-network="admixture" d="M552 253 Q614 135 557 95" fill="none" stroke="#e5b48b" stroke-dasharray="7 6" stroke-width="3"/>';
  const names=[
    [85,317,'Australopithecinen'],[267,250,'Frühe Homo-Linien'],[510,72,'Homo sapiens'],[513,138,'Neandertaler'],[514,277,'Denisova-Linie']
  ];
  paths+=names.map(([x,y,label])=>txt(x,y,label,12,'#d4ebe4')).join('');
  paths+= '<g fill="#4c9d91" stroke="#c9e7dd" stroke-width="2"><circle cx="75" cy="318" r="7"/><circle cx="215" cy="231" r="7"/><circle cx="300" cy="178" r="7"/><circle cx="413" cy="102" r="7"/><circle cx="413" cy="224" r="7"/><circle cx="562" cy="92" r="10"/><circle cx="562" cy="148" r="10"/><circle cx="562" cy="252" r="10"/></g>';
  paths+=txt(320,352,'VEREINFACHT · ZEITLICHE ABSTÄNDE NICHT MASSSTÄBLICH',11,'#a7ccc0');
  $('kin-chart').innerHTML=paths;
  say('tree-mode',[fossils?'FOSSILIEN':'',genomes?'DNA':'',admixture?'GENFLUSS':''].filter(Boolean).join(' + ')||'SCHEMA');
  say('tree-kind',info.type);say('tree-name',info.name);say('tree-story',info.story);say('tree-limit',info.limit);
  say('tree-conclusion',fossils||genomes||admixture?
    'Verbindungen sind Hypothesen oder grobe Abzweigungen. Alte Genome verändern unser Verständnis einzelner Verwandtschaftsverhältnisse, ohne alle frühen Linien aufzuklären.':
    'Wähle Evidenzarten, um zu erkunden, warum der Stammbaum keine einfache Leiter ist.');
  document.querySelectorAll('[data-layer]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.layer==='fossils'?fossils:b.dataset.layer==='genomes'?genomes:admixture)));
 }
 document.querySelectorAll('[data-layer]').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.layer==='fossils')fossils=!fossils;
  if(b.dataset.layer==='genomes')genomes=!genomes;
  if(b.dataset.layer==='admixture')admixture=!admixture;
  if(admixture)genomes=true;paint();
 }));
 quiz('tree-quiz','tree-quiz-feedback','Ähnlichkeiten im Genom können auf verwandte Populationen hinweisen; Datierung, Verunreinigung und geeignete statistische Modelle müssen geprüft werden.');
 paint();
}
function walking(){
 const cases={
 laetoli:{name:'Laetoli-Fußspuren',date:'CA. 3,6 MILLIONEN JAHRE',desc:'In vulkanischer Asche erhaltene Fußspuren zeigen, dass frühe Homininen auf zwei Beinen gingen – lange bevor unsere Art Homo sapiens entstand.',fact:'Abrollmuster und die Ausrichtung der großen Zehe liefern Hinweise auf eine zweibeinige Gangweise.',limit:'Die genaue Identität aller Spurenverursacher lässt sich nicht aus dem Abdruck allein beweisen. Eine Zuschreibung zu A. afarensis ist plausibel, bleibt aber eine wissenschaftliche Zuordnung.',source:'https://humanorigins.si.edu/evidence/behavior/footprints/laetoli-footprint-trails',
 art:'<g fill="#4f958b" stroke="#a8ded0" stroke-width="3">'+[0,1,2,3].map((_,i)=>{let x=164+(i%2)*175,y=85+Math.floor(i/2)*128;return '<ellipse cx="'+x+'" cy="'+y+'" rx="34" ry="49" transform="rotate('+(i%2?17:-17)+' '+x+' '+y+')"/><circle cx="'+(x+15)+'" cy="'+(y-42)+'" r="14"/>'}).join('')+'</g>'},
 lucy:{name:'Lucy und Australopithecus afarensis',date:'CA. 3,2 MILLIONEN JAHRE',desc:'Das Teilskelett AL 288-1 („Lucy“) liefert wichtige Informationen zur Beckenform, Knie- und Beinmechanik eines frühen Homininen.',fact:'Anatomische Merkmale weisen auf habituelle Zweibeinigkeit hin. Gleichzeitig zeigen andere Skelettmerkmale eine Kombination verschiedener Fortbewegungsmöglichkeiten.',limit:'Eine fossile Beckenform erlaubt keine direkte Messung von Muskelkräften, Ganggeschwindigkeit oder sämtlichen Alltagsbewegungen.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/australopithecus-afarensis',
 art:'<path d="M267 66L326 66L361 130L327 168L275 168L240 130Z" fill="#608b83" stroke="#c4e0d0" stroke-width="6"/><path d="M275 169L238 253M327 169L359 253" stroke="#e2bd91" stroke-width="16" stroke-linecap="round"/><circle cx="293" cy="129" r="20" fill="#163941" stroke="#e0d4aa" stroke-width="3"/>'+txt(295,296,'SCHEMATISCHES BECKEN UND BEINE',12)},
 erectus:{name:'Homo erectus: Körperproportionen',date:'AB ETWA 1,9 MILLIONEN JAHREN',desc:'Einige frühe Homo-erectus-Fossilien zeigen im Verhältnis zum Rumpf längere Beine und kürzere Arme als viele frühere Homininen.',fact:'Beinknochen und rekonstruierte Körperproportionen lassen sich mit heutigen Körperbauvariationen vergleichen.',limit:'Das ist keine exakte Rekonstruktion eines einzelnen Ganges und bedeutet nicht, dass alle Individuen dieselben Körperproportionen hatten.',source:'https://humanorigins.si.edu/evidence/human-fossils/species/homo-erectus',
 art:'<circle cx="296" cy="77" r="32" stroke="#b6d9cc" stroke-width="7" fill="#315e62"/><path d="M274 114L256 198M318 114L335 198M296 114L296 202M295 200L258 287M295 200L334 287" stroke="#9ad4bd" stroke-width="15" stroke-linecap="round" fill="none"/>'+txt(452,180,'RELATIVE',14)+txt(452,200,'PROPORTIONEN',13)}
 };
 const buttons=[...document.querySelectorAll('[data-walk]')];let selected='laetoli';
 function render(){
  const item=cases[selected];say('walk-name',item.name);say('walk-date',item.date);
  say('walk-text',item.desc);say('walk-fact',item.fact);say('walk-limit',item.limit);
  $('walk-source').href=item.source;
  $('walk-art').innerHTML='<rect width="640" height="340" fill="#102832"/>'+item.art;
  $('walk-art').setAttribute('aria-label','Schematische Illustration zu '+item.name);
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.walk===selected)));
 }
 function measure(){
  const steps=Number($('walk-steps').value),cm=Number($('walk-length').value);
  say('walk-steps-val',steps);say('walk-length-val',cm+' cm');say('walk-distance',fmt(steps*cm/100)+' m');say('walk-number',steps);say('walk-cm',cm+' cm');
 }
 buttons.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.walk;render()}));
 for(const id of ['walk-steps','walk-length'])$(id).addEventListener('input',measure);
 window.HumanGaitMath=Object.freeze({distance:(steps,cm)=>steps*cm/100});
 render();measure();
}
if(module==='01')timeline();
if(module==='02')familyTree();
if(module==='03')walking();
})();