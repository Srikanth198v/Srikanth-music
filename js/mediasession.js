// Lock-screen/notification metadata and transport controls.
(() => {
  function update(track, controls) {
    if (!('mediaSession' in navigator) || !track) return;
    try {
      navigator.mediaSession.metadata=new MediaMetadata({title:track.title,artist:track.channel,album:'Srikanth Music',artwork:[{src:track.art,sizes:'512x512',type:'image/jpeg'}]});
      const actions={play:controls.play,pause:controls.pause,previoustrack:controls.previous,nexttrack:controls.next,seekto:details=>controls.seek(details.seekTime)};
      for (const [name,handler] of Object.entries(actions)) { try { navigator.mediaSession.setActionHandler(name,handler); } catch {} }
    } catch {}
  }
  window.GlassMedia={update};
})();
