'use strict';

const money = cents => new Intl.NumberFormat('es-AR', {style:'currency', currency:'ARS', maximumFractionDigits:2, minimumFractionDigits:cents % 100 ? 2 : 0}).format(cents / 100);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bundles = {
  amp:{title:'Un amplificador que hoy no llega a la consola',description:'Un micrófono, un cable XLR y un pie. Requiere un canal libre y una salida de audio de la consola hacia la computadora.',quantities:{sl75c:1,xlr:1,stand:1}},
  acoustic:{title:'Acústico con consola y conexión a la computadora disponibles',description:'Un par C-2 (dos micrófonos), dos cables XLR y dos pies. Requiere dos canales libres con phantom de 48 V. Si ya hay pies o cables, poné esas cantidades en cero.',quantities:{c2:1,xlr:2,stand:2}},
  portable:{title:'Una grabadora portátil para las fechas sin consola',description:'H1essential como alternativa al par C-2. Este subtotal es solo de la grabadora: falta resolver tarjeta, USB de datos, alimentación y soporte antes de considerarlo un conjunto listo.',quantities:{h1:1}},
  mount:{title:'Dos cámaras existentes, dos soportes reubicables',description:'Dos R094, sin comprar otra base ni otra rótula. Requiere cámaras con rosca de 1/4” y dos superficies de sujeción firmes de 13–60 mm. Puntos de anclaje y retención se resuelven en el salón.',quantities:{r094:2}},
  empty:{title:'Elegí solamente lo que falta',description:'Las cantidades en cero no suman. Estas ampliaciones no incluyen automáticamente un equipo completo de cámaras, audio o instalación.',quantities:{}}
};

function parsePesos(value) {
  const raw = value.trim();
  if (!raw) return null;
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(raw)) return NaN;
  const [whole, decimals=''] = raw.replaceAll('.','').split(',');
  const cents = Number(whole) * 100 + Number(decimals.padEnd(2,'0'));
  return Number.isSafeInteger(cents) && cents <= 10000000000 ? cents : NaN;
}

async function setupBudget() {
  const response = await fetch('productos.json');
  if (!response.ok) throw new Error('No se pudo cargar la lista');
  const products = await response.json();
  const quantities = Object.fromEntries(products.map(p=>[p.id,0]));
  const productGrid = document.getElementById('products');
  const mobileBudget = document.createElement('a');
  mobileBudget.className='mobile-budget';
  mobileBudget.href='#budget-summary';
  mobileBudget.innerHTML='<span>Subtotal de productos<strong id="mobile-subtotal">—</strong></span><span>Ver resumen ↓</span>';
  document.querySelector('.budget-layout').prepend(mobileBudget);
  document.querySelector('.budget').id='budget-summary';
  productGrid.innerHTML = products.map(p => `<article class="product" id="producto-${p.id}">
    <a class="product-photo" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${escapeHTML(p.name)} en Mercado Libre"><img src="../assets/${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" width="420" height="250"></a>
    <div class="product-copy"><span class="label">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p>
    <details><summary>Compatibilidad y accesorios</summary><p>${escapeHTML(p.condition)}</p>${p.source?`<a class="source" href="${escapeHTML(p.source)}" target="_blank" rel="noopener noreferrer">Ficha del fabricante ↗</a>`:''}</details>
    <div class="product-price">${money(p.priceCents)}</div><span class="product-unit">${escapeHTML(p.unit)}</span>
    <label class="product-quantity" for="qty-${p.id}">Cantidad a comprar<input id="qty-${p.id}" data-product="${p.id}" type="number" inputmode="numeric" min="0" max="16" step="1" value="0" aria-label="Cantidad de ${escapeHTML(p.name)}"></label>
    <a class="buy-link" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">Ver en Mercado Libre ↗</a><small class="seller">${escapeHTML(p.seller)} · oferta ${escapeHTML(p.item)}<br>Precio y stock consultados: 15/09/2026</small></div></article>`).join('');

  function renderBudget() {
    const selected = products.filter(p => quantities[p.id] > 0);
    const subtotal = selected.reduce((total,p) => total + p.priceCents * quantities[p.id],0);
    const shipping = parsePesos(document.getElementById('shipping').value);
    const extras = parsePesos(document.getElementById('extras').value);
    const invalidQuantity = [...productGrid.querySelectorAll('input')].some(input=>!input.validity.valid || input.value==='');
    const invalidCost = Number.isNaN(shipping) || Number.isNaN(extras);
    const invalid = invalidQuantity || invalidCost;
    document.getElementById('subtotal').textContent = invalidQuantity ? 'Revisar cantidades' : money(subtotal);
    document.getElementById('mobile-subtotal').textContent = invalidQuantity ? 'Revisar cantidades' : money(subtotal);
    document.getElementById('budget-lines').innerHTML = selected.map(p=>`<div class="budget-line"><span>${quantities[p.id]} × ${escapeHTML(p.name)}</span><span>${money(p.priceCents * quantities[p.id])}</span></div>`).join('') || '<p class="small">Todavía no hay productos seleccionados.</p>';
    document.getElementById('cost-error').textContent = invalidQuantity ? 'Usá cantidades enteras entre 0 y 16.' : invalidCost ? 'Ingresá un importe positivo o cero. Ejemplo: 10.000,50.' : '';
    document.getElementById('total').textContent = invalid ? '—' : money(subtotal + (shipping ?? 0) + (extras ?? 0));
    const pending = [];
    if(shipping===null) pending.push('envío');
    if(extras===null) pending.push('otros insumos');
    if(quantities.h1) pending.push('tarjeta, USB, alimentación y soporte de la grabadora');
    if(quantities.r094) pending.push('puntos de sujeción y retención de las cámaras');
    if(quantities.c920) pending.push('extensiones USB y montaje de la cámara');
    if(quantities.umc) pending.push('conexión de audio a la interfaz');
    if(quantities.di400p) pending.push('cables de instrumento para la DI');
    document.getElementById('budget-status').textContent = invalid ? 'Corregí los campos señalados para calcular.' : pending.length ? `Falta confirmar: ${pending.join('; ')}. El total muestra únicamente los importes cargados.` : 'Importes cargados. La compra final se define al comprobar compatibilidad, stock y accesorios.';
    products.forEach(p => document.getElementById(`producto-${p.id}`).classList.toggle('selected',quantities[p.id]>0));
  }

  function applyBundle(key) {
    const bundle = bundles[key];
    products.forEach(p=>{quantities[p.id]=bundle.quantities[p.id]||0; document.getElementById(`qty-${p.id}`).value=quantities[p.id];});
    document.getElementById('bundle-title').textContent=bundle.title;
    document.getElementById('bundle-description').textContent=bundle.description;
    document.querySelectorAll('[data-bundle]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.bundle===key)));
    // Each scenario needs its own delivery and accessory quote.
    document.getElementById('shipping').value='';
    document.getElementById('extras').value='';
    renderBudget();
  }

  document.querySelectorAll('[data-bundle]').forEach(button=>button.addEventListener('click',()=>applyBundle(button.dataset.bundle)));
  productGrid.addEventListener('input',event=>{
    const input=event.target;
    if(!input.matches('[data-product]')) return;
    const value=Number(input.value);
    quantities[input.dataset.product]=input.value!==''&&Number.isInteger(value)&&value>=0&&value<=16?value:0;
    document.querySelectorAll('[data-bundle]').forEach(b=>b.setAttribute('aria-pressed','false'));
    document.getElementById('bundle-title').textContent='Tu selección de faltantes';
    document.getElementById('bundle-description').textContent='Cantidades personalizadas. Revisá la compatibilidad y los accesorios de cada ficha: esta suma no implica que todos los productos formen un único sistema.';
    renderBudget();
  });
  ['shipping','extras'].forEach(id=>document.getElementById(id).addEventListener('input',renderBudget));
  applyBundle('amp');
  if(location.hash.startsWith('#producto-')) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

const audioTabs = [...document.querySelectorAll('[data-audio]')];
function activateAudio(tab) {
  audioTabs.forEach(button=>{
    const active = button === tab;
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
    document.getElementById(`audio-${button.dataset.audio}`).hidden=!active;
  });
}
audioTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateAudio(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight') next=audioTabs[(index+1)%audioTabs.length];
    if(event.key==='ArrowLeft') next=audioTabs[(index+audioTabs.length-1)%audioTabs.length];
    if(event.key==='Home') next=audioTabs[0];
    if(event.key==='End') next=audioTabs.at(-1);
    if(next){event.preventDefault();activateAudio(next);next.focus();}
  });
});

function renderSupport() {
  const people=document.getElementById('supporters'), contribution=document.getElementById('contribution');
  const valid=[people,contribution].every(input=>input.value!=='' && input.validity.valid);
  document.getElementById('support-total').textContent=valid?`${money(Number(people.value)*Number(contribution.value)*100)} por mes`:'Completá ambos valores';
}
['supporters','contribution'].forEach(id=>document.getElementById(id).addEventListener('input',renderSupport));
renderSupport();
setupBudget().catch(()=>{
  document.getElementById('products').innerHTML='<p>No se pudo cargar la lista. <a href="productos.json">Consultar productos y precios</a> o recargar la página.</p>';
  document.getElementById('bundle-title').textContent='Lista temporalmente no disponible';
  document.getElementById('bundle-description').textContent='No se muestra un total hasta cargar los precios.';
  document.getElementById('budget-status').textContent='Recargá la página para calcular.';
});
