// Thin wrapper around YouTube's official IFrame Player API.
(() => {
  let player=null, ready=false, callbacks={};
  const requestWakeLock=async()=>{try{if('wakeLock' in navigator&&!document.hidden)window.GlassWakeLock=await navigator.wakeLock.request('screen');}catch{}};
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')requestWakeLock();});
  function init(onState, onError) {
    callbacks={onState,onError};
    if (player || !window.YT?.Player) return;
    player=new YT.Player('playerHost',{height:'200',width:'200',videoId:'',playerVars:{autoplay:0,controls:0,playsinline:1,rel:0},events:{
      onReady:()=>{ready=true; callbacks.onReady?.();},
      onStateChange:event=>callbacks.onState?.(event.data),
      onError:event=>callbacks.onError?.(event.data)
    }});
  }
  window.onYouTubeIframeAPIReady=()=>init(callbacks.onState,callbacks.onError);
  const script=document.createElement('script'); script.src='https://www.youtube.com/iframe_api'; script.async=true; document.head.appendChild(script);
  window.GlassPlayer={init,get ready(){return ready;},get instance(){return player;},get wakeLock(){return window.GlassWakeLock||null;},load(id){if(!ready)throw new Error('YouTube player is still loading');requestWakeLock();player.loadVideoById(id);},play(){requestWakeLock();player?.playVideo();},pause(){player?.pauseVideo();},seek(seconds){player?.seekTo(seconds,true);},volume(value){player?.setVolume(value);},mute(){if(!player)return;player.isMuted()?player.unMute():player.mute();},state(){return player?.getPlayerState?.()??-1;},current(){return player?.getCurrentTime?.()||0;},duration(){return player?.getDuration?.()||0;}};
})();
