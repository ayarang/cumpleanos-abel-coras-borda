/**
 * «Linda Rosita» · Chinito del Ande
 * Video publicado por Radio Picaflor: https://www.youtube.com/watch?v=d2_XXIqX1No
 * No se descargan ni se alojan grabaciones de terceros en GitHub.
 */
export function initMusic({button,dialog,slot,closeButton}) {
  if(!button||!dialog||!slot||!closeButton)return;
  const videoId='d2_XXIqX1No';
  const url='https://www.youtube.com/watch?v='+videoId;
  let lastFocus=null;
  function close(){if(dialog.open)dialog.close();}
  function stop(){
    slot.replaceChildren(); // descargar iframe detiene la reproducción
    if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});
  }
  function open(){
    lastFocus=document.activeElement;
    if(typeof dialog.showModal!=='function'){
      window.open(url,'_blank','noopener,noreferrer');return;
    }
    dialog.showModal();
    const frame=document.createElement('iframe');
    frame.title='Linda Rosita - Chinito del Ande (Radio Picaflor)';
    frame.src='https://www.youtube-nocookie.com/embed/'+videoId+'?autoplay=1&playsinline=1&rel=0';
    frame.allow='autoplay; encrypted-media; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.loading='eager';
    frame.referrerPolicy='strict-origin-when-cross-origin';
    slot.replaceChildren(frame);
    closeButton.focus({preventScroll:true});
  }
  button.addEventListener('click',open);
  closeButton.addEventListener('click',close);
  dialog.addEventListener('close',stop);
  dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
}
