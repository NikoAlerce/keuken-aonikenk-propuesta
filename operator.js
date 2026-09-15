(() => {
  const section = document.createElement('section');
  section.id = 'operacion';
  section.className = 'section operator-section';
  section.innerHTML = `
    <p class="eyebrow">03 / DURANTE EL RECITAL</p>
    <div class="section-heading"><h2>Toda la atención<br>en el show.</h2><p>Proponemos un panel con las funciones de cada noche: cambiar de cámara, revisar el sonido, iniciar el vivo y terminar. OBS, el programa que une imagen y audio, queda configurado detrás.</p></div>
    <div class="op-demo-label"><strong>PROBÁ EL PANEL</strong><span>Demostración con fotos y estados simulados. No transmite ni graba.</span></div>
    <div class="op-panel">
      <div class="op-top"><div><span class="op-brand">KEUKEN · EN VIVO</span><p>Ensayo del recital <span class="op-privacy">No listado · ejemplo</span></p></div><span id="op-phase" class="op-phase">Antes de empezar</span></div>
      <div class="op-status" aria-label="Estados simulados"><div><span>Control de OBS</span><strong id="op-obs">Conectado · demo</strong></div><div><span>YouTube</span><strong id="op-youtube">Sin transmitir</strong></div><div><span>Copia en la PC</span><strong id="op-record">Sin grabar</strong></div></div>
      <div class="op-workspace"><div class="op-picture"><img id="op-photo" src="assets/salon-publico.webp" alt="Foto de referencia del escenario desde el público"><div id="op-wait-card" class="op-wait-card" hidden><span>KEUKEN AONIKENK</span><strong>Enseguida<br>volvemos.</strong><small>La música nos encuentra.</small></div><span class="op-image-caption" id="op-image-caption">CÁMARA 1 · Foto de referencia</span><span class="op-timer" id="op-timer">00:00</span></div>
      <div class="op-choices"><p class="op-control-heading">Elegí qué mostrar</p><button data-op-scene="general" aria-pressed="true"><span class="op-scene-number">1</span><span><strong>Escenario</strong><small>Cámara principal</small></span><span class="op-selected" aria-hidden="true">✓</span></button><button data-op-scene="detail" aria-pressed="false"><span class="op-scene-number">2</span><span><strong>De cerca</strong><small>Segunda cámara</small></span><span class="op-selected" aria-hidden="true">✓</span></button><button data-op-scene="waiting" aria-pressed="false"><span class="op-scene-number">Ⅱ</span><span><strong>Placa de espera</strong><small>El audio sigue sonando</small></span><span class="op-selected" aria-hidden="true">✓</span></button><div class="op-sound"><div><span>Sonido de la consola</span><strong id="op-audio-label">Activo · ejemplo</strong></div><div class="op-meter" aria-hidden="true"><span id="op-meter-fill"></span></div><button id="op-mute" aria-pressed="false">Silenciar sonido</button></div></div></div>
      <div class="op-actions"><button class="op-secondary" id="op-rehearse">Probar grabación</button><button class="op-primary" id="op-start">Iniciar vivo</button><button class="op-end" id="op-end" hidden>Finalizar recital</button></div>
      <p id="op-message" class="op-message" role="status">Elegí una toma o iniciá un ensayo de la operación.</p>

    </div>
    <dialog class="op-dialog" id="op-confirm" aria-labelledby="op-confirm-title"><form method="dialog"><p class="eyebrow">KEUKEN / DEMOSTRACIÓN</p><h3 id="op-confirm-title"></h3><p id="op-confirm-copy"></p><label id="op-ready-wrap"><input id="op-ready" type="checkbox"> Revisé ambas cámaras y escuché el sonido.</label><div class="op-dialog-actions"><button value="cancel" class="op-secondary">Volver</button><button id="op-confirm-action" value="accept" class="op-primary"></button></div></form></dialog>
    <div class="op-routine" aria-label="Rutina del recital"><span><b>Antes</b> Probar imagen y sonido</span><span><b>Durante</b> Alternar las dos tomas</span><span><b>Al terminar</b> Cerrar y guardar el recital</span></div>
    <p class="op-scope"><strong>Desarrollo propuesto.</strong> La conexión del panel con OBS y YouTube, su configuración y la capacitación se cotizan aparte del equipo.</p>
    <details class="technical"><summary>Cómo se integra el panel <span>+</span></summary><div class="op-architecture" aria-label="Funcionamiento propuesto"><div><strong>Panel Keuken</strong><span>Controles del operador</span></div><b aria-hidden="true">→</b><div><strong>OBS en la PC</strong><span>Imagen, sonido y copia local</span></div><b aria-hidden="true">→</b><div><strong>YouTube</strong><span>El recital para el público</span></div></div><p>El técnico prepara las cámaras y el audio. El panel controla OBS desde la misma computadora y consulta el estado de la emisión en YouTube. La puesta en marcha incluye un ensayo con el operador y una prueba de recuperación ante fallas de conexión.</p><div class="source-links"><a href="https://obsproject.com/kb/remote-control-guide" target="_blank" rel="noopener noreferrer">Control de OBS ↗</a><a href="https://developers.google.com/youtube/v3/live/docs/liveBroadcasts/transition" target="_blank" rel="noopener noreferrer">Integración con YouTube ↗</a></div><div class="op-recovery"><p>Ejemplo de aviso ante una interrupción del control:</p><button id="op-connection">Simular pérdida de conexión</button></div></details>`;
  document.getElementById('equipo').before(section);
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
    $('op-connection').textContent=disconnected?'Reconectar la demostración':'Simular pérdida de conexión';
    section.querySelector('.op-panel').classList.toggle('op-disconnected',disconnected);
    updateClock();
  }
  function updateClock(){const active=['live','rehearsal'].includes(state.phase);const seconds=active&&state.startedAt?Math.floor((Date.now()-state.startedAt)/1000):0;$('op-timer').textContent=!state.connected?'--:--':String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');}
  function message(text){$('op-message').textContent=text;}
  function openConfirm(kind){
    state.dialog=kind;$('op-ready').checked=false;$('op-ready-wrap').hidden=kind!=='start';
    $('op-confirm-title').textContent=kind==='start'?'¿Iniciar el vivo?':'¿Finalizar el recital?';
    $('op-confirm-copy').textContent=kind==='start'?'Keuken · Ensayo del recital · No listado. Esta demostración simula la transmisión y la grabación.':'Terminar la transmisión y la grabación de ejemplo.';
    $('op-confirm-action').textContent=kind==='start'?'Iniciar demostración':'Finalizar demostración';
    $('op-confirm-action').disabled=kind==='start';$('op-confirm').returnValue='';$('op-confirm').showModal();
  }
  section.querySelectorAll('[data-op-scene]').forEach(button=>button.addEventListener('click',()=>{if(!state.connected)return;state.scene=button.dataset.opScene;render();message(state.scene==='waiting'?'Placa de espera seleccionada. El audio mantiene su estado.':'Toma seleccionada.');}));
  $('op-mute').addEventListener('click',()=>{if(!state.connected)return;state.muted=!state.muted;render();message(state.muted?'Sonido silenciado · demo.':'Sonido activo · demo.');});
  $('op-rehearse').addEventListener('click',()=>{if(!state.connected)return;if(state.phase==='rehearsal'){state.phase='idle';message('Ensayo finalizado. Podés iniciar el vivo de ejemplo.');}else{state.phase='rehearsal';state.startedAt=Date.now();message('Ensayo en curso · simulación de grabación local.');}render();});
  $('op-start').addEventListener('click',()=>{if(state.connected&&state.phase!=='rehearsal')openConfirm('start');});
  $('op-end').addEventListener('click',()=>{if(state.connected&&state.phase==='live')openConfirm('end');});
  $('op-ready').addEventListener('change',()=>{$('op-confirm-action').disabled=!$('op-ready').checked;});
  $('op-confirm').addEventListener('close',()=>{
    if($('op-confirm').returnValue!=='accept'||!state.connected)return;
    if(state.dialog==='start'&&$('op-ready').checked){state.phase='live';state.startedAt=Date.now();message('Vivo de ejemplo en curso. Podés alternar las tomas.');}
    else if(state.dialog==='end'){state.phase='finished';message('Demostración finalizada.');}
    render();state.dialog=null;
  });
  $('op-connection').addEventListener('click',()=>{state.connected=!state.connected;render();message(state.connected?'Control recuperado. La demostración continúa en el estado anterior.':'Conexión interrumpida. La emisión y la grabación pueden seguir activas en OBS; revisar el control antes de continuar.');});
  render();setInterval(updateClock,1000);
})();
