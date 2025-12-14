(() => {
  const qs = new URLSearchParams(location.search);
  const id = (qs.get('id') || '').trim();
  const src = (qs.get('src') || '').trim();

  const embedWrap = document.getElementById('embedWrap');
  const mp4Wrap = document.getElementById('mp4Wrap');
  const emptyState = document.getElementById('emptyState');
  const frame = document.getElementById('videyFrame');
  const video = document.getElementById('mp4Video');
  const openSourceBtn = document.getElementById('openSourceBtn');

  const show = (el) => el && el.classList.remove('hidden');
  const hide = (el) => el && el.classList.add('hidden');

  const setOpenSource = (url) => {
    if (!url) { hide(openSourceBtn); return; }
    openSourceBtn.href = url;
    show(openSourceBtn);
  };

  const safeHttpUrl = (u) => {
    try {
      const url = new URL(u);
      if (url.protocol === 'http:' || url.protocol === 'https:') return url.toString();
    } catch (e) {}
    return null;
  };

  // Prefer videy id if both provided
  if (id) {
    const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const videyUrl = `https://videy.co/v/?id=${encodeURIComponent(cleanId)}`;
    frame.src = videyUrl;
    show(embedWrap);
    hide(mp4Wrap);
    hide(emptyState);
    setOpenSource(videyUrl);
    return;
  }

  if (src) {
    const safe = safeHttpUrl(src);
    if (!safe) return; // keep empty state
    // Load mp4 direct
    video.innerHTML = '';
    const s = document.createElement('source');
    s.src = safe;
    s.type = 'video/mp4';
    video.appendChild(s);
    video.load();

    show(mp4Wrap);
    hide(embedWrap);
    hide(emptyState);
    setOpenSource(safe);
    return;
  }

  // no params
  hide(embedWrap);
  hide(mp4Wrap);
  show(emptyState);
  hide(openSourceBtn);
})();
