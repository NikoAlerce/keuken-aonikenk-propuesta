const money = n => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const products = [
  {
    "id": "redragon",
    "name": "Redragon Hitman GW800",
    "role": "01 / CÁMARA PRINCIPAL",
    "price": 73899,
    "image": "redragon.webp",
    "url": "https://www.mercadolibre.com.ar/redragon-camara-web-gw800-1080p-pc-usb-20-microfono-dual/p/MLA58967202#wid=MLA1133582999",
    "note": "Una toma general en Full HD, con enfoque fijo.",
    "seller": "Mora Informática",
    "technical": "1080p a 30 fps; campo de 72° diagonales. El fabricante indica soporte para trípode; falta confirmar rosca 1/4″-20. Requiere una prueba con la iluminación del salón."
  },
  {
    "id": "gadnic",
    "name": "Gadnic CAMWEB11",
    "role": "02 / CÁMARA CERCANA",
    "price": 22199,
    "image": "gadnic.webp",
    "url": "https://www.mercadolibre.com.ar/camara-web-gadnic-fhd-1080p-microfono-30-fps-multiple-sistema-operativo/p/MLA49194509#wid=MLA2079807526",
    "note": "Una segunda mirada para acercarse al músico o al instrumento.",
    "seller": "Bidcom",
    "technical": "Publicada como 1080p a 30 fps. Su montaje roscado, conector y campo visual requieren confirmación. Un adaptador específico, si hace falta, se cotiza aparte."
  },
  {
    "id": "usb10",
    "name": "USB activo Ztecno · 10 m",
    "role": "DOS CÁMARAS / DOS EXTENSIONES",
    "price": 29999,
    "image": "usb10.webp",
    "url": "https://www.mercadolibre.com.ar/cable-extension-usb-negro--10-metros--largo-alargue-activo/up/MLAU4082707078#wid=MLA1831335769",
    "note": "Conecta cada cámara con la computadora junto a la consola.",
    "seller": "ZTECNO",
    "technical": "USB 2.0 activo de 10 m. Probar las dos cámaras simultáneamente en puertos directos. Alimentación auxiliar de 5 V no incluida; recorrido definitivo por medir."
  },
  {
    "id": "c920",
    "name": "Logitech C920 / C920s",
    "role": "CÁMARA LOGITECH FULL HD",
    "price": 169999,
    "image": "c920.webp",
    "url": "https://www.mercadolibre.com.ar/camara-web-logitech-c920-full-hd-30fps-color-negro/p/MLA18932026?pdp_filters=SHIPPING_ORIGIN%3A10215068#wid=MLA1403241233",
    "note": "Autofoco y lente de cristal para el plano principal o una toma cercana.",
    "seller": "GAUSSONLINE",
    "technical": "1080p a 30 fps; 78° diagonales; montaje 1/4″. Confirmar variante C920/C920s con el vendedor. Ajustar enfoque y exposición durante el ensayo."
  },
  {
    "id": "brio",
    "name": "Logitech Brio 4K",
    "role": "PRINCIPAL / ÓPTIMO",
    "price": 267199,
    "image": "brio.webp",
    "url": "https://www.mercadolibre.com.ar/camara-web-logitech-brio-4k-90fps-color-negro/p/MLA18932094#wid=MLA1493567831",
    "note": "Más amplitud de encuadre y ajustes para la cámara principal.",
    "seller": "D DINATECH",
    "technical": "Brio 4K / 960-001105: autofoco, HDR y campo diagonal seleccionable de 65°, 78° o 90°. En esta instalación trabaja a 1080p30 por el cableado USB 2.0. La captura 4K requiere otro cableado."
  },
  {
    "id": "base",
    "name": "Base de pared Genki",
    "role": "MONTAJE / UNA BASE POR CÁMARA",
    "price": 13993,
    "image": "base.webp",
    "url": "https://www.mercadolibre.com.ar/tornillo-14-macho-a-pared-metalico-fotografia-resistente/up/MLAU3366236571#wid=MLA1515557807",
    "note": "Fijación permanente para cada cámara.",
    "seller": "CODISUR",
    "technical": "Genki WALLSC-M, salida macho 1/4″-20. Requiere apoyo firme y plano. Anclajes, retención y cualquier brazo adicional se definen en la visita."
  },
  {
    "id": "rotula",
    "name": "Mini rótula Genki",
    "role": "ENCUADRE / UNA RÓTULA POR CÁMARA",
    "price": 7990,
    "image": "rotula.webp",
    "url": "https://www.mercadolibre.com.ar/mini-rotula-para-aro-de-luz-o-tripodes-con-rosca-universal-negro/p/MLA59187686#wid=MLA2424560676",
    "note": "Permite orientar la cámara y mantener el encuadre.",
    "seller": "CODISUR",
    "technical": "Conexiones hembra y macho de 1/4″; carga declarada de 1,5 kg. Comprobar inclinación útil y espacio para la cámara en el punto de instalación."
  },
  {
    "id": "canal",
    "name": "Canaleta Kalop · 2 m",
    "role": "ÓPTIMO / ORDEN DEL CABLEADO",
    "price": 3477,
    "image": "canal.webp",
    "url": "https://www.mercadolibre.com.ar/cable-canal-20x10-autoadhesivo-kalop-plastico-tira-2mts/up/MLAU286868592",
    "note": "Protege y ordena el recorrido de los cables.",
    "seller": "LED MORON",
    "technical": "Kalop 20 × 10 mm, tira de 2 m. Se contemplan cinco tiras: 10 m en total. Metraje, fijación y envío de las piezas se confirman en el relevamiento."
  },
  {
    "id": "umc202",
    "name": "Behringer UMC202HD",
    "role": "ÓPTIMO / AUDIO DE CONSOLA",
    "price": 232891,
    "image": "umc202.webp",
    "url": "https://www.mercadolibre.com.ar/interfaz-audio-usb-behringer-u-phoria-umc202hd-color-negro/p/MLA24547439#wid=MLA1621043073",
    "note": "Lleva el sonido estéreo de la consola a la computadora.",
    "seller": "MUSICAL MONROE BELGRANO",
    "technical": "Behringer UMC202HD, dos entradas de línea. Los cables dependen de las salidas de la consola y se cotizan aparte. Puede omitirse si la consola ya envía audio USB estéreo compatible."
  }
];

const external = (url,label) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
document.getElementById('content').innerHTML = `
<section class="section installation" id="salon">
  <p class="eyebrow">02 / PENSADO PARA KEUKEN</p>
  <div class="section-heading"><h2>La cercanía del salón.<br>También en pantalla.</h2><p>Una cámara frente al escenario y otra cerca del músico. Dos miradas que se complementan y conservan el carácter de los recitales de Keuken.</p></div>
  <div class="venue-story"><figure class="room"><img src="assets/salon-publico.webp" alt="El escenario de Keuken visto desde las mesas del público" width="1360" height="644"><figcaption>El escenario, visto desde el público.</figcaption></figure><div class="venue-caption"><p><strong>Un espacio de 6 × 10 m.</strong> Las columnas centrales guían la ubicación de las cámaras. Buscamos los ángulos entre ellas, con soportes fijos y el cableado fuera de los pasos.</p><p><strong>La luz del recital.</strong> Ajustaremos la imagen con la iluminación habitual del salón para cuidar las caras, los instrumentos y el ambiente.</p></div></div>
  <div id="venue-plan"></div>
  <details class="technical venue-gallery"><summary>Ver más fotos del salón <span>+</span></summary><div class="real-gallery"><figure><img src="assets/salon-dia.webp" alt="Salón de día: ventanas, columnas y tarima" loading="lazy" width="1360" height="765"><figcaption>Distribución, luz natural y circulación.</figcaption></figure><figure><img src="assets/salon-show.webp" alt="Músico en el escenario bajo las luces del recital" loading="lazy" width="765" height="1020"><figcaption>La iluminación y la cercanía de un show.</figcaption></figure></div></details>
</section>
<section class="section equipment" id="equipo">
  <p class="eyebrow">04 / LA INVERSIÓN</p>
  <div class="section-heading"><h2>Tres formas<br>de empezar.</h2><p>Todas incluyen dos cámaras, extensiones y soportes orientables. La diferencia está en la calidad de imagen y en la captura de sonido.</p></div>
  <p class="quote-date">Precios de referencia al 14/09/2026 · Pesos argentinos · Publicaciones con stock nacional al consultar.</p>
  <div class="tier-picker" id="tier-picker" role="group" aria-label="Comparar propuestas de equipamiento"></div>
  <p class="quote-scope"><strong>Alcance del presupuesto:</strong> equipamiento. La instalación, los envíos y el desarrollo del panel se cotizan por separado. Se prevé utilizar la computadora, la consola, internet y las luces del salón, sujetos a una prueba de funcionamiento.</p>
  <div class="budget-layout">
    <div class="choice-details"><p class="eyebrow">LA OPCIÓN SELECCIONADA</p><div id="mode-note"></div><div id="selection-lines" class="selection-lines"></div><div class="selection-condition" id="selection-condition"></div><div id="interface-option" hidden><label class="audio-option"><input id="console-usb" type="checkbox"> La consola ya envía audio USB estéreo compatible</label><p class="small">En ese caso, se puede quitar la interfaz Behringer del presupuesto.</p></div><a href="#lista-compra" class="text-link">Ver productos, fotos y enlaces de compra ↓</a></div>
    <aside class="budget-summary" aria-label="Presupuesto seleccionado"><p class="eyebrow">INVERSIÓN EN EQUIPAMIENTO</p><div id="budget-output" aria-live="polite"></div><details class="cost-planning"><summary>Sumar instalación y otros gastos <span>+</span></summary><p class="small">Completá los importes cuando tengas las cotizaciones.</p><div class="cost-entry"><label for="fixings">Instalación, anclajes y adaptaciones</label><div><span>ARS</span><input id="fixings" type="number" min="0" max="10000000" step="0.01" placeholder="A cotizar"></div></div><div class="cost-entry"><label for="audio-cost">Audio y cables adicionales</label><div><span>ARS</span><input id="audio-cost" type="number" min="0" max="10000000" step="0.01" placeholder="A cotizar"></div></div><div class="cost-entry"><label for="delivery">Envíos, panel y otros servicios</label><div><span>ARS</span><input id="delivery" type="number" min="0" max="10000000" step="0.01" placeholder="A cotizar"></div></div></details></aside>
  </div>
  <details class="technical shopping-list" id="lista-compra"><summary>Productos y enlaces de compra <span>+</span></summary><p class="small">Precios por unidad y cantidades para la opción seleccionada. Confirmar precio, modelo y disponibilidad con cada vendedor.</p><div class="product-grid" id="products"></div></details>
  <p class="delivery-note">Entrega prevista a domicilio en Lago Puelo. El despacho por Andreani, su costo y plazo se acuerdan con cada vendedor antes de comprar.</p>
</section>
<section class="section launch-section" id="plan">
  <p class="eyebrow">05 / PUESTA EN MARCHA</p>
  <div class="section-heading"><h2>El próximo paso:<br>un ensayo en Keuken.</h2><p>Una visita al salón permite probar las tomas, revisar el sonido y cerrar el presupuesto de la instalación. Después, preparamos todo para el primer vivo.</p></div>
  <div class="steps"><article><span>01</span><h3>Definir la instalación</h3><p>Probar los dos encuadres, las conexiones de la consola, la computadora y la subida de internet. Con eso se elige el equipo y se confirma el costo completo.</p></article><article><span>02</span><h3>Preparar y ensayar</h3><p>Fijar las cámaras, ordenar los cables y configurar imagen, sonido y grabación. Hacer un ensayo completo con las luces del recital.</p></article><article><span>03</span><h3>Compartir el primer vivo</h3><p>Preparar el evento en el canal, acompañar al operador y revisar la grabación al terminar. La rutina queda lista para los próximos encuentros.</p></article></div>
  <div class="closing-invitation"><strong>Que cada recital llegue más lejos.</strong><p>Una instalación estable, un equipo que conoce su operación y un archivo que crece con la historia de Keuken.</p><a class="button" href="#equipo">Volver a comparar las opciones <span>↑</span></a></div>
  <details class="technical" id="pendientes"><summary>Qué se define en la visita <span>+</span></summary><div class="technical-grid"><p><strong>Imagen e instalación.</strong> Posición de columnas, distancia a los músicos, altura de cámaras, apoyo de los soportes y recorrido completo del cableado. Comprobación de roscas y fijaciones antes de comprar.</p><p><strong>Sonido y computadora.</strong> Modelo y salidas de la consola, entradas disponibles, rendimiento de la PC y espacio para grabar. La prueba determina si hace falta una interfaz y qué cables usar.</p><p><strong>Canal y conexión.</strong> Acceso al canal de Keuken y prueba de subida de internet en horario de recital. Confirmación de que las emisiones en vivo están habilitadas.</p><p><strong>Presupuesto y programación.</strong> Confirmación de precios, entregas, instalación y alcance del panel. Coordinación con los artistas para el registro y la transmisión de su presentación.</p></div></details>
  <details class="technical" id="ficha-tecnica"><summary>Ficha técnica y fuentes <span>+</span></summary><div class="technical-grid"><p><strong>Imagen.</strong> Propuesta en Full HD a 30 cuadros por segundo. Las dos cámaras se prueban a la vez con extensiones USB activas de 10 m. La Brio se utiliza a 1080p con este cableado; para 4K hay que cambiar la conexión.</p><p><strong>Audio.</strong> La consola puede enviar sonido por USB o por una salida de línea a una entrada compatible. Si hace falta una interfaz, la UMC202HD recibe los dos canales de la mezcla. Escucharemos una grabación para ajustar el sonido del vivo.</p><p><strong>Internet.</strong> Referencia para H.264 a 1080p30: 10 Mb/s de transmisión y al menos 15 Mb/s de subida estable como margen de trabajo. La prueba en el lugar define la calidad viable.</p><p><strong>Grabación.</strong> OBS permite guardar una copia local mientras transmite. A 10 Mb/s se prevén unos 5 GB por hora; guardar además una copia en otro formato requiere espacio adicional.</p></div><div class="source-links">${external('https://support.google.com/youtube/answer/2853702?hl=es','Requisitos de transmisión · YouTube')}${external('https://obsproject.com/kb/standard-recording-output-guide','Grabación · OBS')}${external('https://www.behringer.com/en/products/0805-AAR','Audio · Behringer')}${external('https://support.google.com/youtube/answer/3367684?hl=es','Derechos en transmisiones · YouTube')}</div></details>
</section>`;

const productById=Object.fromEntries(products.map(p=>[p.id,p]));
const plans={
 economy:{title:'Esencial',name:'Hitman + Gadnic',main:'redragon',secondary:'gadnic',cap:200000,tag:'01 / PRIMERA ETAPA',benefit:'Una toma general y otra de detalle con la menor inversión en cámaras.',lines:[['redragon',1],['gadnic',1],['usb10',2],['base',2],['rotula',2]],note:'Para empezar con dos ángulos y aprovechar el sonido de la consola. La Hitman toma el escenario; la Gadnic se acerca al músico.',condition:'La selección supera en $62 el objetivo de $200.000 antes de instalación y envío. Para respetar ese límite hay que revisar la compra. También falta confirmar la fijación de ambas cámaras y la conexión de audio.'},
 balanced:{title:'Mejor imagen',name:'C920 + Gadnic',main:'c920',secondary:'gadnic',cap:300000,tag:'02 / CÁMARA PRINCIPAL LOGITECH',benefit:'Una C920 con autofoco y lente de cristal para la toma que más se utiliza.',lines:[['c920',1],['gadnic',1],['usb10',2],['base',2],['rotula',2]],note:'La inversión se concentra en la cámara principal. La C920 aporta autofoco y la Gadnic conserva el segundo ángulo para detalles.',condition:'Quedan $3.838 del objetivo de $300.000 para los gastos restantes. La fijación de la Gadnic y la conexión de audio deben resolverse antes de cerrar la compra.'},
 optimal:{title:'Óptimo',name:'Brio 4K + C920',main:'brio',secondary:'c920',cap:null,tag:'03 / DOS CÁMARAS LOGITECH',benefit:'Mayor amplitud de encuadre, dos cámaras con autofoco y audio dedicado.',lines:[['brio',1],['c920',1],['usb10',2],['base',2],['rotula',2],['canal',5],['umc202',1]],note:'Brio como cámara principal y C920 para acercamientos. Suma canaletas e interfaz de audio estéreo. Ambas cámaras tienen conexión de trípode de 1/4″.',condition:'La interfaz se puede omitir si la consola ya envía audio USB estéreo compatible. Instalación, cables de audio y servicios se cotizan después de la visita.'}
};
let mode='balanced';
const fields=['fixings','audio-cost','delivery'];
const entered=Object.fromEntries(Object.keys(plans).map(key=>[key,Object.fromEntries(fields.map(id=>[id,'']))]));
let consoleUsb=false;
function planLines(key){return plans[key].lines.filter(([id])=>!(key==='optimal'&&consoleUsb&&id==='umc202')).map(([id,qty])=>({...productById[id],qty,cents:Math.round(productById[id].price*100)}));}
function subtotalOf(lines){return lines.reduce((sum,p)=>sum+p.cents*p.qty,0);}
function renderPicker(){
 document.getElementById('tier-picker').innerHTML=Object.entries(plans).map(([key,p])=>{
  const cost=subtotalOf(planLines(key)),gap=p.cap===null?null:p.cap*100-cost;
  const benefit=key==='optimal'&&consoleUsb?'Mayor amplitud de encuadre y dos cámaras con autofoco, con audio USB de la consola.':p.benefit;
  return `<button id="tier-${key}" data-mode="${key}" aria-pressed="${mode===key}" aria-controls="selection-lines budget-output products" class="tier-card ${mode===key?'active':''}"><span class="tier-tag">${p.tag}</span><strong class="tier-title">${p.title}</strong><span class="tier-photos"><img src="assets/${productById[p.main].image}" alt="${productById[p.main].name}"><span>+</span><img src="assets/${productById[p.secondary].image}" alt="${productById[p.secondary].name}"></span><strong class="tier-pair">${p.name}</strong><span class="tier-benefit">${benefit}</span><span class="tier-price">${money(cost/100)}<small>equipamiento</small></span><span class="tier-cap">${p.cap===null?'Instalación y servicios a cotizar':'Objetivo total: '+money(p.cap)}</span><span class="tier-margin ${gap!==null&&gap<0?'tier-over':''}">${gap===null?(consoleUsb?'Con audio USB de la consola':'Incluye interfaz de audio'):gap<0?money(-gap/100)+' sobre el objetivo, antes de gastos':money(gap/100)+' restantes para gastos'}</span><span class="tier-action">${mode===key?'Opción seleccionada ✓':'Ver esta opción →'}</span></button>`;
 }).join('');
 document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;fields.forEach(id=>document.getElementById(id).value=entered[mode][id]);renderSelection();document.getElementById('tier-'+mode).focus();}));
}
function renderSelection(){
 const selected=plans[mode],lines=planLines(mode);renderPicker();
 document.getElementById('interface-option').hidden=mode!=='optimal';
 const description=mode==='optimal'&&consoleUsb?'Brio como cámara principal y C920 para acercamientos, con canaletas para el cableado. Se utiliza el audio USB estéreo de la consola. Ambas cámaras tienen conexión de trípode de 1/4″.':selected.note;
 document.getElementById('mode-note').innerHTML=`<h3>${selected.title} · ${selected.name}</h3><p>${description}</p>`;
 document.getElementById('selection-condition').innerHTML=`<p>${selected.condition}</p>`;
 document.getElementById('selection-lines').innerHTML=lines.map(p=>`<div><span>${p.qty} × ${p.name}</span><strong>${money(p.cents*p.qty/100)}</strong></div>`).join('');
 document.getElementById('products').innerHTML=lines.map(p=>`<article class="product"><a class="product-photo" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${p.name} en Mercado Libre"><img src="assets/${p.image}" alt="${p.name}" loading="lazy" width="400" height="300"></a><div class="product-body"><p class="product-role">${p.id===selected.main?'CÁMARA PRINCIPAL':p.id===selected.secondary?'CÁMARA CERCANA':'INSTALACIÓN'}</p><h3>${p.name}</h3><p class="product-note">${p.note}</p><div class="product-price"><strong>${money(p.price)}</strong><span>por ${p.id==='canal'?'tira de 2 m':'unidad'} · ${p.seller}</span></div><div class="product-bottom"><span>${p.qty} ${p.qty===1?'unidad':'unidades'} · ${money(p.cents*p.qty/100)}</span>${external(p.url,'Ver en Mercado Libre')}</div><details class="product-spec"><summary>Características y compatibilidad</summary><p>${p.technical}</p></details></div></article>`).join('');
 window.keukenPlan={main:selected.main,secondary:selected.secondary,name:selected.name};window.dispatchEvent(new CustomEvent('keuken:plan',{detail:window.keukenPlan}));renderBudget();
}
function renderBudget(){
 const plan=plans[mode],hardware=subtotalOf(planLines(mode));
 const inputs=fields.map(id=>document.getElementById(id));
 inputs.forEach(el=>el.setAttribute('aria-invalid',String(!el.validity.valid)));
 const invalid=inputs.some(el=>!el.validity.valid);
 const extras=inputs.reduce((sum,el)=>sum+(el.value!==''&&el.validity.valid?Math.round(Number(el.value)*100):0),0);
 const enteredCount=inputs.filter(el=>el.value!==''&&el.validity.valid).length;
 const total=hardware+extras,margin=plan.cap===null?null:plan.cap*100-total;
 document.getElementById('budget-output').innerHTML=`<p class="big-total">${money((enteredCount?total:hardware)/100)}</p><p class="budget-caption">${enteredCount?'Equipamiento + gastos ingresados':'Dos cámaras + accesorios de esta opción'}</p>${enteredCount?`<dl><div><dt>Equipamiento</dt><dd>${money(hardware/100)}</dd></div><div><dt>Gastos ingresados</dt><dd>${money(extras/100)}</dd></div></dl>`:''}${margin!==null?`<p class="budget-status ${margin<0?'over':''}">${margin<0?'Sobre el objetivo: '+money(-margin/100):'Margen hasta '+money(plan.cap)+': '+money(margin/100)}</p>`:''}<p class="small">${invalid?'Revisá los importes: deben ser números entre 0 y 10.000.000.':enteredCount<3?'Total parcial. Los gastos sin importe siguen pendientes de cotización.':'Total calculado con los gastos ingresados. Sujeto a confirmación de precios y alcance.'}</p>`;
}
fields.forEach(id=>document.getElementById(id).addEventListener('input',()=>{entered[mode][id]=document.getElementById(id).value;renderBudget();}));
document.getElementById('console-usb').addEventListener('change',event=>{consoleUsb=event.target.checked;renderSelection();});
renderSelection();

function revealAnchor(){
 const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
 if(!target)return;
 const parents=[];let node=target;
 while(node){if(node.tagName==='DETAILS')parents.push(node);node=node.parentElement;}
 if(parents.some(el=>!el.open)){parents.forEach(el=>el.open=true);requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}
}
window.addEventListener('hashchange',revealAnchor);
document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(a&&a.hash===location.hash)revealAnchor();});
window.addEventListener('load',revealAnchor);
