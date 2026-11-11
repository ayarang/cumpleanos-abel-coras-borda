/**
 * «Linda Rosita» — Chinito del Ande (YouTube / Radio Picaflor).
 * El VIDEO FLOTANTE aparece en el mismo clic de «Abrir mi regalo».
 * El enlace permanece en YouTube: no se descarga ni se aloja la canción.
 * El video se repite con loop=1 y playlist=el mismo video (YouTube).
 * Los navegadores pueden bloquear autoplay de audio: se dejan controles
 * visibles por si el visitante necesita pulsar Play dentro del video.
 */
export function initMusic({button,panel,slot,closeButton}){
  const videoId='d2_XXIqX1No';
  const chorusStart=24; // punto aproximado, pendiente de confirmar
  const disabled={openOnGift(){}};
  if(!button||!panel||!slot||!closeButton)return disabled;

  let giftWasOpened=false;

  function showFloatingVideo(){
    // Primero se presenta la ventana en una esquina. No se abre dialog.
    panel.hidden=false;
    button.hidden=true;
    button.setAttribute('aria-expanded','true');

    // Se crea el reproductor en respuesta directa al gesto del regalo.
    // autoplay=1 intenta empezar la canción; mute=0 solicita sonido,
    // aunque la decisión final siempre pertenece al navegador.
    if(slot.querySelector('iframe'))return;
    const frame=document.createElement('iframe');
    frame.title='Linda Rosita - Chinito del Ande (Radio Picaflor)';
    frame.src='https://www.youtube-nocookie.com/embed/'+videoId+
      '?start='+chorusStart+'&autoplay=1&mute=0&playsinline=1&controls=1&rel=0&loop=1&playlist='+videoId;
    frame.allow='autoplay; encrypted-media; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.loading='eager';
    frame.referrerPolicy='strict-origin-when-cross-origin';
    slot.append(frame);
  }

  function hideFloatingVideo(){
    // Desmontar el iframe también detiene la canción inmediatamente.
    slot.replaceChildren();
    panel.hidden=true;
    // Solamente después de cerrar aparece el icono de recuperación.
    button.hidden=false;
    button.setAttribute('aria-expanded','false');
  }

  button.addEventListener('click',showFloatingVideo);
  closeButton.addEventListener('click',hideFloatingVideo);

  return {
    openOnGift(){
      if(giftWasOpened)return;
      giftWasOpened=true;
      showFloatingVideo();
    }
  };
}
