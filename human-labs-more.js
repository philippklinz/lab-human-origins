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
 // Coordinates refer to SYMBOLIC positions in a non-georeferenced drawing.
 const sites=[
 {id:'lomekwi',name:'Lomekwi 3',time:'3,3 Ma',place:'Kenia, Afrika',x:319,y:216,kind:'Steinartefakte in datiertem Fundkontext',desc:'Frühe Werkzeuge zeigen technisches Verhalten lange vor den späteren Homo-sapiens-Populationen. Kein Nachweis einer Wanderroute.',limit:'Die Zuordnung der Artefakthersteller zu einer bestimmten Homininenart ist ungeklärt.',source:'https://www.nature.com/articles/nature14464'},
 {id:'china',name:'Lössplateau in China',time:'~2,1 Ma',place:'China, Asien',x:526,y:149,kind:'Datierte Steinwerkzeuge',desc:'Die Fundstellen zeigen eine frühe Homininenpräsenz außerhalb Afrikas; sie sind archäologische, nicht zwingend taxonomisch eindeutig zuordenbare Belege.',limit:'Aus den Artefakten folgt keine exakt bekannte individuelle Migrationsroute oder Artidentität.',source:'https://www.nature.com/articles/s41586-018-0299-4'},
 {id:'dmanisi',name:'Dmanisi',time:'~1,8 Ma',place:'Georgien, Westasien',x:404,y:135,kind:'Fossilien und archäologischer Kontext',desc:'Ein wichtiger früher fossiler Nachweis von Homo außerhalb Afrikas. Die Funde helfen, frühe Ausbreitungen zu rekonstruieren.',limit:'Dmanisi ist nicht der Beginn der gesamten Besiedlung Asiens und nicht zwangsläufig ein direkter Vorfahr moderner Menschen.',source:'https://www.nature.com/articles/s41586-018-0299-4'},
 {id:'jebel',name:'Jebel Irhoud',time:'315 ± 34 ka',place:'Marokko, Afrika',x:259,y:154,kind:'Fossilien, Feuersteine und Thermolumineszenz',desc:'Frühe Homo-sapiens-Fossilien zeigen ein Mosaik von Merkmalen. Der Fundort liefert einen wichtigen Altersanker für frühe Formen unserer Art.',limit:'Nicht der Nachweis eines einzigen geografischen Ursprungs der ganzen Art.',source:'https://www.nature.com/articles/nature22336'},
 {id:'omo',name:'Omo I',time:'Mindestens 233 ± 22 ka',place:'Äthiopien, Afrika',x:331,y:204,kind:'Fossil und stratigraphisch überlagernde Asche',desc:'Die datierte vulkanische Asche liegt über der fossilführenden Schicht; daher wird ein Mindestalter der Fossilien abgeleitet.',limit:'Das Fossil wurde nicht selbst auf ein exaktes Alter von 233.000 Jahren datiert.',source:'https://www.nature.com/articles/s41586-021-04275-8'},
 {id:'misliya',name:'Misliya-Höhle',time:'~177–194 ka',place:'Israel, Levante',x:368,y:155,kind:'Fossile Oberkieferreste und Datierung',desc:'Ein früher Homo-sapiens-Nachweis außerhalb Afrikas, dessen Einordnung Hinweise auf mehrfache Ausbreitungsphasen liefert.',limit:'Aus einer Fundstelle lässt sich keine dauerhafte und durchgehende Besiedlungswelle rekonstruieren.',source:'https://doi.org/10.1126/science.aap8369'},
 {id:'denisova',name:'Denisova-Höhle',time:'Genom publiziert 2010',place:'Sibirien, Asien',x:503,y:124,kind:'Alte DNA aus Knochen und Zähnen',desc:'Genetische Daten belegten eine eigenständige archaïsche menschliche Linie und ihre Verwandtschaft mit Neandertalern. Genfluss zu Vorfahren einiger heutiger Populationen wurde nachgewiesen.',limit:'Eine Fundstelle und ein Genom decken weder die gesamte damalige Ausbreitung noch alle Begegnungen ab.',source:'https://www.nature.com/articles/nature09710'}
 ];
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
   let graphic='<rect width="660" height="365" fill="#102832"/>';
   // Deliberately simplified continents, not a cartographic projection.
   graphic+='<path d="M85 81L205 64L245 123L238 171L208 185L230 230L183 275L151 250L134 175L88 157Z" fill="#315358" stroke="#638b88" stroke-width="2"/>'+
   '<path d="M238 125L323 99L358 125L344 179L395 195L389 263L340 297L308 243L295 190L251 176Z" fill="#42665f" stroke="#739587" stroke-width="2"/>'+
   '<path d="M354 86L468 59L551 86L614 142L567 201L511 191L459 157L421 178L382 137L350 136Z" fill="#315358" stroke="#638b88" stroke-width="2"/>'+
   '<path d="M515 256L575 245L597 281L547 312L520 293Z" fill="#315358" stroke="#638b88" stroke-width="2"/>';
   if(showRoutes)graphic+='<g stroke="#9bdbcd" stroke-width="3" stroke-dasharray="6 8" fill="none" opacity=".85">'+
     '<path d="M319 216Q355 155 404 135"/><path d="M319 216Q410 111 526 149"/><path d="M331 204Q347 155 368 155"/><path d="M368 155Q429 122 503 124"/></g>';
   if(showGenes)graphic+='<g stroke="#e2ad7f" stroke-width="3" stroke-dasharray="4 6" fill="none">'+
     '<path d="M503 124Q467 200 404 194"/><path d="M404 194Q375 175 368 155"/></g>';
   graphic+=sites.map(site=>{
     const active=site.id===selected;
     return '<circle data-site-node="'+site.id+'" cx="'+site.x+'" cy="'+site.y+'" r="'+(active?11:6)+'" fill="'+(active?'#f2c99d':'#67c6b7')+'" stroke="#e6f7e8" stroke-width="1.7"/>';
   }).join('');
   graphic+='<text x="20" y="343" fill="#b5d6cc" font-family="monospace" font-size="11">SCHEMA / OHNE GEOGRAPHISCHEN MASSSTAB</text>';
   $('migration-art').innerHTML=graphic;
   $('migration-art').setAttribute('aria-label','Schematische Positionen von sieben Fundstellen; hervorgehoben '+s.name);
   $('migration-routes').setAttribute('aria-pressed',String(showRoutes));
   $('migration-genes').setAttribute('aria-pressed',String(showGenes));
   set('migration-layer-label',showRoutes||showGenes?'FUNDORTE + BEZIEHUNGEN':'FUNDORTE');
   [...list.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.site===selected)));
 }
 $('migration-routes').addEventListener('click',()=>{showRoutes=!showRoutes;render()});
 $('migration-genes').addEventListener('click',()=>{showGenes=!showGenes;render()});
 quiz('migration-quiz','migration-quiz-feedback','Alte Genome zeigen Genfluss zwischen Verwandtschaftslinien. Er beschreibt keine zielgerichtete Migration einzelner bekannter Personen.');
 render();
 window.HumanMigration=Object.freeze({siteCount:sites.length});
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