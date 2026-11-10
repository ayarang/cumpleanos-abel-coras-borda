/**
 * Interacciones principales del álbum de Abel Coras Borda.
 * Fecha, efectos y estilos están separados en módulos.
 */
import {initConfetti} from './confetti.js';
import {initPiano} from './piano.js';
import {initCake} from './cake.js';

const $=id=>document.getElementById(id);
const cover=$('cover');
const album=$('album');
const {burst}=initConfetti($('burst'));

const piano=initPiano({button:$('piano-toggle')});
initCake({
  button:$('blow-candles'),
  scene:$('cake-scene'),
  result:$('wish-result'),
  onWish:()=>{
    const rect=$('cake-scene').getBoundingClientRect();
    burst({x:rect.left+rect.width/2,y:Math.max(20,rect.top+rect.height*.25),count:38});
  }
});

// Respuesta inmediata al toque: sin temporizadores ni repintados forzados.
let opened=false;
function showAlbum(){
  if(opened)return;
  opened=true;
  cover.hidden=true;
  album.hidden=false;
  album.classList.add('is-revealed');
  window.scrollTo(0,0);
  $('piano-toggle').hidden=false;
  $('album-title').focus({preventScroll:true});
  // El piano se inicia desde la misma interacción; si el navegador bloquea
  // el sonido, el control flotante permite activarlo manualmente.
  void piano.start();
  requestAnimationFrame(()=>burst());
}
$('open-album').addEventListener('click',showAlbum);

// El detalle 11:11 es discreto: no crea otra sección.
const secretButton=$('secret-1111'),secretPhrase=$('secret-phrase');
secretButton?.addEventListener('click',()=>{
  const expanded=secretButton.getAttribute('aria-expanded')==='true';
  secretButton.setAttribute('aria-expanded',String(!expanded));
  if(secretPhrase)secretPhrase.hidden=expanded;
});
const imageModal=$('album-modal'),zoomButton=$('zoom-album'),closeModalButton=$('close-album');
zoomButton.addEventListener('click',()=>{
  if(typeof imageModal.showModal!=='function'){
    window.open('assets/album-abel.webp','_blank','noopener');
    return;
  }
  imageModal.showModal();
  document.body.classList.add('album-open');
  closeModalButton.focus({preventScroll:true});
});
closeModalButton.addEventListener('click',()=>imageModal.close());
imageModal.addEventListener('click',event=>{if(event.target===imageModal)imageModal.close()});
imageModal.addEventListener('close',()=>{
  document.body.classList.remove('album-open');
  zoomButton.focus({preventScroll:true});
});
