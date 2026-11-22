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
 // Original teaching drawings: qualitative geometry, never tracings or fossil measurements.
 // Each panel has its own viewBox so comparisons stack without shrinking labels on phones.
 const label=(x,y,s,anchor='start')=>txt(x,y,s,18,'#d6e9e4',anchor);
 const line=d=>'<path class="walk-guide" d="'+d+'"/>';
 const feature=(id,art)=>'<g data-walk-feature="'+id+'">'+art+'</g>';
 const badge=(x,y,n)=>'<g class="walk-marker"><circle cx="'+x+'" cy="'+y+'" r="13"/>'+txt(x,y+6,n,17,'#102832')+'</g>';
 const panel=(id,kicker,title,subtitle,description,art,caption)=>
  '<figure class="walk-panel"><header><span class="walk-kicker">'+kicker+'</span><h4>'+title+'</h4><p>'+subtitle+'</p></header>'+
  '<svg viewBox="0 0 460 440" role="img" aria-labelledby="'+id+'-title '+id+'-desc"><title id="'+id+'-title">'+title+'</title><desc id="'+id+'-desc">'+description+'</desc>'+art+'</svg><figcaption>'+caption+'</figcaption></figure>';
 // Left sole seen from above: the large toe is medial (on the right). Mirror for a right foot.
 const sole='<path class="walk-sole" d="M43 46C24 43 12 64 13 88C13 111 24 129 26 145C27 157 22 169 30 182C38 195 59 195 68 182C78 168 67 150 64 135C61 118 79 103 80 82C81 63 64 47 43 46Z"/>';
 function foot(detail=false){
  return sole+feature('toe','<ellipse class="walk-bone" cx="73" cy="24" rx="13" ry="20"/>')+
   '<g class="walk-bone"><ellipse cx="49" cy="24" rx="9" ry="15"/><ellipse cx="30" cy="29" rx="8" ry="13"/><ellipse cx="15" cy="39" rx="6" ry="10"/><ellipse cx="5" cy="52" rx="5" ry="8"/></g>'+
   (detail?feature('heel','<path class="walk-region" d="M31 157Q46 145 65 157Q77 183 51 187Q27 188 31 157Z"/>')+
    feature('arch','<path class="walk-emphasis" d="M76 101Q53 126 66 150" stroke-dasharray="4 4"/>'):'');
 }
 function trackway(){
  let art=line('M225 56V403')+'<path class="walk-direction" d="M53 365V91m-8 12 8-12 8 12"/>'+label(31,57,'Gehrichtung');
  const prints=[{x:135,y:302,side:'L'},{x:262,y:215,side:'R'},{x:135,y:128,side:'L'},{x:262,y:41,side:'R'}];
  prints.forEach((p,i)=>{
   art+='<g data-footstep="'+(i+1)+'" data-side="'+p.side+'" transform="translate('+p.x+' '+p.y+') scale(.5)">'+(p.side==='R'?'<g transform="translate(85 0) scale(-1 1)">':'<g>')+foot()+'</g></g>';
   art+=label(p.side==='L'?122:315,p.y+64,(i+1)+' · '+p.side,p.side==='L'?'end':'start');
  });
  art+='<path class="walk-measure" d="M280 310H383M160 397H383M375 310V397m-7-87h14m-14 87h14"/>'+label(392,348,'Ein')+label(392,371,'Schritt');
  return art;
 }
 function footprint(){
  return '<g transform="translate(66 49) scale(1.72)">'+foot(true)+'</g>'+
   feature('toe',line('M202 89H246V82H271')+badge(283,82,'2')+label(305,88,'Großzehe'))+
   feature('arch',line('M184 264H249V230H271')+badge(283,230,'3')+label(305,236,'Innenrand'))+
   feature('heel',line('M165 349H271')+badge(283,349,'1')+label(305,355,'Ferse'));
 }
 function pelvis(afarensis){
  // Anterior view. Femoral heads articulate medially; shafts converge toward the knees.
  const wing=afarensis?
   'M220 139C200 114 163 91 113 103Q85 114 105 151L142 187Q130 213 149 239Q175 262 220 233L224 211Q188 211 183 192Q192 167 220 160Z':
   'M221 165Q210 139 210 92Q203 63 179 76Q153 105 163 157L181 208Q159 235 181 262Q205 275 224 240L224 218Q202 215 200 197Z';
  const hole=afarensis?'M166 209Q150 220 164 239Q188 245 207 227Q189 211 166 209Z':'M193 226Q179 235 191 251Q209 255 216 237Z';
  let art=line('M230 26V403')+label(230,30,'Körpermitte','middle');
  art+='<g class="walk-bone walk-spine"><rect x="216" y="48" width="28" height="16" rx="4"/><rect x="214" y="69" width="32" height="16" rx="4"/><rect x="212" y="90" width="36" height="16" rx="4"/></g>';
  art+=feature('pelvis','<g class="walk-bone"><path d="'+wing+' '+hole+'" fill-rule="evenodd"/><path transform="translate(460 0) scale(-1 1)" d="'+wing+' '+hole+'" fill-rule="evenodd"/><path d="M211 119Q230 111 249 119L242 166L230 181L218 166Z"/></g>');
  const hip=afarensis?151:187,shaft=afarensis?128:169,knee=afarensis?185:166,hy=afarensis?198:218;
  const bone='M'+hip+' '+hy+'L'+shaft+' '+(hy+19)+'L'+knee+' 357';
  art+=feature('knee','<g class="walk-limb"><path d="'+bone+'"/><path transform="translate(460 0) scale(-1 1)" d="'+bone+'"/></g><g class="walk-bone"><circle cx="'+hip+'" cy="'+hy+'" r="13"/><circle cx="'+(460-hip)+'" cy="'+hy+'" r="13"/><ellipse cx="'+knee+'" cy="363" rx="18" ry="11"/><ellipse cx="'+(460-knee)+'" cy="363" rx="18" ry="11"/></g>');
  art+=feature('pelvis','<path class="walk-measure" d="M77 '+(afarensis?'105V164m-6-59h12m-12 59h12':'78V204m-6-126h12m-12 126h12')+'"/>'+badge(57,afarensis?134:140,'1'));
  art+=feature('knee',line('M'+(knee-23)+' 363H91')+badge(77,363,'2')+label(27,400,'Knie'));
  art+=label(333,300,'Ober-')+label(333,322,'schenkel')+line('M326 312H'+(460-knee+9));
  if(afarensis)art+=feature('knee','<path class="walk-direction" d="M125 335H157m-9-7 9 7-9 7M335 335H303m9-7-9 7 9 7"/>');
  return art;
 }
 function proportions(erectus){
  // Both figures use identical shoulder/hip levels: only qualitative limb proportions differ.
  const elbow=erectus?168:181,wrist=erectus?238:252,knee=erectus?307:295,ankle=erectus?398:375;
  let art=feature('trunk',line('M68 109H397M68 219H397'));
  art+='<path class="walk-body" d="M210 93L205 109Q182 106 173 126L192 184L190 217Q230 237 270 217L268 184L287 126Q278 106 255 109L250 93Z"/><path class="walk-body" d="M207 69Q201 33 230 30Q259 33 253 69L246 91Q230 103 214 91Z"/>';
  art+=feature('trunk','<path class="walk-trunk" d="M230 110V219"/><path class="walk-measure" d="M349 109V219m-7-110h14m-14 110h14"/>'+label(367,157,'Rumpf'));
  art+=feature('arms','<g class="walk-limb"><path d="M181 122L158 '+elbow+'L146 '+wrist+'M279 122L302 '+elbow+'L314 '+wrist+'"/></g><g class="walk-joint"><circle cx="158" cy="'+elbow+'" r="6"/><circle cx="302" cy="'+elbow+'" r="6"/></g><path class="walk-measure" d="M110 122V'+wrist+'m-7 0h14M103 122h14"/>'+badge(91,151,'1')+label(43,182,'Arme'));
  art+=feature('legs','<g class="walk-limb"><path d="M206 220L204 '+knee+'L198 '+ankle+'M254 220L256 '+knee+'L262 '+ankle+'"/></g><g class="walk-joint"><circle cx="204" cy="'+knee+'" r="6"/><circle cx="256" cy="'+knee+'" r="6"/></g><path class="walk-foot-line" d="M198 '+ankle+'l-17 9h22M262 '+ankle+'l17 9h-22"/><path class="walk-measure" d="M350 225V'+ankle+'m-7 0h14M343 225h14"/>'+badge(374,280,'2')+label(367,312,'Beine'));
  return art;
 }
 const cases={
  laetoli:{name:'Laetoli: Wie wird aus Abdrücken eine Gangspur?',date:'VOR CA. 3,6 MILLIONEN JAHREN',
   desc:'In Laetoli, Tansania, blieben Fußspuren in vulkanischer Asche erhalten. Ihre Form und Anordnung zeigen: Hier gingen frühe Homininen auf zwei Beinen.',
   fact:'Linke und rechte Fußabdrücke folgen aufeinander. Ferse und eine nach vorn gerichtete Großzehe sind erkennbar.',
   inference:'Die Spuren belegen zweibeiniges Gehen. Aus Form und Tiefe der Abdrücke wird erschlossen, wie der Fuß belastet wurde.',
   limit:'Die Spur verrät nicht sicher die Art. Die Zuordnung zu Australopithecus afarensis ist plausibel. Fußgewölbe und genaue Gangmechanik werden unterschiedlich rekonstruiert.',
   source:'https://humanorigins.si.edu/evidence/behavior/footprints/laetoli-footprint-trails',sourceName:'Smithsonian · Laetoli-Fußspuren',
   note:'Lehrschema einer einzelnen Schrittfolge, keine Kopie der Laetoli-Spur. Form, Abstände und Abdrucktiefe sind nicht vermessen.',
   art:()=>panel('walk-trail','A / DRAUFSICHT','Links, rechts, links, rechts','L = linker Fuß · R = rechter Fuß',
    'Vier abwechselnde linke und rechte Abdrücke, von unten nach oben als 1 bis 4 nummeriert. Die großen Zehen liegen jeweils zur Körpermitte. Die Klammer verbindet zwei aufeinanderfolgende Fersenpositionen in Gehrichtung.',trackway(),
    '<strong>Von unten nach oben lesen.</strong> Ein Schritt reicht von einem Fußkontakt zum nächsten des anderen Fußes. Vier Abdrücke begrenzen drei Schrittintervalle.')+
    panel('walk-print','B / VERGRÖSSERTES LEHRSCHEMA','Was steckt in einem Abdruck?','Linker Fuß · Zehen zeigen nach oben',
    'Ein linker Fußabdruck mit fünf Zehen. Drei beschriftete Merkmale: Ferse, nach vorn gerichtete Großzehe und eingezogener Fußinnenrand. Der Innenrand ist gestrichelt, weil er keine exakte Rekonstruktion des fossilen Gewölbes darstellt.',footprint(),
    '<strong>Form ist ein Hinweis auf Funktion.</strong> Die Farbmarkierung zeigt das unten ausgewählte Merkmal; sie stellt keinen gemessenen Druck dar.'),
   details:[
    {id:'heel',label:'1 · Ferse',text:'Der hintere Abdruck gehört zur Ferse. Zusammen mit dem Vorfuß hilft er zu erschließen, wie sich die Belastung während eines Schritts verlagert. Eine gemessene Druckverteilung zeigt dieses Schema nicht.'},
    {id:'toe',label:'2 · Großzehe',text:'Die Großzehe liegt neben den anderen Zehen und zeigt nach vorn. Sie ist nicht seitlich abgespreizt wie eine Greifzehe. Bei linkem und rechtem Fuß liegt sie jeweils innen.'},
    {id:'arch',label:'3 · Innenrand',text:'Die Einbuchtung markiert, wo das Fußlängsgewölbe den Bodenkontakt beeinflussen kann. Wie stark dieses Gewölbe bei den Laetoli-Verursachern ausgeprägt war, ist umstritten. Der gestrichelte Rand ist deshalb nur ein Orientierungsschema.'}
   ]},
  lucy:{name:'Lucy: Was verraten Becken und Oberschenkel?',date:'LUCY · VOR CA. 3,2 MILLIONEN JAHREN',
   desc:'Lucy ist ein Teilskelett der Art Australopithecus afarensis. Der Vergleich zeigt zwei anatomische Merkmale, die regelmäßiges Gehen auf zwei Beinen ermöglichen.',
   fact:'Das Becken ist kurz und breit. Die Oberschenkel sind zum Knie hin nach innen geneigt.',
   inference:'Diese Kombination unterstützt die aufrechte Körperhaltung und bringt die Knie näher unter den Körper. Das hilft, beim Gehen auf einem Bein zu balancieren.',
   limit:'Dies ist ein ergänztes anatomisches Lehrschema, kein Bild der erhaltenen Lucy-Knochen. Es zeigt weder genaue Gelenkwinkel noch Muskelkräfte; auch Klettern gehörte zum Bewegungsrepertoire von A. afarensis.',
   source:'https://iho.asu.edu/node/15',sourceName:'ASU · Lucy und ihre Anatomie',
   note:'Vorderansicht, stark vereinfacht und ohne gemeinsamen Größenmaßstab. Der heutige Schimpanse ist ein Vergleich, kein dargestellter Vorfahr.',
   art:()=>panel('walk-chimp','A / HEUTIGER VERGLEICH','Schimpanse','Hohes, schmales Becken',
    'Schematische Vorderansicht eines Schimpansenbeckens mit hohen, schmalen Beckenschaufeln und vergleichsweise geraden Oberschenkeln. Die gestrichelte Linie zeigt die Körpermitte.',pelvis(false),
    'Schimpansen können zeitweise auf zwei Beinen gehen. Ihr Körperbau unterscheidet sich aber von dem eines regelmäßigen Zweibeiners.')+
    panel('walk-lucy','B / FRÜHER HOMININE','Australopithecus afarensis','Lucys Art · kurzes, breites Becken',
    'Schematische Vorderansicht eines kurzen, breiten Beckens. Die Oberschenkelschäfte neigen sich von der Hüfte zu den Knien nach innen. Pfeile betonen, dass die Knie näher zur Körpermitte liegen.',pelvis(true),
    '<strong>Auf die Knie achten:</strong> Die Oberschenkel laufen nach innen. So liegen die Knie näher unter dem Körper.'),
   details:[
    {id:'pelvis',label:'1 · Beckenform',text:'Das Becken verbindet Rumpf und Beine. Kurze, breite Beckenschaufeln verändern auch die Lage der Gesäßmuskeln. Diese helfen, das Becken in der Einbeinphase eines Schritts zu stabilisieren.'},
    {id:'knee',label:'2 · Oberschenkel & Knie',text:'Folge dem Knochen von der Hüfte zum Knie: Bei A. afarensis verläuft er nach innen. Die Knie stehen dadurch näher unter der Körpermitte. Fachlich heißt diese Neigung Valguswinkel; die Zeichnung zeigt keinen Messwert.'}
   ]},
  erectus:{name:'Homo erectus: Arme und Beine im Vergleich',date:'FRÜHER HOMO ERECTUS · AB CA. 1,9 MILLIONEN JAHREN',
   desc:'Hier wird das Verhältnis von Armen und Beinen zum Rumpf verglichen. Beide Figuren haben in der Zeichnung dieselbe Rumpflänge – ihre tatsächliche Körpergröße wird nicht dargestellt.',
   fact:'Frühe afrikanische Homo-erectus-Fossilien zeigen relativ zum Rumpf längere Beine und kürzere Arme als Australopithecus afarensis.',
   inference:'Diese Proportionen passen zu ausdauernder Fortbewegung am Boden. Zweibeinigkeit bestand schon bei früheren Homininen.',
   limit:'Die Figuren verdeutlichen qualitative Unterschiede, keine gemessenen Längenverhältnisse einzelner Fossilien. Daraus lässt sich keine konkrete Schrittlänge oder Geschwindigkeit berechnen.',
   source:'https://humanorigins.si.edu/evidence/human-fossils/species/homo-erectus',sourceName:'Smithsonian · Homo erectus',
   note:'Auf gleiche Rumpflänge normiert. Keine Zentimeterskala, keine Größenrekonstruktion und keine behauptete direkte Abstammungsfolge.',
   art:()=>panel('walk-af-proportions','A / VERGLEICH DER VERHÄLTNISSE','Australopithecus afarensis','Relativ längere Arme, kürzere Beine',
    'Frontale Schemafigur mit relativ langen Armen und kurzen Beinen. Schulterlinie und Hüftlinie begrenzen denselben Rumpfabschnitt wie bei der Vergleichsfigur. Klammern kennzeichnen Arm- und Beinabschnitte.',proportions(false),
    'Bereits zweibeinig. Lange Arme und weitere Skelettmerkmale passen zugleich zum Klettern.')+
    panel('walk-he-proportions','B / VERGLEICH DER VERHÄLTNISSE','Früher Homo erectus','Relativ kürzere Arme, längere Beine',
    'Frontale Schemafigur mit derselben gezeichneten Rumpflänge, aber relativ kürzeren Armen und längeren Beinen. Die Klammern sind Vergleichshilfen ohne Zahlenmaßstab.',proportions(true),
    '<strong>Vergleiche jeweils mit dem Rumpf.</strong> Es geht um Längenverhältnisse, nicht um die absolute Größe.'),
   details:[
    {id:'arms',label:'1 · Arme vergleichen',text:'Die Armabschnitte sind von der Schulter bis zum Handgelenk markiert. Bei gleicher gezeichneter Rumpflänge reichen die Arme von A. afarensis weiter hinab. Das zeigt den relativen Unterschied, keine Fossilmessung.'},
    {id:'legs',label:'2 · Beine vergleichen',text:'Die Beinabschnitte sind von der Hüfte bis zum Sprunggelenk markiert. Relativ längere Beine ermöglichen grundsätzlich längere Schritte. Wie groß ein konkreter Schritt war, bleibt mit diesen Zeichnungen offen.'},
    {id:'trunk',label:'Bezugsgröße · Rumpf',text:'Die gestrichelten Linien liegen auf Schulter- und Hüfthöhe. Dieser Rumpfabschnitt ist in beiden Figuren gleich lang gezeichnet. Erst dieser gemeinsame Bezug macht „relativ länger“ und „relativ kürzer“ sichtbar.'}
   ]}
 };
 const buttons=[...document.querySelectorAll('[data-walk]')];let selected='laetoli',focused='heel';
 function focusDetail(){
  const detail=cases[selected].details.find(d=>d.id===focused);
  $('walk-art').querySelectorAll('[data-walk-feature]').forEach(el=>el.classList.toggle('is-active',el.dataset.walkFeature===focused));
  $('walk-details').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.detail===focused)));
  say('walk-detail-title',detail.label);say('walk-detail-text',detail.text);
 }
 function render(){
  const item=cases[selected];say('walk-name',item.name);say('walk-date',item.date);
  say('walk-text',item.desc);say('walk-fact',item.fact);say('walk-inference',item.inference);say('walk-limit',item.limit);say('walk-note',item.note);
  $('walk-source').href=item.source;say('walk-source',item.sourceName+' ↗');
  $('walk-art').innerHTML=item.art();
  $('walk-details').replaceChildren(...item.details.map(d=>{
   const button=document.createElement('button');button.type='button';button.className='ho-button';button.dataset.detail=d.id;
   button.textContent=d.label;button.setAttribute('aria-controls','walk-detail');button.setAttribute('aria-pressed',String(d.id===focused));
   button.addEventListener('click',()=>{focused=d.id;focusDetail()});return button;
  }));
  focusDetail();
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.walk===selected)));
 }
 function measure(){
  const steps=Number($('walk-steps').value),cm=Number($('walk-length').value);
  say('walk-steps-val',steps);say('walk-length-val',cm+' cm');say('walk-distance',fmt(steps*cm/100)+' m');say('walk-number',steps);say('walk-cm',cm+' cm');
 }
 buttons.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.walk;focused=cases[selected].details[0].id;render()}));
 for(const id of ['walk-steps','walk-length'])$(id).addEventListener('input',measure);
 window.HumanGaitMath=Object.freeze({distance:(steps,cm)=>steps*cm/100});
 render();measure();
}
if(module==='01')timeline();
if(module==='02')familyTree();
if(module==='03')walking();
})();
