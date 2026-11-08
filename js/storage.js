// Local preferences and listening history.
(() => {
  const keys = {api:'glassfm_api_key', recent:'glassfm_recent', favorites:'glassfm_favorites', volume:'glassfm_volume'};
  const read = key => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const addRecent = track => write(keys.recent, [track, ...read(keys.recent).filter(item => item.id !== track.id)].slice(0, 30));
  const toggleFavorite = track => { const current=read(keys.favorites), exists=current.some(item => item.id===track.id); write(keys.favorites, exists ? current.filter(item => item.id!==track.id) : [track,...current]); return !exists; };
  window.GlassStorage = {keys, read, write, addRecent, toggleFavorite};
})();
