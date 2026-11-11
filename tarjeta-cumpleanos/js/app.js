/**
 * Interacciones principales del álbum de Abel Coras Borda.
 * Fecha, efectos y estilos están separados en módulos.
 */
import {initConfetti} from './confetti.js';
import {initMusic} from './music.js?v=loop-oval-1';
import {initCake} from './cake.js?v=emocion-1';
import {initEmotion} from './emotion.js?v=1';

const $=id=>document.getElementById(id);
const cover=$('cover');
const album=$('album');
const {burst}=initConfetti($('burst'));

const music=initMusic({button:$('music-toggle'),panel:$('music-corner'),slot:$('music-frame-slot'),closeButton:$('music-close')});
const emotion=initEmotion({finale:$('emotion-finale')});
initCake({
  button:$('blow-candles'),
  scene:$('cake-scene'),
  result:$('wish-result'),
  onWish:()=>{
    const rect=$('cake-scene').getBoundingClientRect();
    burst({x:rect.left+rect.width/2,y:Math.max(20,rect.top+rect.height*.25),count:38});
  },
  onChange:blown=>emotion.setWishRevealed(blown)
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
  // La misma pulsación que abre el regalo muestra el video flotante.
  // No hace falta tocar el botón musical para verlo.
  music.openOnGift();
  const sparkle=$('gift-reveal');
  if(sparkle&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    sparkle.hidden=false;
    sparkle.addEventListener('animationend',()=>{
      sparkle.hidden=true;
    },{once:true});
  }
  $('album-title').focus({preventScroll:true});
  // El único clic necesario es «Abrir mi regalo».
  // El navegador puede exigir Play en YouTube para activar el sonido.
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
// El mismo visor permite ampliar el collage central o cualquiera de las fotos laterales.
const imageModal=$('album-modal'),closeModalButton=$('close-album');
const modalImage=$('album-modal-image'),modalDownload=$('album-modal-download');
let lastImageTrigger=null;
const galleryPhotos=[
  {id:'zoom-album',url:'assets/album-abel.webp',name:'Album-Abel-Coras-Borda.webp',alt:'Collage completo de Abel con cuatro fotografías de montaña y motocicletas',width:1122,height:1402},
  {id:'zoom-mirador',url:'assets/abel_mirador_noche.webp',name:'Abel-Mirador-Noche.webp',alt:'Abel en un mirador nocturno junto al mar',width:360,height:480},
  {id:'zoom-pasarela',url:'assets/abel_pasarela_noche.webp',name:'Abel-Pasarela-Noche.webp',alt:'Abel en una pasarela junto a una estructura metálica azul',width:360,height:480}
];
for(const photo of galleryPhotos){
  const trigger=$(photo.id);
  trigger?.addEventListener('click',()=>{
    lastImageTrigger=trigger;
    if(typeof imageModal.showModal!=='function'){
      window.open(photo.url,'_blank','noopener');
      return;
    }
    modalImage.src=photo.url;
    modalImage.alt=photo.alt;
    modalImage.width=photo.width;
    modalImage.height=photo.height;
    modalDownload.href=photo.url;
    modalDownload.download=photo.name;
    imageModal.showModal();
    document.body.classList.add('album-open');
    closeModalButton.focus({preventScroll:true});
  });
}
closeModalButton.addEventListener('click',()=>imageModal.close());
imageModal.addEventListener('click',event=>{if(event.target===imageModal)imageModal.close()});
imageModal.addEventListener('close',()=>{
  document.body.classList.remove('album-open');
  lastImageTrigger?.focus({preventScroll:true});
});
