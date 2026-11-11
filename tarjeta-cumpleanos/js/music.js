/**
 * Linda Rosita (Chinito del Ande) · YouTube de Radio Picaflor.
 * Se reproduce desde ~00:24 (punto aproximado de entrada vocal).
 * No se descarga ni modifica audio: se usa el iframe original visible,
 * con controles, de YouTube, creado tras el clic en «Abrir mi regalo».
 * Algunos navegadores restringen el autoplay con sonido aun tras un clic.
 */
export function initMusic({button,panel,slot,closeButton}){
  if(!button||!panel||!slot||!closeButton)return {openOnGift(){}};
  const videoId='d2_XXIqX1No';
  const chorusStart=24; // aproximado; por confirmar al escuchar el video
  let giftOpened=false;

  function show(){
    panel.hidden=false;
    button.hidden=true;
    button.setAttribute('aria-expanded','true');
    // Los controles y el video original siempre son visibles.
    const iframe=document.createElement('iframe');
    iframe.title='Linda Rosita - Chinito del Ande (Radio Picaflor)';
    iframe.src='https://www.youtube-nocookie.com/embed/'+videoId+
      '?start='+chorusStart+'&autoplay=1&playsinline=1&controls=1&rel=0';
    iframe.allow='autoplay; encrypted-media; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    iframe.loading='eager';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    slot.replaceChildren(iframe);
  }
  function stop(){
    // Quitar el iframe también detiene el sonido.
    slot.replaceChildren();
    panel.hidden=true;
    button.hidden=false;
    button.setAttribute('aria-expanded','false');
  }
  button.addEventListener('click',show);
  closeButton.addEventListener('click',stop);
  return {
    openOnGift(){
      if(giftOpened)return;
      giftOpened=true;
      show();
    }
  };
}
