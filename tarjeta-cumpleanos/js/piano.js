/**
 * Un camino por delante — melodía ORIGINAL de piano suave.
 * Composición propia en Re mayor: arpegios espaciados y ocho frases melódicas.
 * Síntesis Web Audio sin archivos externos. Inicia solo con un gesto real.
 */
export function initPiano({button}){
  const Context=window.AudioContext||window.webkitAudioContext;
  let ctx=null,master=null,timer=null,active=false,nextTime=0,step=0;
  const bpm=76,eighth=60/bpm/2;
  const harmony=[
    {bass:50,arp:[62,66,69,74]}, // Re
    {bass:47,arp:[59,62,66,71]}, // Si menor
    {bass:43,arp:[55,59,62,67]}, // Sol
    {bass:45,arp:[57,61,64,69]}, // La
    {bass:50,arp:[62,66,69,74]},
    {bass:47,arp:[59,62,66,71]},
    {bass:43,arp:[55,59,62,67]},
    {bass:45,arp:[57,61,64,69]}
  ];
  const melody=[
    [74,null,76,null,78,76,null,74],
    [71,null,69,null,71,74,null,null],
    [74,null,71,null,69,71,null,74],
    [73,null,71,null,69,66,null,null],
    [74,null,76,null,78,81,null,78],
    [76,null,74,null,71,69,null,71],
    [74,null,71,null,69,67,null,69],
    [73,null,71,null,69,66,null,74]
  ];
  const hz=midi=>440*Math.pow(2,(midi-69)/12);
  function render(){
    button?.setAttribute('aria-pressed',String(active));
    button?.setAttribute('aria-label',active?'Pausar la melodía Un camino por delante':'Reproducir la melodía Un camino por delante');
    if(button)button.title=active?'Pausar piano':'Un camino por delante · piano suave';
    button?.classList.toggle('is-playing',active);
  }
  function setup(){
    if(!Context)return false;
    if(ctx)return true;
    ctx=new Context();
    master=ctx.createGain();
    master.gain.value=.20;
    const limiter=ctx.createDynamicsCompressor();
    limiter.threshold.value=-24;limiter.knee.value=18;limiter.ratio.value=4;
    master.connect(limiter);limiter.connect(ctx.destination);
    return true;
  }
  function play(midi,at,length,velocity=.3){
    if(!ctx||!master)return;
    const frequency=hz(midi);
    for(const [multiple,mix] of [[1,1],[2,.13]]){
      const osc=ctx.createOscillator(),gain=ctx.createGain();
      osc.type='sine';
      osc.frequency.setValueAtTime(frequency*multiple,at);
      const peak=Math.max(.0003,velocity*.17*mix);
      const end=at+Math.max(.08,length*(multiple===1?1:.65));
      gain.gain.setValueAtTime(.0001,at);
      gain.gain.exponentialRampToValueAtTime(peak,at+.012);
      gain.gain.exponentialRampToValueAtTime(.0001,end);
      osc.connect(gain);gain.connect(master);
      osc.start(at);osc.stop(end+.025);
      osc.onended=()=>{osc.disconnect();gain.disconnect()};
    }
  }
  function schedule(at,index){
    const barIndex=Math.floor(index/8)%harmony.length,pos=index%8;
    const chord=harmony[barIndex];
    if(pos===0)play(chord.bass,at,eighth*5,.34);
    if(pos===4)play(chord.bass+12,at,eighth*2,.19);
    if(pos%2===0)play(chord.arp[(pos/2)%4],at,eighth*1.65,pos===0?.22:.16);
    const voice=melody[barIndex][pos];
    if(voice!=null)play(voice,at,eighth*(pos>=5?1.4:1.9),.29);
  }
  function tick(){
    if(!active||!ctx)return;
    while(nextTime<ctx.currentTime+.23){
      schedule(nextTime,step);
      step=(step+1)%64;
      nextTime+=eighth;
    }
  }
  async function start(){
    if(active)return true;
    try{
      if(!setup())return false;
      await ctx.resume();
      if(ctx.state!=='running')return false;
      active=true;step=0;nextTime=ctx.currentTime+.035;
      tick();timer=setInterval(tick,125);
      render();return true;
    }catch(error){
      console.info('El navegador requiere activar manualmente el piano.',error);
      render();return false;
    }
  }
  function pause(){
    active=false;clearInterval(timer);timer=null;
    if(ctx?.state==='running')void ctx.suspend().catch(()=>{});
    render();
  }
  button?.addEventListener('click',()=>active?pause():void start());
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&active)pause()});
  render();
  return {start,pause,isPlaying:()=>active};
}
