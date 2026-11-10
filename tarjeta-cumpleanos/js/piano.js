/**
 * Melodía ORIGINAL de piano sintetizado con Web Audio.
 * Sin pistas de terceros, licencias ni descargas.
 * El sonido solo intenta iniciarse desde un gesto real (Abrir álbum / botón flotante).
 */
export function initPiano({button, label, status}){
  const AudioCtor=window.AudioContext||window.webkitAudioContext;
  let ctx=null,master=null,timer=null,nextAt=0,step=0,enabled=false;
  const bpm=82,beat=60/bpm;
  const chords=[
    {bass:48,notes:[60,64,67,72]}, // C
    {bass:45,notes:[57,60,64,69]}, // Am
    {bass:41,notes:[53,57,60,65]}, // F
    {bass:43,notes:[55,59,62,67]}, // G
    {bass:48,notes:[60,64,67,76]}, // C
    {bass:45,notes:[57,60,64,72]}, // Am
    {bass:41,notes:[53,57,60,69]}, // F
    {bass:43,notes:[55,59,62,71]}  // G
  ];
  const hz=n=>440*Math.pow(2,(n-69)/12);
  function ui(){
    button?.setAttribute('aria-pressed',String(enabled));
    button?.setAttribute('aria-label',enabled?'Pausar música de piano':'Activar música de piano');
    if(button)button.title=enabled?'Pausar piano':'Reproducir piano';
    if(label)label.textContent=enabled?'Piano de fondo':'Piano suave';
    if(status)status.textContent=enabled?'Ⅱ':'▶';
    button?.classList.toggle('is-playing',enabled);
  }
  function setup(){
    if(!AudioCtor)return false;
    if(ctx)return true;
    ctx=new AudioCtor();
    master=ctx.createGain();
    master.gain.value=.23; // Volumen discreto, por debajo de conversación.
    const limiter=ctx.createDynamicsCompressor();
    limiter.threshold.value=-23;
    limiter.knee.value=20;
    limiter.ratio.value=5;
    master.connect(limiter);
    limiter.connect(ctx.destination);
    return true;
  }
  function note(midi,time,duration,velocity=.55){
    if(!ctx||!master)return;
    const freq=hz(midi);
    // Armónicos con decaimiento independiente: timbre similar a un piano suave.
    for(const [partial,weight] of [[1,1],[2,.28],[3,.10]]){
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      osc.type='sine';
      osc.frequency.setValueAtTime(freq*partial,time);
      const peak=Math.max(.0002,velocity*.17*weight);
      gain.gain.setValueAtTime(.0001,time);
      gain.gain.exponentialRampToValueAtTime(peak,time+.012);
      gain.gain.exponentialRampToValueAtTime(.0001,time+duration*(partial===1?1:.74));
      osc.connect(gain);gain.connect(master);
      osc.start(time);osc.stop(time+duration+.025);
      osc.onended=()=>{osc.disconnect();gain.disconnect()};
    }
  }
  function schedule(t,index){
    const bar=chords[Math.floor(index/4)%chords.length];
    const pos=index%4;
    note(bar.notes[pos],t,beat*.95,pos===0?.45:.29);
    if(pos===0)note(bar.bass,t,beat*2.65,.28);
  }
  function tick(){
    if(!enabled||!ctx)return;
    while(nextAt<ctx.currentTime+.32){
      schedule(nextAt,step);
      step=(step+1)%32;
      nextAt+=beat;
    }
  }
  async function start(){
    if(enabled)return true;
    try{
      if(!setup())return false;
      // resume se solicita en el manejador del gesto, antes de cualquier temporizador.
      await ctx.resume();
      if(ctx.state!=='running')return false;
      enabled=true;
      step=0;nextAt=ctx.currentTime+.045;
      tick();
      timer=setInterval(tick,120);
      ui();return true;
    }catch(e){console.info('El navegador requiere activar la música manualmente.',e);ui();return false}
  }
  function pause(){
    enabled=false;
    clearInterval(timer);timer=null;
    // Suspender silencia también todas las notas que aún estén decayendo.
    if(ctx&&ctx.state==='running')void ctx.suspend().catch(()=>{});
    ui();
  }
  button?.addEventListener('click',()=>{
    if(enabled)pause();
    else void start();
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&enabled)pause();
  });
  ui();
  return {start,pause,isPlaying:()=>enabled};
}
