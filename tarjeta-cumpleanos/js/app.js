/**
 * Interacciones principales del álbum de Abel Coras Borda.
 * Fecha, efectos y estilos están separados en módulos.
 */
import {initConfetti} from './confetti.js';
import {initBirthday} from './birthday.js';

const $=id=>document.getElementById(id);
const cover=$('cover');
const album=$('album');
const {burst}=initConfetti($('burst'));
initBirthday();

let noticeTimer=0;
function showAlbum(){
  cover.hidden=true;
  album.hidden=false;
  album.classList.remove('show');
  void album.offsetWidth;
  album.classList.add('show');
  window.scrollTo({top:0,behavior:'instant'});
  $('album-title').focus({preventScroll:true});
  burst();
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
