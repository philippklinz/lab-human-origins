/* LAB 05 – modules 04–06.
 * Archaeological and genomic data are source-linked educational summaries.
 * No actual artifact photographs, no migration-path reconstruction, no external calls.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id),m=document.body.dataset.module;
if(!['04','05','06'].includes(m))return;
const set=(id,value)=>{const e=$(id);if(e)e.textContent=String(value)};
const svgtext=(x,y,value,size=13,col='#c9e5dd')=>'<text x="'+x+'" y="'+y+'" fill="'+col+'" text-anchor="middle" font-family="Liberation Sans,Arial" font-size="'+size+'">'+value+'</text>';
const surface='<rect width="640" height="340" fill="#102832"/>';
function quiz(id,out,explain){
 const root=$(id),correct=Number(root.dataset.answer),buttons=[...root.querySelectorAll('button')];
 buttons.forEach((b,i)=>b.addEventListener('click',()=>{
  buttons.forEach((el,j)=>{el.disabled=true;el.classList.toggle('correct',j===correct);el.classList.toggle('wrong',j===i&&i!==correct)});
  $(out).dataset.ok=String(i===correct);set(out,(i===correct?'Richtig. ':'Noch nicht. ')+explain);
 }));
}
function artifacts(){
 const tools={
  lomekwi:{name:'Lomekwi 3',age:'CA. 3,3 MILLIONEN JAHRE',intro:'In West-Turkana, Kenia, wurden sehr frühe bearbeitete Steinobjekte gefunden, die von späteren klassischen Oldowan-Komplexen unterscheidbar sind.',fact:'Die Studie beschreibt archäologische Steinobjekte aus einer Fundschicht, die auf etwa 3,3 Ma datiert ist.',limit:'Wer die Steine bearbeitet hat, ist nicht eindeutig bekannt. Früher Werkzeuggebrauch ist kein Merkmal ausschließlich der Gattung Homo.',source:'https://www.nature.com/articles/nature14464',
 art:'<path d="M195 66L291 45L370 94L406 175L343 252L239 242L174 159Z" fill="#526e6c" stroke="#e2bf93" stroke-width="6" stroke-linejoin="round"/><path d="M195 66L291 138L370 94M291 138L343 252M291 138L174 159M291 138L406 175" fill="none" stroke="#a8c3af" stroke-width="3"/>'+svgtext(289,295,'SCHEMA / FRÜHE STEINBEARBEITUNG',12)},
  oldowan:{name:'Oldowan',age:'KLASSISCHE BELEGE UM 2,6 MA',intro:'Frühe Steinwerkzeugtraditionen umfassen abgeschlagene Kanten, Kerne und Abschläge. Die archäologische Tradition ist nicht mit einem einzigen Menschenfossil gleichzusetzen.',fact:'Steinabschläge und Abschlagnegative sind erhaltene Hinweise auf gezieltes Schlagen und Brechen von Gestein.',limit:'Die klassische Altersangabe ist eine didaktische Einordnung. Einzelne frühere oder anders klassifizierte Belege können den Beginn verändern; Werkzeugtypen sind keine eindeutigen Artmarker.',source:'https://iho.asu.edu/accessible-timeline',
 art:'<path d="M168 102L286 48L384 101L342 244L211 256L147 184Z" fill="#426765" stroke="#d4c3a1" stroke-width="5"/><path d="M167 102L286 162L384 101M286 162L342 244M286 162L211 256" fill="none" stroke="#aac6b8" stroke-width="3"/><path d="M400 214L484 150L448 262Z" fill="#82ae9d" stroke="#d9c49f" stroke-width="3"/>'+svgtext(302,302,'KERN UND ABSCHLAG (SCHEMATISCH)',12)},
  acheulean:{name:'Acheuléen',age:'FRÜHE BELEGE UM 1,76 MA',intro:'Diese weitverbreitete Werkzeugtradition umfasst häufig beidseitig bearbeitete Handbeile und weitere Steinwerkzeuge.',fact:'Systematische beidseitige Bearbeitung lässt sich anhand negativer Schlagflächen und der Werkzeugform erkennen.',limit:'Nicht jeder Fundort, nicht jedes Individuum und nicht jede Periode besitzt identische Werkzeuge. Handbeile sind nicht automatisch Belege für eine bestimmte Sprache oder Gesellschaftsordnung.',source:'https://iho.asu.edu/accessible-timeline',
 art:'<path d="M309 46C357 105 370 178 338 264L277 279C251 204 254 119 309 46Z" fill="#577b75" stroke="#e3c19a" stroke-width="5"/><path d="M309 46L306 264M267 129L350 147M263 184L348 195M277 235L339 235" stroke="#9dbdb0" stroke-width="3"/>'+svgtext(315,312,'BEIDSEITIGE BEARBEITUNG (SCHEMATISCH)',12)},
  msa:{name:'Middle Stone Age – frühe Belege',age:'FUNDE BEI JEBEL IRHOUD: 315 ± 34 KA',intro:'Der afrikanische Middle Stone Age umfasst unterschiedliche Formen der Steinbearbeitung. In Jebel Irhoud wurden entsprechende Artefakte gemeinsam mit frühen Homo-sapiens-Fossilien geborgen.',fact:'Thermolumineszenz an erhitzten Feuersteinartefakten ergab für den Fundkontext von Jebel Irhoud etwa 315 ± 34 Tausend Jahre.',limit:'Eine spezielle Technik wurde nicht an einem einzigen Ort erfunden; der datierte Kontext ist kein direkt gemessener Zeitpunkt der „Erfindung“ einer gesamten Technologie.',source:'https://www.nature.com/articles/nature22335',
 art:'<path d="M221 108L349 56L409 130L301 266L186 216Z" fill="#4c7270" stroke="#e7bf9e" stroke-width="4"/><path d="M221 108L318 156L409 130M318 156L301 266M318 156L186 216" fill="none" stroke="#a5c7b7" stroke-width="3"/>'+svgtext(310,308,'ABSCHLAG / KERN (SCHEMATISCH)',12)}
 };
 const buttons=[...document.querySelectorAll('[data-tool]')];let selected='lomekwi';
 function render(){
   const t=tools[selected];
   set('tool-name',t.name);set('tool-age',t.age);set('tool-description',t.intro);set('tool-fact',t.fact);set('tool-limit',t.limit);
   $('tool-source').href=t.source;
   $('tool-art').innerHTML=surface+t.art;$('tool-art').setAttribute('aria-label','Abstraktes Steinwerkzeug für '+t.name+'. Nicht originalgetreu.');
   buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===selected)));
 }
 buttons.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.tool;render()}));
 quiz('tool-quiz','tool-quiz-feedback','Die 3,3 Millionen Jahre alten Lomekwi-Funde sind älter als die klassischen Oldowan-Nachweise. Ihre Hersteller sind nicht eindeutig bekannt.');
 render();
}
function migrations(){
 // Approximate modern geographic coordinates; present-day Natural Earth coastline, NOT palaeogeography.
 const sites=[
 {id:'lomekwi',name:'Lomekwi 3',time:'3,3 Ma',place:'Kenia, Afrika',lat:3.9,lon:35.9,dx:-13,dy:13,kind:'Steinartefakte in datiertem Fundkontext',desc:'Frühe Werkzeuge zeigen technisches Verhalten lange vor den späteren Homo-sapiens-Populationen. Kein Nachweis einer Wanderroute.',limit:'Die Zuordnung der Artefakthersteller zu einer bestimmten Homininenart ist ungeklärt.',source:'https://www.nature.com/articles/nature14464'},
 {id:'china',name:'Lössplateau in China',time:'~2,1 Ma',place:'China, Asien',lat:34.226,lon:109.477,dx:0,dy:0,kind:'Datierte Steinwerkzeuge',desc:'Die Fundstellen zeigen eine frühe Homininenpräsenz außerhalb Afrikas; sie sind archäologische, nicht zwingend taxonomisch eindeutig zuordenbare Belege.',limit:'Aus den Artefakten folgt keine exakt bekannte individuelle Migrationsroute oder Artidentität.',source:'https://www.nature.com/articles/s41586-018-0299-4'},
 {id:'dmanisi',name:'Dmanisi',time:'~1,8 Ma',place:'Georgien, Westasien',lat:41.337,lon:44.345,dx:0,dy:0,kind:'Fossilien und archäologischer Kontext',desc:'Ein wichtiger früher fossiler Nachweis von Homo außerhalb Afrikas. Die Funde helfen, frühe Ausbreitungen zu rekonstruieren.',limit:'Dmanisi ist nicht der Beginn der gesamten Besiedlung Asiens und nicht zwangsläufig ein direkter Vorfahr moderner Menschen.',source:'https://www.nature.com/articles/s41586-018-0299-4'},
 {id:'jebel',name:'Jebel Irhoud',time:'315 ± 34 ka',place:'Marokko, Afrika',lat:31.87,lon:-8.87,dx:0,dy:0,kind:'Fossilien, Feuersteine und Thermolumineszenz',desc:'Frühe Homo-sapiens-Fossilien zeigen ein Mosaik von Merkmalen. Der Fundort liefert einen wichtigen Altersanker für frühe Formen unserer Art.',limit:'Nicht der Nachweis eines einzigen geografischen Ursprungs der ganzen Art.',source:'https://www.nature.com/articles/nature22336'},
 {id:'omo',name:'Omo I',time:'Mindestens 233 ± 22 ka',place:'Äthiopien, Afrika',lat:5.4,lon:35.94,dx:13,dy:-10,kind:'Fossil und stratigraphisch überlagernde Asche',desc:'Die datierte vulkanische Asche liegt über der fossilführenden Schicht; daher wird ein Mindestalter der Fossilien abgeleitet.',limit:'Das Fossil wurde nicht selbst auf ein exaktes Alter von 233.000 Jahren datiert.',source:'https://www.nature.com/articles/s41586-021-04275-8'},
 {id:'misliya',name:'Misliya-Höhle',time:'~177–194 ka',place:'Israel, Levante',lat:32.741,lon:34.972,dx:0,dy:0,kind:'Fossile Oberkieferreste und Datierung',desc:'Ein früher Homo-sapiens-Nachweis außerhalb Afrikas, dessen Einordnung Hinweise auf mehrfache Ausbreitungsphasen liefert.',limit:'Aus einer Fundstelle lässt sich keine dauerhafte und durchgehende Besiedlungswelle rekonstruieren.',source:'https://doi.org/10.1126/science.aap8369'},
 {id:'denisova',name:'Denisova-Höhle',time:'Genom publiziert 2010',place:'Sibirien, Asien',lat:51.397,lon:84.676,dx:0,dy:0,kind:'Alte DNA aus Knochen und Zähnen',desc:'Genetische Daten belegten eine eigenständige archaïsche menschliche Linie und ihre Verwandtschaft mit Neandertalern. Genfluss zu Vorfahren einiger heutiger Populationen wurde nachgewiesen.',limit:'Eine Fundstelle und ein Genom decken weder die gesamte damalige Ausbreitung noch alle Begegnungen ab.',source:'https://www.nature.com/articles/nature09710'}
 ];
 const project=(lat,lon)=>({x:(lon+180)/360*960,y:(90-lat)/180*480});
 const point=(s)=>project(s.lat,s.lon);
 const siteById=(id)=>sites.find(s=>s.id===id);
 const asNumber=(n)=>n.toFixed(1);
 let selected='dmanisi',showRoutes=false,showGenes=false;
 const list=$('migration-sites');
 for(const s of sites){
  const b=document.createElement('button');b.type='button';b.dataset.site=s.id;
  const strong=document.createElement('strong');strong.textContent=s.name;
  const small=document.createElement('small');small.textContent=s.time;
  b.append(strong,small);b.addEventListener('click',()=>{selected=s.id;render()});list.append(b);
 }
 function render(){
   const s=sites.find(x=>x.id===selected);if(!s)return;
   set('migration-name',s.name);set('migration-age',s.time+' / '+s.place);set('migration-text',s.desc);set('migration-type',s.kind);set('migration-limit',s.limit);$('migration-source').href=s.source;
   let graphic='<rect width="960" height="480" fill="#102832"/>';
   // Equirectangular graticule and real Natural Earth land outlines (vendored).
   for(let lon=-150;lon<=150;lon+=30){
     const x=project(0,lon).x;
     graphic+='<line x1="'+asNumber(x)+'" y1="0" x2="'+asNumber(x)+'" y2="480" stroke="#94beb5" stroke-opacity=".13"/>';
   }
   for(let lat=-60;lat<=60;lat+=30){
     const y=project(lat,0).y;
     graphic+='<line x1="0" y1="'+asNumber(y)+'" x2="960" y2="'+asNumber(y)+'" stroke="#94beb5" stroke-opacity=".13"/>';
   }
   graphic+='<image data-map-baselayer="natural-earth" href="assets/world-natural-earth-110m.svg" x="0" y="0" width="960" height="480" preserveAspectRatio="xMidYMid meet"/>';
   const regions=[
     [185,157,'NORDAMERIKA'],[255,329,'SÜDAMERIKA'],[516,106,'EUROPA'],
     [482,310,'AFRIKA'],[705,218,'ASIEN'],[836,372,'AUSTRALIEN']
   ];
   graphic+=regions.map(([x,y,name])=>'<text x="'+x+'" y="'+y+'" text-anchor="middle"'+
     ' font-family="Liberation Mono,monospace" font-size="11" letter-spacing="1.3" fill="#b3d3cd" opacity=".76">'+name+'</text>').join('');
   // Optional comparison lines use georeferenced endpoint positions;
   // these are schematic spatial relationships, NEVER observed individual routes.
   const links=[['lomekwi','dmanisi'],['lomekwi','china'],['omo','misliya'],['misliya','denisova']];
   if(showRoutes){
     graphic+='<g data-map-overlay="hypotheses" fill="none" stroke="#90e1cf" stroke-width="2.6"'+
       ' stroke-dasharray="7 8" stroke-linecap="round" opacity=".85">';
     for(const [a,b] of links){
       const from=point(siteById(a)),to=point(siteById(b)),mx=(from.x+to.x)/2,my=(from.y+to.y)/2-30;
       graphic+='<path data-link="'+a+'-'+b+'" d="M'+asNumber(from.x)+' '+asNumber(from.y)+
         ' Q'+asNumber(mx)+' '+asNumber(my)+' '+asNumber(to.x)+' '+asNumber(to.y)+'"/>';
     }
     graphic+='</g>';
   }
   if(showGenes){
     // Symbolic motif over Eurasia. NOT coordinates of admixture events.
     graphic+='<g data-map-overlay="genetic-exchange" fill="none" stroke="#e8b583"'+
       ' stroke-width="3" stroke-dasharray="5 7" stroke-linecap="round">'+
       '<path d="M650 165Q715 95 775 157"/><path d="M655 175Q717 105 781 165"/>'+
       '</g><text x="770" y="92" text-anchor="middle" fill="#efc7a2" font-size="12"'+
       ' font-family="Liberation Mono,monospace">GENFLUSS (SYMBOLISCH)</text>';
   }
   // Closely neighbouring sites Omo I and Lomekwi use leader lines to make
   // both selectable while keeping the actual anchor positions unmodified.
   graphic+=sites.map(site=>{
     const raw=point(site),x=raw.x+(site.dx||0),y=raw.y+(site.dy||0);
     const active=site.id===selected;
     const leader=site.dx||site.dy?'<path data-site-leader="'+site.id+
       '" d="M'+asNumber(raw.x)+' '+asNumber(raw.y)+'L'+asNumber(x)+' '+asNumber(y)+
       '" stroke="#b4cfc3" stroke-width="1.5" fill="none"/>'+
       '<circle cx="'+asNumber(raw.x)+'" cy="'+asNumber(raw.y)+'" r="2.5" fill="#e2d3ad"/>':'';
     return leader+'<g data-site-pin="'+site.id+'" role="button" tabindex="0"'+
       ' aria-label="'+site.name+'" style="cursor:pointer">'+
       '<title>'+site.name+' · '+site.time+'</title>'+
       (active?'<circle cx="'+asNumber(x)+'" cy="'+asNumber(y)+
       '" r="14" stroke="#f1c797" stroke-opacity=".55" stroke-width="2" fill="none"/>':'')+
       '<circle data-site-node="'+site.id+'" cx="'+asNumber(x)+'" cy="'+asNumber(y)+
       '" r="'+(active?8:6)+'" stroke="#e8faf1" stroke-width="2" fill="'+
       (active?'#efc494':'#63c6b8')+'"/>'+
       '<circle cx="'+asNumber(x)+'" cy="'+asNumber(y)+'" r="16" fill="#fff" opacity="0" pointer-events="all"/>'+
       '</g>';
   }).join('');
   const loc=point(s),mx=loc.x+(s.dx||0),my=loc.y+(s.dy||0);
   const labelWidth=Math.max(100,Math.min(210,22+s.name.length*8));
   const lx=mx+labelWidth+23<950?mx+18:mx-labelWidth-18;
   const ly=Math.max(24,my-47);
   graphic+='<path d="M'+asNumber(mx)+' '+asNumber(my)+'L'+asNumber(lx+5)+' '+
     asNumber(ly+17)+'" stroke="#f0c9a0" stroke-width="1.2" fill="none"/>'+
     '<rect x="'+asNumber(lx)+'" y="'+asNumber(ly)+'" width="'+labelWidth+
     '" height="28" rx="4" fill="#e7f1ed" stroke="#d2dcd4"/>'+
     '<text x="'+asNumber(lx+10)+'" y="'+asNumber(ly+19)+'"'+
     ' font-family="Liberation Sans,Arial" font-weight="700" font-size="13" fill="#14333a">'+s.name+'</text>';
   graphic+='<text x="18" y="461" fill="#b9d7cc" font-family="Liberation Mono,monospace" font-size="11">'+
     'HEUTIGE KÜSTENLINIEN / NATURAL EARTH · PUBLIC DOMAIN</text>';
   $('migration-art').innerHTML=graphic;
   $('migration-art').setAttribute('aria-label','Weltkarte mit echten Küstenlinien und sieben näherungsweise verorteten Fundstellen; hervorgehoben '+s.name);
   $('migration-art').querySelectorAll('[data-site-pin]').forEach(pin=>{
     const choose=()=>{selected=pin.dataset.sitePin;render()};
     pin.addEventListener('click',choose);
     pin.addEventListener('keydown',event=>{
       if(event.key==='Enter'||event.key===' '){event.preventDefault();choose()}
     });
   });
   $('migration-routes').setAttribute('aria-pressed',String(showRoutes));
   $('migration-genes').setAttribute('aria-pressed',String(showGenes));
   set('migration-layer-label',showRoutes||showGenes?'FUNDORTE + BEZIEHUNGEN':'FUNDORTE');
   [...list.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.site===selected)));
 }
 $('migration-routes').addEventListener('click',()=>{showRoutes=!showRoutes;render()});
 $('migration-genes').addEventListener('click',()=>{showGenes=!showGenes;render()});
 quiz('migration-quiz','migration-quiz-feedback','Alte Genome zeigen Genfluss zwischen Verwandtschaftslinien. Er beschreibt keine zielgerichtete Migration einzelner bekannter Personen.');
 render();
 window.HumanMigration=Object.freeze({
   siteCount:sites.length,project,
   sites:sites.map(s=>Object.freeze({id:s.id,lat:s.lat,lon:s.lon}))
 });
}
function evidence(){
 const cases=[
 {title:'Laetoli-Fußspuren (ca. 3,6 Ma)',question:'Welche Schlussfolgerung tragen die fossilen Fußspuren?',answers:['Vor Homo sapiens gab es bereits zweibeinig gehende Homininen.','Die Spur wurde sicher von Homo sapiens hinterlassen.','Man kennt die vollständige Abstammungsfolge aller Spurenverursacher.'],correct:0,
 summary:'In vulkanischem Material erhaltene Spuren aus Laetoli zeigen zweibeiniges Gehen bei frühen Homininen.',
 observed:'Fußform und Abdrucksequenz zeigen ein zweibeiniges Gangbild.',limit:'Die exakte Identität der Verursacher ist nicht direkt im Abdruck enthalten.',source:'https://humanorigins.si.edu/evidence/behavior/footprints/laetoli-footprint-trails'},
 {title:'Lomekwi 3 (Harmand et al., 2015)',question:'Was ist durch die Fundstelle gut belegt?',answers:['Ein moderner Mensch fertigte diese Werkzeuge.','Steinbearbeitung ist bereits für ca. 3,3 Millionen Jahre dokumentiert.','Die ersten Werkzeuge wurden ausschließlich von Homo sapiens gefertigt.'],correct:1,
 summary:'Ein Steinwerkzeugkomplex wurde in West-Turkana in stratigraphischem Kontext untersucht und auf etwa 3,3 Ma datiert.',
 observed:'In situ erhaltene Artefakte mit technischen Spuren der Bearbeitung.',limit:'Die Hersteller müssen nicht Angehörige der Gattung Homo gewesen sein; eine Artzuordnung ist nicht gesichert.',source:'https://www.nature.com/articles/nature14464'},
 {title:'Jebel Irhoud (Richter et al., 2017)',question:'Was ergab die Thermolumineszenz-Datierung?',answers:['Exakt den Geburtstag der ersten Menschen.','Ein direktes genetisches Alter aller heutigen Menschen.','Für erhitzte Artefakte aus dem Fossilkontext ca. 315 ± 34 Tausend Jahre.'],correct:2,
 summary:'Erhitzte Feuersteinartefakte in enger Zuordnung zu frühen Homo-sapiens-Fossilien wurden mit Thermolumineszenz datiert.',
 observed:'Eine gewichtete durchschnittliche Datierung um 315 ± 34 ka für die untersuchten Artefakte.',limit:'Ein datierter Kontext ist nicht der exakte Zeitpunkt der Artentstehung; Morphologie und Zuordnung erfordern zusätzliche Auswertung.',source:'https://www.nature.com/articles/nature22335'},
 {title:'Jebel Irhoud (Hublin et al., 2017)',question:'Was lässt sich über die Fossilien folgern?',answers:['Sie zeigen ein Mosaik früher Homo-sapiens-ähnlicher und anderer Schädelmerkmale.','Sie beweisen einen einzigen Ursprungsort für alle Menschen.','Sie zeigen den weltweit ersten sprechenden Menschen.'],correct:0,
 summary:'Die Forscher verglichen Gesicht, Kiefer, Zähne und Schädelmerkmale der nordafrikanischen Funde.',
 observed:'Eine Kombination von Merkmalen, die für frühe Formen der Homo-sapiens-Linie diskutiert wird.',limit:'Weder ein einziger Ursprungsort noch Sprache und direkte Abstammung aller Menschen sind damit bewiesen.',source:'https://www.nature.com/articles/nature22336'},
 {title:'Omo I (Vidal et al., 2022)',question:'Wie wurde das Alter der Omo-Fossilien eingegrenzt?',answers:['Das Skelett wurde mit einem fiktiven Datum beschriftet.','Eine geochemisch zugeordnete, darüber liegende Ascheschicht liefert ein Mindestalter.','Man ermittelte den genetischen Stammbaum jedes Individuums.'],correct:1,
 summary:'Vulkanische Asche über dem fossilführenden Horizont wurde geochemisch mit einem datierten Ausbruch in Verbindung gebracht.',
 observed:'Der darüber liegende Ausbruch wurde auf 233 ± 22 ka datiert; die Fossilien sind mindestens ungefähr so alt.',limit:'Das ist keine direkte Altersmessung am menschlichen Fossil und keine exakte Zahl für das Entstehen von Homo sapiens.',source:'https://www.nature.com/articles/s41586-021-04275-8'},
 {title:'Denisova-Genom (Reich et al., 2010)',question:'Welche Erkenntnis ermöglichte die Analyse alter DNA?',answers:['Jede heutige Person besitzt denselben Denisova-Anteil.','Die gesamte Menschheit stammt direkt vom gefundenen Fingerknochen ab.','Eine genetisch unterscheidbare Menschenlinie und ihre Vermischung mit anderen Linien wurde nachgewiesen.'],correct:2,
 summary:'Ein kleines Knochenfragment aus der Denisova-Höhle lieferte alte DNA für einen genomischen Vergleich.',
 observed:'Die Denisova-Linie ist eng mit Neandertalern verwandt; genetische Beiträge zu Vorfahren heutiger Populationen lassen sich nachweisen.',limit:'Ein Fragment zeigt nicht alle Lebensräume und nicht die vollständige Evolutionsgeschichte der Gruppe.',source:'https://www.nature.com/articles/nature09710'}
 ];
 let index=0,score=0,answered=false;
 function draw(){
  const item=cases[index];answered=false;
  set('ev-case-number','FALL '+String(index+1).padStart(2,'0')+' / 06');
  set('ev-title',item.title);set('ev-question',item.question);set('ev-summary',item.summary);set('ev-observation',item.observed);set('ev-limit',item.limit);
  $('ev-source').href=item.source;$('ev-feedback').replaceChildren();$('ev-answers').replaceChildren();
  $('ev-next').disabled=true;set('ev-next',index===cases.length-1?'Ergebnis anzeigen →':'Nächster Fall →');
  item.answers.forEach((answer,i)=>{
    const b=document.createElement('button');b.type='button';b.textContent=answer;
    b.addEventListener('click',()=>{
      if(answered)return;
      answered=true;if(i===item.correct)score++;
      [...$('ev-answers').children].forEach((button,j)=>{button.disabled=true;button.classList.toggle('correct',j===item.correct);button.classList.toggle('wrong',i===j&&j!==item.correct)});
      $('ev-feedback').dataset.ok=String(i===item.correct);
      set('ev-feedback',(i===item.correct?'Richtig. ':'Noch nicht. ')+item.observed+' Grenze: '+item.limit);
      set('ev-score',score+' / 6');set('ev-done',(index+1)+' / 6');
      $('ev-progress').setAttribute('aria-valuenow',String(index+1));
      $('ev-bar').style.width=String((index+1)/cases.length*100)+'%';
      $('ev-next').disabled=false;
    });$('ev-answers').append(b);
  });
 }
 $('ev-next').addEventListener('click',()=>{
  if($('ev-next').disabled)return;
  if(index===cases.length-1){
    $('ev-answers').replaceChildren();set('ev-question','Sechs Befunde abgeschlossen: '+score+' / 6 richtig');
    set('ev-feedback','Der größte Fortschritt ist die Unterscheidung zwischen einem Fund und der Geschichte, die wir daraus erschließen. Du kannst das Quiz wiederholen.');
    $('ev-next').disabled=true;return;
  }index++;draw();
 });
 $('ev-reset').addEventListener('click',()=>{
   index=0;score=0;set('ev-score','0 / 6');set('ev-done','0 / 6');
   $('ev-progress').setAttribute('aria-valuenow','0');$('ev-bar').style.width='0%';draw();
 });
 draw();
 window.HumanEvidence=Object.freeze({count:cases.length});
}
if(m==='04')artifacts();
if(m==='05')migrations();
if(m==='06')evidence();
})();