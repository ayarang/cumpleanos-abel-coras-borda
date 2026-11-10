# Álbum de cumpleaños — Abel Coras Borda 🏍️

**Fecha central:** miércoles 11 de noviembre de 2026 (hora de Perú).

**Álbum en línea:** https://ayarang.github.io/simulador-de-jugos/tarjeta-cumpleanos/

La portada presenta una fotografía individual de Abel sentado en la roca y la frase reflexiva elegida. La vista interior conserva el collage original de cuatro fotografías, con estética de motos, casco y carretera, **sin comentarios individuales**. Al pulsar el collage se abre un visor de pantalla completa; permite descargar la imagen y cerrarla con Escape.

## Estructura modular

- `tarjeta-cumpleanos/index.html` — estructura y contenido de la página.
- `tarjeta-cumpleanos/assets/album-abel.webp` — collage original optimizado para web.
- `tarjeta-cumpleanos/assets/abel-portada.jpg` — fotografía individual y ligera para la portada.
- `tarjeta-cumpleanos/css/styles.css` — estilos de portada y álbum.
- `tarjeta-cumpleanos/css/birthday.css` — estilos de fecha central.
- `tarjeta-cumpleanos/js/app.js` — botones de abrir, compartir y regresar.
- `tarjeta-cumpleanos/js/confetti.js` — confeti independiente y accesible.
- `tarjeta-cumpleanos/js/birthday.js` — fecha y aviso del cumpleaños según hora de Lima.

La antigua prueba de tarjeta (`tarjeta-original.html`) se eliminó. El proyecto inicial de simulación de jugos permanece en `index.htm`, sin modificaciones.

## Fecha

Antes del 11 de noviembre se muestra el tiempo restante. Durante el 11 de noviembre, la portada destaca que **hoy es el gran día**. Después, conserva la fecha del recuerdo. No requiere editar el sitio ni configurar tareas.

Todo es HTML, CSS y JavaScript estático, alojado en GitHub Pages.

La transición al álbum utiliza un destello naranja discreto inspirado en una curva de carretera, y respeta `prefers-reduced-motion`. En teléfonos, la portada y los controles se ajustan al ancho y alto disponibles.

## Música y torta interactiva

- `tarjeta-cumpleanos/js/piano.js`: melodía instrumental **original sintetizada** con Web Audio; suena suave y no requiere descargar música ni usar pistas comerciales.
- `tarjeta-cumpleanos/js/cake.js`: controla las velas con un botón, las apaga y permite volverlas a encender.
- `tarjeta-cumpleanos/css/celebration.css`: estilos de torta SVG, llamas, destellos y reproductor flotante.
- La música se intenta iniciar tras pulsar «Abrir álbum», un gesto del visitante. Algunos navegadores impiden el audio automático: en ese caso, se puede usar el botón flotante «Piano suave».
- La torta aparece **después del collage**, sin alterar la portada. Al pulsar «Soplar las velas» se apagan, se muestra un deseo breve y hay confeti. Se pueden volver a encender.
- No se accede al micrófono ni se recopilan datos. El botón simula el soplido, para que funcione en celulares.

## Ajuste de rapidez y limpieza (10/11/2026)

- Se retiraron de la vista principal los botones de compartir, volver al inicio, repetir confeti y descargar. El álbum se descarga únicamente al ampliarlo, si se desea.
- El botón de abrir responde inmediatamente; se eliminó la espera artificial de 390 ms y el repintado forzado.
- Se redujo el confeti de 130 a 40–65 partículas, la duración y la resolución de canvas, que solo se inicializa al necesitarse.
- La propia torta es interactiva: permite encender o apagar las velas al tocarla o pulsar Enter/Espacio. Sigue existiendo el botón accesible de soplar.
- Se simplificaron efectos costosos en móviles. El piano flotante se conserva.
