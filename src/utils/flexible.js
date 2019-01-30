export function resetFontsize() {
  const el = document.documentElement;
  const clientWidth = el.clientWidth;

  el.style['font-size'] = clientWidth / 10 + 'px';
}

resetFontsize();
window.addEventListener('resize', resetFontsize);
