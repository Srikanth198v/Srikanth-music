// Queue navigation, shuffle and repeat state.
(() => {
  const state = {items:[], current:null, shuffle:false, repeat:0};
  const add = track => { if (!state.items.some(item => item.id===track.id)) state.items.push(track); };
  const set = tracks => { state.items=[...tracks]; };
  const takeNext = () => { if (!state.items.length) return state.repeat===1 ? state.current : null; const index=state.shuffle ? Math.floor(Math.random()*state.items.length) : 0; return state.items.splice(index,1)[0]; };
  const previousFrom = recent => recent.length>1 ? recent[1] : null;
  window.GlassQueue = {state, add, set, takeNext, previousFrom};
})();
