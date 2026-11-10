/**
 * Torta interactiva: tocar para apagar, tocar de nuevo para encender.
 * No pide permisos de micrófono; funciona también en móviles y con teclado.
 */
export function initCake({button,scene,result,onWish}){
  if(!button||!scene||!result)return;
  const label=document.getElementById('blow-label');
  const instruction=document.getElementById('wish-instruction');
  let blown=false;
  function render(){
    scene.classList.toggle('candles-out',blown);
    for(const el of [button,scene]){
      el.setAttribute('aria-pressed',String(blown));
      el.setAttribute('aria-label',blown?'Volver a encender las velas':'Soplar las velas de Abel');
    }
    if(label)label.textContent=blown?'Encender velas':'Soplar las velas';
    if(instruction)instruction.textContent=blown?'Un deseo más para el camino.':'Toca la torta o sopla las velas para pedir un deseo.';
    result.hidden=!blown;
  }
  function toggle(){
    blown=!blown;
    render();
    if(blown)onWish?.();
  }
  button.addEventListener('click',toggle);
  scene.addEventListener('click',toggle);
  scene.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();toggle();
    }
  });
  render();
}
