/**
 * Torta interactiva: tocar para apagar, tocar de nuevo para encender.
 * No pide permisos de micrófono; funciona también en móviles y con teclado.
 */
export function initCake({button,scene,result,onWish}){
  if(!button||!scene||!result)return;
  const label=document.getElementById('blow-label');
  let blown=false;
  function render(){
    scene.classList.toggle('candles-out',blown);
    button.setAttribute('aria-pressed',String(blown));
    button.setAttribute('aria-label',blown?'Volver a encender las velas':'Soplar las velas de Abel');
    if(label)label.textContent=blown?'Encender las velas':'Soplar las velas';
    result.hidden=!blown;
  }
  button.addEventListener('click',()=>{
    blown=!blown;
    render();
    if(blown)onWish?.();
  });
  render();
}
