/**
 * «Noche de Fiesta» · Chinito del Ande
 * Reproductor oficial: https://www.youtube.com/watch?v=YjX3wrPapJ0
 * No se descargan ni se alojan grabaciones de terceros en GitHub.
 */
export function initMusic({button,dialog,slot,closeButton}) {
  if(!button||!dialog||!slot||!closeButton)return;
  const videoId='YjX3wrPapJ0';
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
    frame.title='Noche de Fiesta - Chinito del Ande (video oficial)';
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
