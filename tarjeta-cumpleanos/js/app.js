/**
 * Interacciones principales del álbum de Abel Coras Borda.
 * Fecha, efectos y estilos están separados en módulos.
 */
import {initConfetti} from './confetti.js';
import {initBirthday} from './birthday.js';
import {initPiano} from './piano.js';
import {initCake} from './cake.js';

const $=id=>document.getElementById(id);
const cover=$('cover');
const album=$('album');
const {burst}=initConfetti($('burst'));
initBirthday();

const piano=initPiano({
  button:$('piano-toggle'),
  label:$('piano-label'),
  status:$('piano-status')
});
initCake({
  button:$('blow-candles'),
  scene:$('cake-scene'),
  result:$('wish-result'),
  onWish:()=>burst()
});

let noticeTimer=0;
const motionReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let opening=false;
function showAlbum(){
  if(opening)return;
  opening=true;
  // El toque para abrir el álbum también intenta iniciar el piano con sonido.
  // Si el navegador lo bloquea, queda disponible el botón flotante.
  $('piano-toggle').hidden=false;
  void piano.start();
  cover.classList.add('is-exiting');
  window.setTimeout(()=>{
    cover.hidden=true;
    cover.classList.remove('is-exiting');
    album.hidden=false;
    album.classList.remove('show');
    void album.offsetWidth;
    album.classList.add('show');
    window.scrollTo({top:0,behavior:'instant'});
    $('album-title').focus({preventScroll:true});
    burst();
    opening=false;
  },motionReduced?0:390);
}
function returnToCover(){
  album.hidden=true;
  album.classList.remove('show');
  cover.hidden=false;
  window.scrollTo({top:0,behavior:'instant'});
  $('open-album').focus({preventScroll:true});
}
function notice(msg){
  const el=$('toast');
  el.textContent=msg;el.hidden=false;
  clearTimeout(noticeTimer);
  noticeTimer=setTimeout(()=>{el.hidden=true},3000);
}
async function shareAlbum(){
  const url=new URL(location.href);url.hash='';
  const data={
    title:'Álbum de cumpleaños para Abel Coras Borda',
    text:'¡Feliz cumpleaños, Abel! 🏍️',
    url:url.toString()
  };
  if(navigator.share){
    try{await navigator.share(data);return}
    catch(e){if(e.name==='AbortError')return}
  }
  try{await navigator.clipboard.writeText(data.url);notice('¡Enlace copiado!');return}
  catch(e){}
  window.prompt('Copia el enlace:',data.url);
}
$('open-album').addEventListener('click',showAlbum);
$('again').addEventListener('click',burst);
$('return').addEventListener('click',returnToCover);
$('share').addEventListener('click',shareAlbum);
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
