/**
 * Fecha central: 11/11/2026 en Lima, Perú (UTC-05:00).
 * Se usan instantes UTC para que la fecha sea correcta fuera de Perú.
 */
const START=Date.UTC(2026,10,11,5);
const END=Date.UTC(2026,10,12,5);
export function initBirthday() {
  const el=document.getElementById('birthday-countdown');
  if(!el)return;
  function update(){
    const now=Date.now();
    document.body.classList.toggle('abel-birthday',now>=START&&now<END);
    if(now<START){
      const seconds=Math.ceil((START-now)/1000);
      const days=Math.floor(seconds/86400);
      const hours=Math.floor(seconds%86400/3600);
      const mins=Math.floor(seconds%3600/60);
      if(days>=2)el.textContent='FALTAN '+days+' DÍAS PARA EL 11 DE NOVIEMBRE';
      else if(days===1)el.textContent='MAÑANA ES EL DÍA · FALTAN '+hours+' H';
      else el.textContent='FALTAN '+String(hours).padStart(2,'0')+' H · '+String(mins).padStart(2,'0')+' MIN PARA SU DÍA';
    } else if(now<END){
      el.textContent='HOY ES EL GRAN DÍA · 11 DE NOVIEMBRE 🏍️';
    } else {
      el.textContent='11 DE NOVIEMBRE DE 2026';
    }
  }
  update();
  const timer=setInterval(()=>{
    update();
    if(Date.now()>=END)clearInterval(timer);
  },1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
}
