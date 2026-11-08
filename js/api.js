// YouTube search and no-key URL metadata helpers.
(() => {
  const parseVideoId = value => {
    const text = String(value || '').trim();
    const match = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/i);
    return match ? match[1] : (/^[\w-]{11}$/.test(text) ? text : '');
  };
  const thumbnail = id => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
  async function fromLink(value) {
    const id = parseVideoId(value);
    if (!id) return null;
    try {
      const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('oEmbed unavailable');
      const data = await response.json();
      if (data.title) return {id, title:data.title, channel:data.author_name || 'YouTube', art:data.thumbnail_url || thumbnail(id)};
      // YouTube sometimes omits JSON title fields and only returns an iframe snippet.
      const title = data.html ? new DOMParser().parseFromString(data.html, 'text/html').querySelector('iframe')?.title : '';
      return {id, title:title || 'YouTube video', channel:data.author_name || 'YouTube', art:data.thumbnail_url || thumbnail(id)};
    } catch {
      return {id, title:'YouTube video', channel:'Metadata unavailable', art:thumbnail(id)};
    }
  }
  async function search(query, key) {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.search = new URLSearchParams({part:'snippet', type:'video', videoCategoryId:'10', maxResults:'12', q:query, key});
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Search failed');
    return (data.items || []).filter(item => item.id?.videoId).map(item => ({
      id:item.id.videoId, title:item.snippet.title, channel:item.snippet.channelTitle,
      art:item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || thumbnail(item.id.videoId)
    }));
  }
  window.GlassAPI = {parseVideoId, fromLink, search};
})();
