/**
 * Mensaje de cierre para Abel.
 * La carta y las frases de la galería son contenido HTML independiente.
 * Solo muestra el cierre tras soplar las velas; al reencenderlas lo oculta.
 */
export function initEmotion({finale}={}){
 return {
  setWishRevealed(blown){
   if(!finale)return;
   finale.hidden=!blown;
   finale.classList.toggle('is-revealed',blown);
  }
 };
}
