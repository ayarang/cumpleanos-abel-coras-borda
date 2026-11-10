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
