(() => {
  const section = document.createElement('section');
  section.id = 'operacion';
  section.className = 'section operator-section';
  section.innerHTML = `
    <p class="eyebrow">OPERACIÓN SIMPLE / PROPUESTA DE SOFTWARE</p>
    <div class="section-heading"><h2>El recital adelante.<br>OBS, detrás.</h2><p>Una ventana para elegir la toma, comprobar el sonido y transmitir. El técnico deja preparada la configuración; el operador se concentra en el show.</p></div>
    <div class="op-demo-label"><strong>MAQUETA INTERACTIVA</strong><span>Podés probar los controles. Usa fotos y estados simulados; no conecta con OBS, no graba ni transmite.</span></div>
    <div class="op-panel">
      <div class="op-top"><div><span class="op-brand">KEUKEN · EN VIVO</span><p>Ensayo del recital <span class="op-privacy">No listado · ejemplo</span></p></div><span id="op-phase" class="op-phase">Antes de empezar</span></div>
      <div class="op-status" aria-label="Estados simulados"><div><span>Control de OBS</span><strong id="op-obs">Conectado · demo</strong></div><div><span>YouTube</span><strong id="op-youtube">Sin transmitir</strong></div><div><span>Copia en la PC</span><strong id="op-record">Sin grabar</strong></div></div>
      <div class="op-workspace"><div class="op-picture"><img id="op-photo" src="assets/salon-publico.webp" alt="Foto de referencia del escenario desde el público"><div id="op-wait-card" class="op-wait-card" hidden><span>KEUKEN AONIKENK</span><strong>Enseguida<br>volvemos.</strong><small>La música nos encuentra.</small></div><span class="op-image-caption" id="op-image-caption">CÁMARA 1 · Foto de referencia</span><span class="op-timer" id="op-timer">00:00</span></div>
      <div class="op-choices"><p class="op-control-heading">Elegí qué mostrar</p><button data-op-scene="general" aria-pressed="true"><span class="op-scene-number">1</span><span><strong>Escenario</strong><small>Cámara principal</small></span><span class="op-selected" aria-hidden="true">✓</span></button><button data-op-scene="detail" aria-pressed="false"><span class="op-scene-number">2</span><span><strong>De cerca</strong><small>Segunda cámara</small></span><span class="op-selected" aria-hidden="true">✓</span></button><button data-op-scene="waiting" aria-pressed="false"><span class="op-scene-number">Ⅱ</span><span><strong>Placa de espera</strong><small>El audio sigue sonando</small></span><span class="op-selected" aria-hidden="true">✓</span></button><div class="op-sound"><div><span>Sonido de la consola</span><strong id="op-audio-label">Activo · ejemplo</strong></div><div class="op-meter" aria-hidden="true"><span id="op-meter-fill"></span></div><button id="op-mute" aria-pressed="false">Silenciar sonido</button></div></div></div>
      <div class="op-actions"><button class="op-secondary" id="op-rehearse">Probar grabación</button><button class="op-primary" id="op-start">Iniciar vivo</button><button class="op-end" id="op-end" hidden>Finalizar recital</button></div>
      <p id="op-message" class="op-message" role="status">Probá una grabación antes del vivo. En esta maqueta no se crea ningún archivo.</p>
      <details class="op-recovery"><summary>Probar el aviso de pérdida de control</summary><p>Si el panel pierde conexión, debe mostrar incertidumbre. Eso no significa que OBS haya dejado de transmitir.</p><button id="op-connection">Simular desconexión del panel</button></details>
    </div>
    <dialog class="op-dialog" id="op-confirm" aria-labelledby="op-confirm-title"><form method="dialog"><p class="eyebrow">KEUKEN / DEMOSTRACIÓN</p><h3 id="op-confirm-title"></h3><p id="op-confirm-copy"></p><label id="op-ready-wrap"><input id="op-ready" type="checkbox"> Revisé ambas cámaras y escuché el sonido.</label><div class="op-dialog-actions"><button value="cancel" class="op-secondary">Volver</button><button id="op-confirm-action" value="accept" class="op-primary"></button></div></form></dialog>
    <div class="op-explanation"><article><span>01 / UNA RUTINA BREVE</span><h3>Probar, transmitir, terminar.</h3><p>Primero una grabación corta para escuchar. Después, iniciar el vivo con el evento y su privacidad a la vista. La copia local acompaña al recital. Al terminar, confirmar el cierre y comprobar el archivo.</p></article><article><span>02 / CONTROLES CONCRETOS</span><h3>Dos tomas y una espera.</h3><p>Botones grandes para escenario, detalle y placa. Medidor de sonido y silencio visible. Las cámaras, el destino y la calidad quedan preparados en un área técnica separada.</p></article><article><span>03 / ESTADOS REALES</span><h3>Saber qué está pasando.</h3><p>Mostrar por separado conexión con OBS, emisión confirmada en YouTube y grabación local. Si falla algo, explicar qué revisar; recuperar el estado al reconectar sin iniciar otro vivo.</p></article></div>
    <div class="op-architecture" aria-label="Funcionamiento propuesto"><div><strong>Panel Keuken</strong><span>Lo que usa el operador</span></div><b aria-hidden="true">→</b><div><strong>OBS en la misma PC</strong><span>Cámaras + consola + grabación</span></div><b aria-hidden="true">→</b><div><strong>YouTube</strong><span>El recital para el público</span></div></div>
    <details class="technical"><summary>Qué hay que desarrollar para que funcione de verdad <span>+</span></summary><div class="op-technical"><p><strong>Control local.</strong> Un pequeño programa local comunica el panel con OBS mediante obs-websocket, integrado desde OBS 28. Limitar las acciones a cambiar toma, controlar el audio y gestionar emisión/grabación. Mantener la autenticación y el control en la computadora del salón.</p><p><strong>Conexión a YouTube.</strong> Dejar preparado el canal y el evento. Para un inicio y cierre completamente desde el panel, integrar la API de YouTube con autorización del titular. Enviar señal desde OBS no confirma por sí solo que el evento ya esté en vivo. La interfaz debe consultar el estado de YouTube antes de mostrar “En vivo”.</p><p><strong>Miniaturas y sonido.</strong> Leer de OBS la escena activa, niveles, grabación y transmisión. El protocolo permite obtener capturas para miniaturas; no transporta un video fluido de las cámaras. Elegir y medir la previsualización en la PC real sin abrir las webcams por segunda vez.</p><p><strong>Pruebas del recital.</strong> Doble clic, cámara desconectada, falta de espacio, caída de internet, pérdida del panel y reapertura con OBS ya transmitiendo. No confundir el cierre del panel con finalizar el vivo. Confirmar el cierre en YouTube y OBS antes de informar que terminó.</p></div><p class="op-sources"><a href="https://obsproject.com/kb/remote-control-guide" target="_blank" rel="noopener noreferrer">Control oficial de OBS ↗</a><a href="https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md" target="_blank" rel="noopener noreferrer">Funciones de obs-websocket ↗</a><a href="https://developers.google.com/youtube/v3/live/docs/liveBroadcasts/transition" target="_blank" rel="noopener noreferrer">Estados del vivo en YouTube ↗</a></p></details>
    <p class="op-scope"><strong>Alcance y presupuesto:</strong> esta maqueta permite decidir la experiencia. La conexión real, la configuración inicial y las pruebas son trabajo adicional todavía sin cotizar; no están sumadas a los tres presupuestos de equipamiento.</p>`;
  document.getElementById('plan').before(section);
  const $ = id => document.getElementById(id);
  const state = {scene:'general',phase:'idle',muted:false,connected:true,startedAt:0,dialog:null};
  const scenes = {general:{src:'assets/salon-publico.webp',alt:'Foto de referencia del escenario desde el público',caption:'CÁMARA 1 · Foto de referencia'},detail:{src:'assets/salon-show.webp',alt:'Foto de referencia de un músico en el escenario',caption:'CÁMARA 2 · Foto de referencia'},waiting:{caption:'PLACA DE ESPERA · Ejemplo'}};
  function render() {
    const running = ['live','rehearsal'].includes(state.phase);
    const disconnected = !state.connected;
    section.querySelectorAll('[data-op-scene]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.opScene===state.scene));button.disabled=disconnected;});
    const scene=scenes[state.scene];
    $('op-photo').hidden=state.scene==='waiting';$('op-wait-card').hidden=state.scene!=='waiting';
    if(scene.src){$('op-photo').src=scene.src;$('op-photo').alt=scene.alt;}
    $('op-image-caption').textContent=scene.caption;
    $('op-obs').textContent=disconnected?'Desconectado · demo':'Conectado · demo';
    $('op-youtube').textContent=disconnected?'Estado desconocido':state.phase==='live'?'En vivo · simulado':'Sin transmitir';
    $('op-record').textContent=disconnected?'Estado desconocido':running?'Grabando · simulado':'Sin grabar';
    $('op-phase').textContent=disconnected?'Revisar conexión':({idle:'Antes de empezar',rehearsal:'Prueba local · demo',live:'EN VIVO · DEMO',finished:'Demo finalizada'})[state.phase];
    $('op-phase').classList.toggle('op-is-live',state.phase==='live'&&!disconnected);
    $('op-rehearse').hidden=state.phase==='live';$('op-rehearse').disabled=disconnected;
    $('op-rehearse').textContent=state.phase==='rehearsal'?'Terminar prueba':'Probar grabación';
    $('op-start').hidden=state.phase==='live';$('op-start').disabled=disconnected||state.phase==='rehearsal';
    $('op-end').hidden=state.phase!=='live';$('op-end').disabled=disconnected;
    $('op-mute').disabled=disconnected;$('op-mute').setAttribute('aria-pressed',String(state.muted));
    $('op-mute').textContent=state.muted?'Activar sonido':'Silenciar sonido';
    $('op-audio-label').textContent=disconnected?'Estado desconocido':state.muted?'SILENCIADO':'Activo · ejemplo';
    $('op-meter-fill').style.width=state.muted||disconnected?'0%':'64%';
    $('op-connection').textContent=disconnected?'Reconectar la demostración':'Simular desconexión del panel';
    section.querySelector('.op-panel').classList.toggle('op-disconnected',disconnected);
    updateClock();
  }
  function updateClock(){const active=['live','rehearsal'].includes(state.phase);const seconds=active&&state.startedAt?Math.floor((Date.now()-state.startedAt)/1000):0;$('op-timer').textContent=!state.connected?'--:--':String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');}
  function message(text){$('op-message').textContent=text;}
  function openConfirm(kind){
    state.dialog=kind;$('op-ready').checked=false;$('op-ready-wrap').hidden=kind!=='start';
    $('op-confirm-title').textContent=kind==='start'?'¿Iniciar el vivo de ejemplo?':'¿Finalizar este recital de ejemplo?';
    $('op-confirm-copy').textContent=kind==='start'?'Destino de muestra: Keuken · Ensayo del recital · No listado. Se simularán el vivo y la copia local. No se envía imagen ni sonido.':'Se simulará el cierre de YouTube y de la grabación. En la versión real, el panel debe esperar la confirmación de ambos y comprobar el archivo.';
    $('op-confirm-action').textContent=kind==='start'?'Iniciar demostración':'Finalizar demostración';
    $('op-confirm-action').disabled=kind==='start';$('op-confirm').returnValue='';$('op-confirm').showModal();
  }
  section.querySelectorAll('[data-op-scene]').forEach(button=>button.addEventListener('click',()=>{if(!state.connected)return;state.scene=button.dataset.opScene;render();message(state.scene==='waiting'?'Placa de espera seleccionada. El audio conserva su estado; usá Silenciar sonido si querés cortarlo.':'Toma seleccionada en la maqueta. Las imágenes son fotos de referencia, no cámaras conectadas.');}));
  $('op-mute').addEventListener('click',()=>{if(!state.connected)return;state.muted=!state.muted;render();message(state.muted?'Sonido silenciado en esta demo. El botón permite volver a activarlo.':'Sonido activado en esta demo. Comprobar niveles no reemplaza escuchar con auriculares.');});
  $('op-rehearse').addEventListener('click',()=>{if(!state.connected)return;if(state.phase==='rehearsal'){state.phase='idle';message('Prueba terminada. En la aplicación real, este paso permite abrir y escuchar la grabación. La maqueta no creó un archivo.');}else{state.phase='rehearsal';state.startedAt=Date.now();message('Prueba local simulada. No sale a YouTube. Terminá la prueba y escuchá el archivo antes del vivo real.');}render();});
  $('op-start').addEventListener('click',()=>{if(state.connected&&state.phase!=='rehearsal')openConfirm('start');});
  $('op-end').addEventListener('click',()=>{if(state.connected&&state.phase==='live')openConfirm('end');});
  $('op-ready').addEventListener('change',()=>{$('op-confirm-action').disabled=!$('op-ready').checked;});
  $('op-confirm').addEventListener('close',()=>{
    if($('op-confirm').returnValue!=='accept'||!state.connected)return;
    if(state.dialog==='start'&&$('op-ready').checked){state.phase='live';state.startedAt=Date.now();message('Vivo y grabación simulados. Cambiá entre las dos tomas o usá la placa de espera.');}
    else if(state.dialog==='end'){state.phase='finished';message('Demostración finalizada. No se transmitió ni se guardó ningún archivo.');}
    render();state.dialog=null;
  });
  $('op-connection').addEventListener('click',()=>{state.connected=!state.connected;render();message(state.connected?'Control recuperado en la demo. Se conserva el estado anterior; no se inicia otra transmisión.':'Se perdió el control. Vivo y grabación: estado desconocido. Pueden seguir activos en OBS. Revisar la conexión del panel y no cerrar OBS.');});
  render();setInterval(updateClock,1000);
})();
