function reload() {
  const reloadUrl = new URL('/reload.html', window.location.origin);
  reloadUrl.search = new URLSearchParams([
    ['reload', window.location.href],
  ]).toString();
  window.location.href = reloadUrl.toString();
}

export { reload as default };
