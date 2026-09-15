'use strict';

const money = cents => new Intl.NumberFormat('es-AR', {style:'currency', currency:'ARS', maximumFractionDigits:2, minimumFractionDigits:cents % 100 ? 2 : 0}).format(cents / 100);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = id => document.getElementById(id);

// Cada tema planteado por Keuken tiene opciones; cada opción suma líneas de productos [id, cantidad, 'fijo'].
// Las líneas se multiplican por la cantidad del tema (amplificadores, puntos de montaje), salvo las marcadas como fijas.
// Las opciones sin líneas cuestan cero: representan lo que ya existe o lo que se prueba primero.
const needs = [
  {id:'amplis', letter:'A', kicker:'AMPLIFICADORES', sectionId:'amplis',
   title:'Amplificadores que hoy no llegan a la consola',
   quote:'Las presentaciones salen con amplificadores; tenemos que contemplar líneas para llevarlos a la consola y tener esa premezcla de la grabación.',
   help:'Una opción por amplificador que hoy suena solo en el escenario. Cambiá la cantidad según cuántos haya que captar.',
   qty:{label:'Amplificadores a captar', min:1, max:4, value:1, unit:'por amplificador', plural:'amplificadores'},
   options:[
     {id:'have', tag:'PARA LA PRUEBA', name:'Con lo que ya hay', lines:[], summary:'Un micrófono dinámico y un cable que Keuken ya tenga, a un canal libre de la consola.', why:'Comprueba el recorrido completo antes de gastar. Si el sonido convence, no hace falta comprar.'},
     {id:'mic', tag:'RECOMENDADA', recommended:true, name:'Micrófono + cable + pie', lines:[['sl75c',1],['xlr',1],['stand',1]], summary:'Un dinámico frente al parlante, un XLR de 10 m y un pie con brazo, por cada amplificador.', why:'Captura el sonido real del amplificador y lo suma a la mezcla sin cambiar nada del escenario.', followUp:'un canal libre por micrófono y el recorrido real de cada cable'},
     {id:'di', tag:'BAJO Y TECLADO', name:'Señal directa (DI)', lines:[['di400p',1],['xlr',1]], summary:'Una caja directa pasiva y un XLR desde la salida del instrumento o del amplificador.', why:'Limpia y sin micrófono, pero no reproduce el sonido del parlante: mejor para bajo o teclado.', followUp:'cables de instrumento para la DI y la confirmación del modelo pasivo'}
   ],
   reco:'Probar primero con un dinámico que ya tengan. Si convence, cero. Si no, un micrófono con su cable y su pie por cada amplificador; la DI queda para bajo o teclado con salida de línea.'},
  {id:'mezcla', letter:'B', kicker:'PREMEZCLA', sectionId:'amplis',
   title:'Una mezcla propia para internet',
   quote:'Poder tener esa premezcla de lo que sería la grabación, que no es lo que está sucediendo acá.',
   help:'Se define con el modelo de consola en la mano. Elegí la opción que corresponda a lo que la consola puede hacer.',
   options:[
     {id:'usb', tag:'SI LA CONSOLA LO PERMITE', name:'Por el USB de la consola', lines:[], summary:'La consola envía a la computadora, por USB, la mezcla elegida para el vivo.', why:'Sin costo. Solo sirve si el USB puede mandar un envío auxiliar y no únicamente la mezcla del salón.'},
     {id:'aux', tag:'RECOMENDADA SI NO HAY USB ÚTIL', recommended:true, name:'Envío auxiliar → interfaz UMC202HD', lines:[['umc',1]], summary:'Un auxiliar libre de la consola entra a la interfaz y llega a OBS en estéreo.', why:'Independiza el vivo de la mezcla del salón: se ajusta con auriculares sin tocar lo que escucha el público.', followUp:'los cables desde la salida auxiliar de la consola a la interfaz'},
     {id:'multi', tag:'ETAPA POSTERIOR', pending:true, name:'Multipista para mezclar después', lines:[], summary:'Grabar cada canal por separado y mezclar el video después del recital.', why:'La mejor calidad para el archivo, pero exige otra interfaz o consola y horas de mezcla por fecha. Se cotiza cuando el vivo ya funcione.', followUp:'una interfaz multicanal o consola multipista, a cotizar en una etapa posterior'}
   ],
   reco:'Si el USB de la consola puede mandar un envío auxiliar, no se compra nada. Si solo manda el master, una UMC202HD recibe el auxiliar y lo lleva a OBS.'},
  {id:'acusticos', letter:'C', kicker:'SIN CONSOLA Y TEATRO', sectionId:'acusticos',
   title:'Acústicos, fechas sin consola y teatro',
   quote:'Algunas cosas son muy acústicas y algunas sin consola: deberíamos tener una Tascam o una Zoom para una grabación de aire, o algún micrófono que grabe todo el entorno; cuestiones de teatro, por ejemplo.',
   help:'Un solo aparato para las fechas sin consola y para teatro; el par de micrófonos, cuando la consola está y tiene canales libres.',
   options:[
     {id:'have', tag:'PARA LA PRUEBA', name:'Con lo que ya hay', lines:[], summary:'La grabadora o el micrófono que tengan a mano, delante de la presentación.', why:'Permite escuchar con auriculares qué llega y decidir con evidencia.'},
     {id:'h1', tag:'RECOMENDADA', recommended:true, name:'Grabadora estéreo Zoom H1essential', lines:[['h1',1]], summary:'Micrófonos estéreo, tarjeta de respaldo y salida USB a OBS, sin consola.', why:'Resuelve acústicos y obras con un solo aparato portátil; graba aunque se corte todo lo demás.', followUp:'tarjeta, cable USB de datos, alimentación y soporte de la grabadora'},
     {id:'c2', tag:'CON CONSOLA Y PHANTOM', name:'Par C-2 a la consola', lines:[['c2',1],['xlr',2],['stand',2]], summary:'Dos condensadores cardioides, dos cables y dos pies, a dos canales con 48 V.', why:'Más control y mejor ubicación de cada captación, cuando la consola está y tiene canales libres.', followUp:'dos canales con phantom de 48 V y el recorrido de los cables'}
   ],
   reco:'La grabadora H1essential resuelve acústicos y obras sin consola, graba en tarjeta aunque falle lo demás y entra por USB a OBS. El par C-2 se elige solo cuando hay consola con phantom y se quiere ubicar cada captación por separado.'},
  {id:'escenario', letter:'D', kicker:'MONTAJE', sectionId:'escenario',
   title:'Cámaras que se mudan con el escenario',
   quote:'A veces cambiamos de lugar el escenario.',
   help:'Varios puntos de montaje fijos arriba; la cantidad se define en el ensayo según las configuraciones del escenario.',
   qty:{label:'Puntos de montaje', min:2, max:8, value:4, unit:'por punto', plural:'puntos', hint:'Aplica a la opción de puntos fijos. Dos configuraciones de escenario con dos cámaras son cuatro puntos.'},
   options:[
     {id:'have', tag:'PARA LA PRUEBA', name:'Trípodes prestados', lines:[], summary:'Dos trípodes de foto prestados para probar encuadres y elegir dónde irán los puntos.', why:'Sin costo para ensayar cada configuración del escenario antes de atornillar nada.'},
     {id:'ceiling', tag:'RECOMENDADA · LA IDEA DE KEUKEN', recommended:true, name:'Puntos fijos en vigas o techo', lines:[['base',1],['rotula',2,'fijo']], summary:'Una base atornillada por punto y una rótula por cámara. La cámara se muda al punto que corresponde.', why:'Encuadre repetible sin volver a ajustar, cables por arriba y sin depender de apoyos especiales.', fixedLabel:'en dos rótulas', followUp:'el permiso para atornillar en las vigas, la altura de cada punto y una retención de seguridad'},
     {id:'r094', tag:'SI HAY APOYOS DE 13 A 60 MM', name:'Dos pinzas con brazo R094', lines:[['r094',2,'fijo']], summary:'Pinza, brazo corto y tornillo de 1/4″ sobre listones o caños compatibles.', why:'Se sueltan y se reubican en minutos, pero no abrazan las vigas grandes del salón.', followUp:'puntos de sujeción de 13 a 60 mm y la retención secundaria de cada cámara'}
   ],
   reco:'Bases en cada punto útil de las vigas o el techo y una rótula por cámara: es lo más simple para un escenario que cambia, y los cables quedan arriba. En el ensayo se define cuántos puntos hacen falta y a qué altura conviene cada uno.'},
  {id:'camara', letter:'E', kicker:'CÁMARAS', sectionId:'escenario',
   title:'Una cámara con rosca de trípode',
   quote:'Tenemos algunas de esas cosas del rider técnico que planteaste.',
   help:'Solo si la prueba muestra que falta una cámara o que la existente no tiene rosca de 1/4″.',
   options:[
     {id:'have', tag:'RECOMENDADA · PRIMERO PROBARLAS', recommended:true, name:'Las cámaras que ya tienen', lines:[], summary:'Se prueban las cámaras existentes con las extensiones USB y los soportes.', why:'Solo se compra una cámara si la prueba muestra que falta o que no tiene rosca de 1/4″.'},
     {id:'c920', tag:'SI FALTA UNA', name:'Logitech C920', lines:[['c920',1]], summary:'1080p a 30 fps, autofoco y rosca de trípode; se enrosca directo en la rótula o el soporte.', why:'La referencia probada del presupuesto de cámaras, con oferta nacional.', followUp:'una extensión USB activa y el montaje de la cámara nueva'}
   ],
   reco:'Primero probar las cámaras que ya tienen con las extensiones y los soportes. La C920 es la referencia si hay que comprar una: rosca de 1/4″, autofoco y oferta nacional.'}
];

const state = {selected:Object.fromEntries(needs.map(n=>[n.id,null])), qty:Object.fromEntries(needs.filter(n=>n.qty).map(n=>[n.id,n.qty.value]))};
let products = [], byId = {};

const multiplier = need => need.qty ? state.qty[need.id] : 1;
const lineQty = (need, line) => line[1] * (line[2] ? 1 : multiplier(need));
const optionCost = (need, opt) => opt.lines.reduce((sum, line) => sum + byId[line[0]].priceCents * lineQty(need, line), 0);
const scalableCost = opt => opt.lines.filter(line => !line[2]).reduce((sum, line) => sum + byId[line[0]].priceCents * line[1], 0);
const fixedCost = opt => opt.lines.filter(line => line[2]).reduce((sum, line) => sum + byId[line[0]].priceCents * line[1], 0);
const scales = (need, opt) => Boolean(need.qty) && opt.lines.some(line => !line[2]);
const chosen = need => need.options.find(o => o.id === state.selected[need.id]) || null;

function parsePesos(value) {
  const raw = value.trim();
  if (!raw) return null;
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(raw)) return NaN;
  const [whole, decimals=''] = raw.replaceAll('.','').split(',');
  const cents = Number(whole) * 100 + Number(decimals.padEnd(2,'0'));
  return Number.isSafeInteger(cents) && cents <= 10000000000 ? cents : NaN;
}

function priceNote(need, opt) {
  if (!opt.lines.length) return opt.pending ? 'etapa posterior' : 'con lo que ya hay';
  if (!scales(need, opt)) return 'productos, antes de envío';
  const qty = multiplier(need);
  if (fixedCost(opt)) return `${qty} ${need.qty.plural} × ${money(scalableCost(opt))} + ${money(fixedCost(opt))} ${opt.fixedLabel || 'fijos'} · antes de envío`;
  return qty > 1 ? `${money(scalableCost(opt))} ${need.qty.unit} · antes de envío` : 'productos, antes de envío';
}

function optionCard(need, opt) {
  const selected = state.selected[need.id] === opt.id;
  const photos = opt.lines.length
    ? opt.lines.map(([id]) => `<img src="../assets/${escapeHTML(byId[id].image)}" alt="${escapeHTML(byId[id].name)}" loading="lazy" width="64" height="52">`).join('')
    : '<span class="no-photo" aria-hidden="true">✓</span>';
  const linesText = opt.lines.length
    ? opt.lines.map(line => `${lineQty(need, line)} × ${escapeHTML(byId[line[0]].name)}`).join(' · ')
    : (opt.pending ? 'Sin producto ahora: se cotiza en una etapa posterior' : 'Sin compra');
  const price = opt.pending ? 'A cotizar' : money(optionCost(need, opt));
  return `<button type="button" class="option-card${opt.recommended ? ' is-recommended' : ''}" aria-pressed="${selected}" data-need="${need.id}" data-option="${opt.id}"><span class="option-tag">${escapeHTML(opt.tag)}</span><strong class="option-name">${escapeHTML(opt.name)}</strong><span class="option-photos">${photos}</span><span class="option-summary">${escapeHTML(opt.summary)}</span><span class="option-why">${escapeHTML(opt.why)}</span><span class="option-lines">${linesText}</span><span class="option-price">${price}<small>${priceNote(need, opt)}</small></span><span class="option-action">${selected ? 'Elegida ✓ · tocá para quitarla' : 'Elegir esta opción →'}</span></button>`;
}

function renderNeed(need) {
  const host = document.querySelector(`.need[data-need="${need.id}"]`);
  if (!host) return;
  host.id = `need-${need.id}`;
  const qty = multiplier(need);
  host.innerHTML = `<div class="need-head"><div><span class="label">${need.letter} · ${escapeHTML(need.kicker)}</span><h3>${escapeHTML(need.title)}</h3><p class="need-help">${escapeHTML(need.help)}</p></div></div>
  ${need.qty ? `<div class="qty-stepper" role="group" aria-label="${escapeHTML(need.qty.label)}"><span>${escapeHTML(need.qty.label)}</span><button type="button" data-step="-1" data-need="${need.id}" aria-label="Uno menos"${qty <= need.qty.min ? ' disabled' : ''}>−</button><output aria-live="polite">${qty}</output><button type="button" data-step="1" data-need="${need.id}" aria-label="Uno más"${qty >= need.qty.max ? ' disabled' : ''}>+</button></div>${need.qty.hint ? `<p class="qty-hint">${escapeHTML(need.qty.hint)}</p>` : ''}` : ''}
  <div class="option-cards" role="group" aria-label="Opciones: ${escapeHTML(need.title)}">${need.options.map(opt => optionCard(need, opt)).join('')}</div>
  <p class="need-reco"><b>Recomendación.</b>${escapeHTML(need.reco)}</p>`;
}

function renderProducts() {
  $('products').innerHTML = products.map(p => `<article class="product" id="producto-${p.id}"><span class="product-badge" hidden>EN TU LISTA</span>
    <a class="product-photo" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${escapeHTML(p.name)} en Mercado Libre"><img src="../assets/${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" width="420" height="250"></a>
    <div class="product-copy"><span class="label">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p>
    <details><summary>Compatibilidad y accesorios</summary><p>${escapeHTML(p.condition)}</p>${p.source ? `<a class="source" href="${escapeHTML(p.source)}" target="_blank" rel="noopener noreferrer">Ficha del fabricante ↗</a>` : ''}</details>
    <div class="product-price">${money(p.priceCents)}</div><span class="product-unit">${escapeHTML(p.unit)}</span>
    <p class="product-qty none" id="pqty-${p.id}">No está en tu lista</p>
    <a class="buy-link" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">Ver en Mercado Libre ↗</a><small class="seller">${escapeHTML(p.seller)} · oferta ${escapeHTML(p.item)}<br>Precio y stock consultados: ${escapeHTML(p.consulted)}</small></div></article>`).join('');
}

function currentQuantities() {
  const quantities = {};
  needs.forEach(need => {
    const opt = chosen(need);
    if (!opt) return;
    opt.lines.forEach(line => { quantities[line[0]] = (quantities[line[0]] || 0) + lineQty(need, line); });
  });
  return quantities;
}

function renderBudget() {
  const quantities = currentQuantities();
  const listed = products.filter(p => quantities[p.id]);
  const subtotal = listed.reduce((total,p) => total + p.priceCents * quantities[p.id], 0);
  $('selection-list').innerHTML = needs.map(need => {
    const opt = chosen(need);
    const choice = opt ? escapeHTML(opt.name) + (scales(need, opt) ? ` · ${multiplier(need)} ${need.qty.plural}` : '') : 'Sin elegir · queda en cero';
    return `<div class="selection-row"><div><span class="sel-need">${need.letter} · ${escapeHTML(need.title)}</span><span class="sel-choice${opt ? '' : ' sel-none'}">${choice}</span></div><span class="sel-cost">${opt && opt.pending ? 'A cotizar' : money(opt ? optionCost(need, opt) : 0)}</span><a href="#need-${need.id}">${opt ? 'Cambiar' : 'Elegir'} ↑</a></div>`;
  }).join('');
  $('budget-lines').innerHTML = listed.map(p => `<div class="budget-line"><span>${quantities[p.id]} × ${escapeHTML(p.name)}</span><span>${money(p.priceCents * quantities[p.id])}</span></div>`).join('') || '<p class="small">Todavía no hay productos en la lista.</p>';
  $('subtotal').textContent = money(subtotal);
  const mobile = $('mobile-subtotal'); if (mobile) mobile.textContent = money(subtotal);
  const shipping = parsePesos($('shipping').value), extras = parsePesos($('extras').value);
  const invalid = Number.isNaN(shipping) || Number.isNaN(extras);
  $('cost-error').textContent = invalid ? 'Ingresá un importe positivo o cero. Ejemplo: 10.000,50.' : '';
  $('total').textContent = invalid ? '—' : money(subtotal + (shipping ?? 0) + (extras ?? 0));
  const pending = [];
  if (shipping === null) pending.push('envío');
  if (extras === null) pending.push('otros insumos');
  needs.forEach(need => { const opt = chosen(need); if (opt && opt.followUp) pending.push(opt.followUp); });
  const anyChoice = needs.some(need => chosen(need));
  $('budget-status').textContent = invalid ? 'Corregí los importes señalados para calcular.'
    : !anyChoice ? 'Elegí una opción por tema en las secciones anteriores, o cargá las recomendaciones. Lo que ya tienen queda en cero.'
    : pending.length ? `Falta confirmar: ${pending.join('; ')}. El total muestra únicamente los importes cargados.`
    : 'Importes cargados. La compra final se define al comprobar compatibilidad, stock y accesorios.';
  products.forEach(p => {
    const card = $(`producto-${p.id}`), qty = quantities[p.id] || 0;
    card.classList.toggle('selected', qty > 0);
    card.querySelector('.product-badge').hidden = qty === 0;
    const label = $(`pqty-${p.id}`);
    label.textContent = qty ? `${qty} ${qty === 1 ? 'unidad' : 'unidades'} en tu lista · ${money(p.priceCents * qty)}` : 'No está en tu lista';
    label.classList.toggle('none', qty === 0);
  });
}

function refresh(needIds) {
  needs.filter(need => !needIds || needIds.includes(need.id)).forEach(renderNeed);
  renderBudget();
}

function setup() {
  byId = Object.fromEntries(products.map(p => [p.id, p]));
  const layout = document.querySelector('.budget-layout');
  const mobileBudget = document.createElement('a');
  mobileBudget.className = 'mobile-budget';
  mobileBudget.href = '#budget-summary';
  mobileBudget.innerHTML = '<span>Lo que falta comprar<strong id="mobile-subtotal">$0</strong></span><span>Ver la lista ↓</span>';
  layout.prepend(mobileBudget);
  renderProducts();
  refresh();
  document.addEventListener('click', event => {
    const card = event.target.closest('.option-card');
    if (card) {
      const needId = card.dataset.need, optId = card.dataset.option;
      state.selected[needId] = state.selected[needId] === optId ? null : optId;
      refresh([needId]);
      document.querySelector(`.option-card[data-need="${needId}"][data-option="${optId}"]`)?.focus();
      return;
    }
    const step = event.target.closest('[data-step]');
    if (step) {
      const need = needs.find(n => n.id === step.dataset.need);
      const next = state.qty[need.id] + Number(step.dataset.step);
      if (next < need.qty.min || next > need.qty.max) return;
      state.qty[need.id] = next;
      refresh([need.id]);
      document.querySelector(`.qty-stepper [data-need="${need.id}"][data-step="${step.dataset.step}"]:not(:disabled)`)?.focus();
    }
  });
  $('load-reco').addEventListener('click', () => {
    needs.forEach(need => { state.selected[need.id] = (need.options.find(o => o.recommended) || {id:null}).id; });
    refresh();
    $('budget-status').textContent = 'Recomendaciones cargadas: podés quitar lo que Keuken ya tenga en cada tema. ' + $('budget-status').textContent;
  });
  $('clear-all').addEventListener('click', () => { needs.forEach(need => { state.selected[need.id] = null; }); $('shipping').value = ''; $('extras').value = ''; refresh(); });
  ['shipping','extras'].forEach(id => $(id).addEventListener('input', renderBudget));
  if (location.hash.startsWith('#producto-')) $(location.hash.slice(1))?.scrollIntoView();
}

function renderSupport() {
  const people = $('supporters'), contribution = $('contribution');
  const valid = [people, contribution].every(input => input.value !== '' && input.validity.valid);
  $('support-total').textContent = valid ? `${money(Number(people.value) * Number(contribution.value) * 100)} por mes` : 'Completá ambos valores';
}
['supporters','contribution'].forEach(id => $(id).addEventListener('input', renderSupport));
renderSupport();

fetch('productos.json').then(response => {
  if (!response.ok) throw new Error('No se pudo cargar la lista');
  return response.json();
}).then(list => { products = list; setup(); }).catch(() => {
  $('products').innerHTML = '<p>No se pudo cargar la lista. <a href="productos.json">Consultar productos y precios</a> o recargar la página.</p>';
  document.querySelectorAll('.need').forEach(host => { host.innerHTML = '<p class="small">Las opciones y sus precios no se pudieron cargar. Recargá la página para calcular.</p>'; });
  $('budget-status').textContent = 'Recargá la página para calcular.';
});
