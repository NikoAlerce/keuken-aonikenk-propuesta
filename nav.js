(() => {
  document.documentElement.classList.add('js');
  const header = document.querySelector('.site-header, .header');
  const toggle = header && header.querySelector('.nav-toggle');
  const nav = header && header.querySelector('nav');
  if (!toggle || !nav) return;
  const setOpen = open => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Cerrar' : 'Menú';
  };
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
})();
